package com.acelvia.shipwrecks.components;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Settings {

    @Value("${google.id}")
    private String googleId;

    @Value("${google.secret}")
    private String googleSecret;

    @Value("${google.callback.uri}")
    private String googleCallbackUri;

    public String getGoogleId() {
        return googleId;
    }

    public String getGoogleSecret() {
        return googleSecret;
    }

    public String getGoogleCallbackUri() {
        return googleCallbackUri;
    }
}
