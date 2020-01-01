package com.acelvia.shipwrecks.controllers;

import com.acelvia.shipwrecks.components.Settings;
import com.acelvia.shipwrecks.models.User;
import com.acelvia.shipwrecks.repositories.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@RestController
public class AuthController {

    private static final Log log = LogFactory.getLog(AuthController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Settings settings;

    @PostMapping(value = "/api/login")
    public void login(@RequestBody String idTokenToVerify, HttpServletRequest request, HttpServletResponse response) {
        GoogleIdToken idToken;
        try {
            idToken = verifyToken(idTokenToVerify);
        } catch (Exception e) {
            log.warn("Id token verification failed", e);
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            return;
        }

        GoogleIdToken.Payload payload = idToken.getPayload();
        User user = saveOrUpdate(payload.getSubject(), payload.getEmail());

        // Add user to session
        request.getSession().setAttribute("user", user);
    }

    private GoogleIdToken verifyToken(String idTokenToVerify) throws GeneralSecurityException, IOException {
        NetHttpTransport transport = new NetHttpTransport();
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport,
                JacksonFactory.getDefaultInstance()).setAudience(Collections.singletonList(settings.getGoogleId())).build();

        GoogleIdToken idToken = verifier.verify(idTokenToVerify);
        if (idToken == null) {
            throw new GeneralSecurityException("Unable to verify id token, verify returned null.");
        }
        return idToken;
    }

    private User saveOrUpdate(String userId, String email) {
        User user = userRepository.findByGoogleId(userId);
        if (user == null) {
            user = new User(userId, email);
        } else {
            user.setEmail(email);
        }
        return userRepository.save(user);
    }

    @PostMapping(value = "/api/logout")
    public void logout(HttpServletRequest request) {
        request.getSession().invalidate();
    }

}
