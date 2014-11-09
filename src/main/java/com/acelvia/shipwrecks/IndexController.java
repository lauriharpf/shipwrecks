package com.acelvia.shipwrecks;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

    @RequestMapping("/")
    @SuppressWarnings("unused")
    public String index() {
        return "index";
    }
}
