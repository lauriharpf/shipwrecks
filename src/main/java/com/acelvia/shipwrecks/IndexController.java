package com.acelvia.shipwrecks;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.math.BigInteger;
import java.security.SecureRandom;

@Controller
public class IndexController {

    @RequestMapping("/")
    @SuppressWarnings("unused")
    public String index(HttpServletRequest request) {
        HttpSession session = request.getSession();

        if (session.getAttribute("state") == null) {
            String state = new BigInteger(130, new SecureRandom()).toString(32);
            session.setAttribute("state", state);
        }

        return "index";
    }
}
