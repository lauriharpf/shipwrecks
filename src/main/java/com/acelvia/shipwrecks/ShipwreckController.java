package com.acelvia.shipwrecks;

import com.acelvia.shipwrecks.models.Shipwreck;
import com.acelvia.shipwrecks.services.Area;
import com.acelvia.shipwrecks.services.ShipwreckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class ShipwreckController {

    @Autowired
    private ShipwreckService shipwreckService;

    @GetMapping("/api/shipwrecks")
    public List<Shipwreck> shipwrecks() {
        List<Shipwreck> allShipwrecks = new ArrayList<>();

        Arrays.asList(Area.values()).forEach(e -> allShipwrecks.addAll(shipwreckService.getShipwrecks(e)));

        return allShipwrecks;
    }

}
