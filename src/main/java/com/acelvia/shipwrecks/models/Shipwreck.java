package com.acelvia.shipwrecks.models;

import java.time.LocalDate;
import java.util.Objects;

public class Shipwreck {
    private final String name;
    private final float latitude;
    private final float longitude;
    private final LocalDate sunkDate;

    public Shipwreck(String name, float latitude, float longitude, LocalDate sunkDate) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.sunkDate = sunkDate;
    }

    @SuppressWarnings("unused")
    public float getLatitude() {
        return latitude;
    }

    @SuppressWarnings("unused")
    public float getLongitude() {
        return longitude;
    }

    @SuppressWarnings("unused")
    public String getName() {
        return name;
    }

    @SuppressWarnings("unused")
    public LocalDate getSunkDate() {
        return sunkDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Shipwreck shipwreck = (Shipwreck) o;
        return Float.compare(shipwreck.latitude, latitude) == 0 &&
                Float.compare(shipwreck.longitude, longitude) == 0 &&
                name.equals(shipwreck.name) &&
                Objects.equals(sunkDate, shipwreck.sunkDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, latitude, longitude, sunkDate);
    }
}
