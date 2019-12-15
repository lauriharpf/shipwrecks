package com.acelvia.shipwrecks;

import com.acelvia.shipwrecks.models.Favourite;
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

@RestController
public class ShipwreckController {

    @Autowired
    private ShipwreckService shipwreckService;

    @RequestMapping("/shipwrecks")
    public List<Shipwreck> shipwrecks(HttpServletRequest request) {
        List<Shipwreck> allShipwrecks = new ArrayList<>();

        Arrays.asList(Area.values()).forEach(e -> allShipwrecks.addAll(shipwreckService.getShipwrecks(e)));

        User currentUser = (User) request.getSession().getAttribute("user");
        if (currentUser != null) {
            List<Favourite> favs = currentUser.getFavourites();
            for (Favourite f : favs) {
                int index = allShipwrecks.indexOf(f.getShipwreck());
                if (index >= 0) {
                    allShipwrecks.get(index).setFavourite(true);
                    allShipwrecks.get(index).setFavouriteId(f.getId());
                }
            }
        }

        return allShipwrecks;
    }
}
