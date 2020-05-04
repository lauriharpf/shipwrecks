package com.acelvia.shipwrecks;

import com.acelvia.shipwrecks.models.Shipwreck;
import com.acelvia.shipwrecks.services.ShipwreckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ShipwreckController {

    @Autowired
    private ShipwreckService shipwreckService;

    @GetMapping("/api/shipwrecks")
    public List<Shipwreck> shipwrecks() {
        return shipwreckService.getAll();
    }

}
