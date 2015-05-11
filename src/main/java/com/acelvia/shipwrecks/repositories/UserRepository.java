package com.acelvia.shipwrecks.repositories;

import java.util.List;

import com.acelvia.shipwrecks.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    public User findByGoogleId(String googleId);
    public User findByEmail(String email);
}