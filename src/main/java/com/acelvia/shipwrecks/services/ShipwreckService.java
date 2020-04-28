package com.acelvia.shipwrecks.services;

import com.acelvia.shipwrecks.models.Shipwreck;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class ShipwreckService {

    private final WikipediaShipwreckService wikipediaShipwreckService;

    public ShipwreckService(WikipediaShipwreckService wikipediaShipwreckService) {
        this.wikipediaShipwreckService = wikipediaShipwreckService;
    }

    @Async
    public CompletableFuture<List<Shipwreck>> getShipwrecks(Area area) {
        return CompletableFuture.completedFuture(wikipediaShipwreckService.getShipwrecks(area));
    }
}
