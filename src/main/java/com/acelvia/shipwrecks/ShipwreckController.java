package com.acelvia.shipwrecks;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class ShipwreckController {

    @RequestMapping("/shipwrecks")
    public List<Shipwreck> shipwrecks() {
        return Arrays.asList(
                new Shipwreck("USS Jeannette", 77.250f, 154.983f),
                new Shipwreck("HMS Achates", 73.300f, 30.100f)
        );
    }
}
