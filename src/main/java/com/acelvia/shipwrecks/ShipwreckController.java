package com.acelvia.shipwrecks;

import com.acelvia.shipwrecks.models.Shipwreck;
import com.acelvia.shipwrecks.services.Area;
import com.acelvia.shipwrecks.services.ShipwreckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@RestController
public class ShipwreckController {

    @Autowired
    private ShipwreckService shipwreckService;

    @GetMapping("/api/shipwrecks")
    public List<Shipwreck> shipwrecks() {

        List<CompletableFuture<List<Shipwreck>>> promises =
                Arrays.stream(Area.values()).
                        map(shipwreckService::getShipwrecks)
                        .collect(Collectors.toList());

        Set<Shipwreck> allShipwrecks = promises.stream()
                .map(CompletableFuture::join)
                .flatMap(Collection::stream)
                .collect(Collectors.toCollection(() -> new TreeSet<>(Comparator.comparing(Shipwreck::getName))));

        return List.copyOf(allShipwrecks);
    }

}
