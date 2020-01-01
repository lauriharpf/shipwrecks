package com.acelvia.shipwrecks.components;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Settings {

    @Value("${google.id}")
    private String googleId;

    public String getGoogleId() {
        return googleId;
    }

}
