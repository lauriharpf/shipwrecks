package com.acelvia.shipwrecks.services;

import com.acelvia.shipwrecks.Shipwreck;

import java.util.List;

public interface ShipwreckService {

    List<Shipwreck> getShipwrecks(Area area);
}
