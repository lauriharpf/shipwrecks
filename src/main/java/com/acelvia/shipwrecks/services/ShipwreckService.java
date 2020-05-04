package com.acelvia.shipwrecks.services;

import com.acelvia.shipwrecks.models.Shipwreck;
import com.acelvia.shipwrecks.services.wikipedia.AsyncCachingShipwreckFetcher;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class ShipwreckService {
    private final AsyncCachingShipwreckFetcher shipwreckFetcher;

    public ShipwreckService(AsyncCachingShipwreckFetcher shipwreckFetcher) {
        this.shipwreckFetcher = shipwreckFetcher;
    }

    public List<Shipwreck> getAll() {
        List<CompletableFuture<List<Shipwreck>>> promises =
                Arrays.stream(Area.values()).
                        map(shipwreckFetcher::getShipwrecks)
                        .collect(Collectors.toList());

        Set<Shipwreck> allShipwrecks = promises.stream()
                .map(CompletableFuture::join)
                .flatMap(Collection::stream)
                .collect(Collectors.toCollection(() -> new TreeSet<>(Comparator.comparing(Shipwreck::getName))));

        return List.copyOf(allShipwrecks);
    }

}
