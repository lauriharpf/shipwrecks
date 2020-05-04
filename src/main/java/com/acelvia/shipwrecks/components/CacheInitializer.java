package com.acelvia.shipwrecks.components;

import com.acelvia.shipwrecks.services.ShipwreckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class CacheInitializer implements ApplicationListener<ApplicationReadyEvent> {
    @Autowired
    private ShipwreckService shipwreckService;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        shipwreckService.getAll();
    }
}
