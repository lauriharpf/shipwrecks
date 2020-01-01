package com.acelvia.shipwrecks.controllers;

import com.acelvia.shipwrecks.models.Favourite;
import com.acelvia.shipwrecks.models.Shipwreck;
import com.acelvia.shipwrecks.models.User;
import com.acelvia.shipwrecks.repositories.FavouriteRepository;
import com.acelvia.shipwrecks.repositories.UserRepository;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    private static final Log log = LogFactory.getLog(UserController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FavouriteRepository favouriteRepository;

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

    @PostMapping(value = "/api/favourites")
    public Shipwreck addFavourite(@RequestBody Shipwreck newShipwreck, HttpServletRequest request,
                                  HttpServletResponse response) {
        User currentUser = (User) request.getSession().getAttribute("user");
        if (currentUser == null) {
            response.setStatus(401);
            return null;
        }
        Favourite newFavourite = new Favourite(newShipwreck);

        if (!currentUser.getFavourites().contains(newFavourite)) {
            newFavourite = favouriteRepository.save(newFavourite);

            newShipwreck.setFavourite(true);
            newShipwreck.setFavouriteId(newFavourite.getId());

            currentUser.addFavourite(newFavourite);
            userRepository.save(currentUser);
        }

        return newShipwreck;
    }

    @RequestMapping(value = "/api/favourites/{id}", method = RequestMethod.DELETE)
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
