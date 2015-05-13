package com.acelvia.shipwrecks.controllers;

import com.acelvia.shipwrecks.components.Settings;
import com.acelvia.shipwrecks.models.User;
import com.acelvia.shipwrecks.repositories.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.NameValuePair;
import org.apache.http.client.fluent.Request;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@Controller
public class AuthController {

    private static final Log log = LogFactory.getLog(AuthController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Settings settings;

    @RequestMapping(value = "/oauth2callback", method = RequestMethod.GET)
    public String login(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        log.info("-------------------------------------------");
        log.info("Session state:");
        log.info(request.getSession().getAttribute("state"));
        // Ensure that there is no request forgery going on, and that the user
        // sending us this connect request is the user that was supposed to.
        if (!request.getParameter("state").equals(
                request.getSession().getAttribute("state"))) {
            response.setStatus(401);
            log.error("NO STATE PARAMETER IN REQUEST!");
            return "redirect:/";
        }

        String code = request.getParameter("code");
        log.info("Code: "+code);
        String grant_type = "authorization_code";

        // Build request to get user token
        ArrayList<NameValuePair> parameters = new ArrayList<>();
        parameters.add(new BasicNameValuePair("code", code));
        parameters.add(new BasicNameValuePair("client_id", settings.getGoogleId()));
        parameters.add(new BasicNameValuePair("client_secret", settings.getGoogleSecret()));
        parameters.add(new BasicNameValuePair("redirect_uri", settings.getGoogleCallbackUri()));

        log.info("client_id: "+settings.getGoogleId());
        log.info("client_secret: "+settings.getGoogleSecret());
        log.info("redirect_uri: "+settings.getGoogleCallbackUri());

        parameters.add(new BasicNameValuePair("grant_type", grant_type));

        log.info(parameters);

        try {
            // Execute the request to google and get response as a string
            String content = Request.Post("https://www.googleapis.com/oauth2/v3/token")
                                    .bodyForm(parameters).execute().returnContent().asString();

            log.info("Executed request to google auth.");

            // Parse the response
            ObjectMapper mapper = new ObjectMapper();
            JsonNode contentObject = mapper.readTree(content);

            // Get the token
            String idToken = contentObject.get("id_token").textValue();

            // Get the content of the token
            String[] base64EncodedSegments = idToken.split("\\.");
            String base64EncodedClaims = base64EncodedSegments[1];
            String claims = StringUtils.newStringUtf8(Base64.decodeBase64(base64EncodedClaims));

            // Parse the content of the token in a Json node
            JsonNode idTokenObject = mapper.readTree(claims);

            // Get the unique ID
            String userGoogleId = idTokenObject.get("sub").textValue();

            // If there is an email available, take it
            String userEmail = null;
            if(idTokenObject.get("email") != null) {
                userEmail = idTokenObject.get("email").textValue();
            }

            log.info("Parsed Google token.");

            // Search for the user and add it
            User u = userRepository.findByGoogleId(userGoogleId);
            if(u == null) {
                log.info("User not found.");
                u = new User(userGoogleId, userEmail);
            } else {
                log.info("User found.");
                u.setEmail(userEmail);
            }
            userRepository.save(u);

            log.info("User saved.");

            // Add user to session
            request.getSession().setAttribute("user", u);

            log.info("User added to session.");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Go back to frontpage
        return "redirect:/";
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return "redirect:/";
    }

}
