package com.acelvia.shipwrecks.services;

import com.acelvia.shipwrecks.Shipwreck;
import com.acelvia.shipwrecks.services.wikipedia.*;
import org.apache.http.client.fluent.Content;
import org.apache.http.client.fluent.Request;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class WikipediaShipwreckService implements ShipwreckService {
    private static final String KMLEXPORT_URL_TEMPLATE =
            "http://tools.wmflabs.org/kmlexport?article=%s";

    @Cacheable(value = "shipwrecks", unless = "#result.isEmpty()")
    @Override
    public List<Shipwreck> getShipwrecks() {
        try {
            Content content = getShipwreckData();
            return parseShipwreckData(content);
        } catch (IOException | JAXBException e) {
            // Something went wrong; return an empty list so the result isn't cached
            return Collections.emptyList();
        }
    }


    private Content getShipwreckData() throws IOException {
        final String url =
                String.format(KMLEXPORT_URL_TEMPLATE,
                        "List_of_shipwrecks_of_Africa");
        return Request.Get(url).execute().returnContent();
    }

    private List<Shipwreck> parseShipwreckData(Content shipwreckData) throws JAXBException {
        JAXBContext jaxbContext = JAXBContext.newInstance(Kml.class);
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

        Kml kml = ((Kml) unmarshaller.unmarshal(shipwreckData.asStream()));
        Document document = kml.getDocument();

        List<Shipwreck> shipwrecks = new ArrayList<>();
        for (Placemark placemark : document.getPlacemarks()) {
            Point wreckLocation = placemark.getPoint();

            try {
                shipwrecks.add(
                        new Shipwreck(placemark.getName(),
                                wreckLocation.getLatitude(),
                                wreckLocation.getLongitude()
                        )
                );
            } catch (InvalidCoordinateException e) {
                // Ignore wrecks that have invalid coordinates
            }
        }

        return shipwrecks;
    }
}
