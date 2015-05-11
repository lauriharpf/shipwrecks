package com.acelvia.shipwrecks.controllers;

import com.acelvia.shipwrecks.Shipwreck;
import com.acelvia.shipwrecks.models.Favourite;
import com.acelvia.shipwrecks.models.User;
import com.acelvia.shipwrecks.repositories.FavouriteRepository;
import com.acelvia.shipwrecks.repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jdk.nashorn.internal.ir.RuntimeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
public class UserController {

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
        if(session.getAttribute("state") == null) {
            state = new BigInteger(130, new SecureRandom()).toString(32);
            request.getSession().setAttribute("state", state);
        }

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode o = mapper.createObjectNode();

        o.put("state", state);

        if(session.getAttribute("user") != null) {
            o.put("signedIn", true);
        } else {
            o.put("signedIn", false);
        }

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
        if(currentUser == null) {
            response.setStatus(401);
            return;
        }

        Favourite favourite = favouriteRepository.findById(id);
        if(favourite == null) {
            response.setStatus(404);
            return;
        }

        currentUser.removeFavourite(favourite);
        userRepository.save(currentUser);
        favouriteRepository.delete(favourite);
    }
}
