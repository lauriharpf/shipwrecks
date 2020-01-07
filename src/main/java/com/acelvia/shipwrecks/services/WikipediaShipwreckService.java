package com.acelvia.shipwrecks.services;

import com.acelvia.shipwrecks.models.Shipwreck;
import com.acelvia.shipwrecks.services.wikipedia.*;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.StringReader;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WikipediaShipwreckService implements ShipwreckService {

    private RestTemplate client;

    public WikipediaShipwreckService(RestTemplate client) {
        this.client = client;
    }

    @Override
    @Cacheable(value = "shipwrecks", unless = "#result.isEmpty()")
    public List<Shipwreck> getShipwrecks(Area area) {
        try {
            String content = client.getForObject(area.getKmlURL(), String.class);
            return parseShipwreckData(content);
        } catch (JAXBException e) {
            // Something went wrong; return an empty list so the result isn't cached
            return Collections.emptyList();
        }
    }

    protected List<Shipwreck> parseShipwreckData(String shipwreckData) throws JAXBException {
        JAXBContext jaxbContext = JAXBContext.newInstance(Kml.class);
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

        Kml kml = ((Kml) unmarshaller.unmarshal(new StringReader(shipwreckData)));
        Document document = kml.getDocument();

        return document.getPlacemarks().stream().map(this::toShipwreck).filter(Optional::isPresent).map(Optional::get).collect(Collectors.toList());
    }

    private Optional<Shipwreck> toShipwreck(Placemark placemark) {
        Point location = placemark.getPoint();

        try {
            if (placemark.isNameValid()) {
                var shipwreck = new Shipwreck(placemark.getName(), location.getLatitude(), location.getLongitude());
                return Optional.of(shipwreck);
            }
        } catch (InvalidCoordinateException e) {
            // Ignore wrecks that have invalid coordinates
        }

        return Optional.empty();
    }
}
