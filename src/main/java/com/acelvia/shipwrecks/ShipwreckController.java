package com.acelvia.shipwrecks;

import com.acelvia.shipwrecks.models.Favourite;
import com.acelvia.shipwrecks.models.Shipwreck;
import com.acelvia.shipwrecks.models.User;
import com.acelvia.shipwrecks.services.Area;
import com.acelvia.shipwrecks.services.ShipwreckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ShipwreckController {

    @Autowired
    private ShipwreckService shipwreckService;

    @RequestMapping("/shipwrecks")
    public List<Shipwreck> shipwrecks(HttpServletRequest request) {
        List<Shipwreck> allShipwrecks = new ArrayList<>();

        Arrays.asList(Area.values()).forEach(e -> allShipwrecks.addAll(shipwreckService.getShipwrecks(e)));

        User currentUser = (User) request.getSession().getAttribute("user");
        if (currentUser == null || currentUser.getFavourites().size() == 0) {
            return allShipwrecks;
        }

        return shipwrecksWithFavourites(allShipwrecks, currentUser.getFavourites());
    }

    private List<Shipwreck> shipwrecksWithFavourites(List<Shipwreck> allShipwrecks, List<Favourite> favourites) {
        List<Shipwreck> clonedShipwrecks = allShipwrecks.stream().map(Shipwreck::copy).collect(Collectors.toList());
        for (Favourite f : favourites) {
            int index = f.indexIn(clonedShipwrecks);
            if (index >= 0) {
                Shipwreck clonedShipwreck = clonedShipwrecks.get(index);
                clonedShipwreck.setFavourite(true);
                clonedShipwreck.setFavouriteId(f.getId());
            }
        }

        return clonedShipwrecks;
    }
}
