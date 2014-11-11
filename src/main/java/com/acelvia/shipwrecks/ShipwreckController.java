package com.acelvia.shipwrecks;

import com.acelvia.shipwrecks.wikipedia.*;
import org.apache.http.client.fluent.Content;
import org.apache.http.client.fluent.Request;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ShipwreckController {

    private static final String KMLEXPORT_URL_TEMPLATE =
            "http://tools.wmflabs.org/kmlexport?article=%s";

    @RequestMapping("/shipwrecks")
    public List<Shipwreck> shipwrecks() throws IOException, JAXBException {
        Content content = getShipwreckData();
        return parseShipwreckData(content);
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

        List<Shipwreck> shipwrecks = new ArrayList<Shipwreck>();
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
