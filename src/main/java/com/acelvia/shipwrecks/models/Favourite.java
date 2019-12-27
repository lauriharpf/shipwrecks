package com.acelvia.shipwrecks.models;

import org.springframework.data.annotation.Id;

import java.util.List;

public class Favourite {

    @Id
    private String id;

    private Shipwreck shipwreck;

    public Favourite(Shipwreck shipwreck) {
        this.shipwreck = shipwreck;
    }

    public String getId() {
        return this.id;
    }

    public int indexIn(List<Shipwreck> shipwrecks) {
        return shipwrecks.indexOf(this.shipwreck);
    }
}
