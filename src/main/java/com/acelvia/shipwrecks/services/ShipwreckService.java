package com.acelvia.shipwrecks.services;

import com.acelvia.shipwrecks.models.Shipwreck;

import java.util.List;

public interface ShipwreckService {

    List<Shipwreck> getShipwrecks(Area area);
}
