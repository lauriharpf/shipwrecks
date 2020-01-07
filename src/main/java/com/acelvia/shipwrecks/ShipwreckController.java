package com.acelvia.shipwrecks;

import com.acelvia.shipwrecks.models.Shipwreck;
import com.acelvia.shipwrecks.services.Area;
import com.acelvia.shipwrecks.services.ShipwreckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class ShipwreckController {

    @Autowired
    private ShipwreckService shipwreckService;

    @GetMapping("/api/shipwrecks")
    public List<Shipwreck> shipwrecks() {
        Set<Shipwreck> allShipwrecks = new TreeSet<>(Comparator.comparing(Shipwreck::getName));

        Arrays.asList(Area.values()).forEach(e -> allShipwrecks.addAll(shipwreckService.getShipwrecks(e)));

        return List.copyOf(allShipwrecks);
    }

}
