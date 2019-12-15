package com.acelvia.shipwrecks.repositories;

import com.acelvia.shipwrecks.models.Favourite;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface FavouriteRepository extends MongoRepository<Favourite, String> {
    Optional<Favourite> findById(String id);
}
