package com.acelvia.shipwrecks.controllers;

import com.acelvia.shipwrecks.models.Favourite;
import com.acelvia.shipwrecks.models.Shipwreck;
import com.acelvia.shipwrecks.models.User;
import com.acelvia.shipwrecks.repositories.FavouriteRepository;
import com.acelvia.shipwrecks.repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    private static final Log log = LogFactory.getLog(UserController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FavouriteRepository favouriteRepository;

    @RequestMapping("/state")
    public ObjectNode getState(
            HttpServletRequest request
    ) {
        HttpSession session = request.getSession();
        String state = (String) session.getAttribute("state");

        log.info("-----------------------------------------");
        log.info("State: "+state);

        if(session.getAttribute("state") == null) {
            state = new BigInteger(130, new SecureRandom()).toString(32);
            session.setAttribute("state", state);
        }

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode o = mapper.createObjectNode();

        o.put("state", state);

        if(session.getAttribute("user") != null) {
            log.info("User found in session!");
            o.put("signedIn", true);
        } else {
            log.info("User not found in session!");
            o.put("signedIn", false);
        }
        log.info("-----------------------------------------");

        return o;
    }

    @RequestMapping(value = "/favourites", method = RequestMethod.GET)
    public List<Favourite> getAllFavourites(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        User currentUser = (User) request.getSession().getAttribute("user");
        if(currentUser == null) {
            response.setStatus(401);
            return null;
        }

        return currentUser.getFavourites();
    }

    @RequestMapping(value = "/favourites", method = RequestMethod.POST)
    public Shipwreck addFavourite(
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestParam("name") String name,
            @RequestParam("latitude") float latitude,
            @RequestParam("longitude") float longitude
            ) {
        User currentUser = (User) request.getSession().getAttribute("user");
        if(currentUser == null) {
            response.setStatus(401);
            return null;
        }
        Shipwreck newShipwreck = new Shipwreck(name,latitude,longitude);
        Favourite newFavourite = new Favourite(newShipwreck);

        if(!currentUser.getFavourites().contains(newFavourite)) {
            newFavourite = favouriteRepository.save(newFavourite);

            newShipwreck.setFavourite(true);
            newShipwreck.setFavouriteId(newFavourite.getId());

            currentUser.addFavourite(newFavourite);
            userRepository.save(currentUser);
        }

        return newShipwreck;
    }

    @RequestMapping(value = "/favourites/{id}", method = RequestMethod.DELETE)
    public void removeFavourite(
            HttpServletRequest request,
            HttpServletResponse response,
            @PathVariable("id") String id
    ) {
        User currentUser = (User) request.getSession().getAttribute("user");
        if (currentUser == null) {
            response.setStatus(401);
            return;
        }

        Optional<Favourite> favourite = favouriteRepository.findById(id);
        if (favourite.isEmpty()) {
            response.setStatus(404);
            return;
        }

        currentUser.removeFavourite(favourite.get());
        userRepository.save(currentUser);
        favouriteRepository.delete(favourite.get());
    }
}
