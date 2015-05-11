package com.acelvia.shipwrecks.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class User {

    @Id
    private String id;

    private String email;
    private String googleId;

    @DBRef
    private List<Favourite> favourites;

    public User() {}

    public User(String googleId, String email) {
        this.googleId = googleId;
        this.email = email;
        this.favourites = new ArrayList<>();
    }

    @Override
    public String toString() {
        return String.format("User[id=%s, googleId='%s', email='%s']", id, googleId, email);
    }

    public String getEmail() {
        return this.email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getGoogleId() {
        return this.googleId;
    }
    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    public List<Favourite> getFavourites() { return Collections.unmodifiableList(favourites); }
    public void addFavourite(Favourite shipwreck) { this.favourites.add(shipwreck); }
    public void removeFavourite(Favourite shipwreck) { this.favourites.removeIf(e -> e.getId().equals(shipwreck.getId())); }
}