package com.acelvia.shipwrecks;

import com.acelvia.shipwrecks.controllers.AuthController;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.math.BigInteger;
import java.security.SecureRandom;

@Controller
public class IndexController {

    private static final Log log = LogFactory.getLog(IndexController.class);

    @RequestMapping("/")
    @SuppressWarnings("unused")
    public String index(
            HttpServletRequest request) {
        HttpSession session = request.getSession();
        String state = (String) session.getAttribute("state");

        if(session.getAttribute("state") == null) {
            state = new BigInteger(130, new SecureRandom()).toString(32);
            session.setAttribute("state", state);
        }


        return "index";
    }
}
