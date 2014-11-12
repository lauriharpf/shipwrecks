package com.acelvia.shipwrecks;

import com.acelvia.shipwrecks.services.Area;
import com.acelvia.shipwrecks.services.ShipwreckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.bind.JAXBException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class ShipwreckController {

    @Autowired
    private ShipwreckService shipwreckService;

    @RequestMapping("/shipwrecks")
    public List<Shipwreck> shipwrecks() throws IOException, JAXBException {
        List<Shipwreck> allShipwrecks = new ArrayList<>();

        Arrays.asList(Area.values()).forEach(
                e -> allShipwrecks.addAll(shipwreckService.getShipwrecks(e)));

        return allShipwrecks;
    }

}
