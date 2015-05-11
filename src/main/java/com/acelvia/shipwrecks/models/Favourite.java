package com.acelvia.shipwrecks.models;

import com.acelvia.shipwrecks.Shipwreck;
import org.springframework.data.annotation.Id;

public class Favourite {

    @Id
    private String id;

    private Shipwreck shipwreck;

    public Favourite(Shipwreck shipwreck) {
        this.shipwreck = shipwreck;
    }

    public Shipwreck getShipwreck() {
        return this.shipwreck;
    }
    public String getId() {
        return this.id;
    }
}
