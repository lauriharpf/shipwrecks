package com.acelvia.shipwrecks;

public class Shipwreck {
    private final String name;
    private final float latitude;
    private final float longitude;
    private boolean favourite;
    private String favouriteId;

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

    public boolean getFavourite() {
        return favourite;
    }

    public void setFavourite(boolean b) {
        this.favourite = b;
    }

    public String getFavouriteId() {
        return favouriteId;
    }

    public void setFavouriteId(String b) {
        this.favouriteId = b;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Shipwreck shipwreck = (Shipwreck) o;

        if (Float.compare(shipwreck.latitude, latitude) != 0) return false;
        if (Float.compare(shipwreck.longitude, longitude) != 0) return false;
        if (!name.equals(shipwreck.name)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = name.hashCode();
        result = 31 * result + (latitude != +0.0f ? Float.floatToIntBits(latitude) : 0);
        result = 31 * result + (longitude != +0.0f ? Float.floatToIntBits(longitude) : 0);
        return result;
    }
}
