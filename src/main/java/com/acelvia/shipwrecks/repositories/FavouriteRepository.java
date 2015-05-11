package com.acelvia.shipwrecks.repositories;

import com.acelvia.shipwrecks.models.Favourite;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FavouriteRepository extends MongoRepository<Favourite, String> {
    public Favourite findById(String id);
}
