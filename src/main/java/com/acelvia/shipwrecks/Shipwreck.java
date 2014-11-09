package com.acelvia.shipwrecks;

public class Shipwreck {
    private final String name;
    private final float latitude;
    private final float longitude;

    public Shipwreck(String name, float latitude, float longitude) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
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
}
