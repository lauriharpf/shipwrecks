package com.acelvia.shipwrecks.services;

import com.acelvia.shipwrecks.Shipwreck;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.io.InputStream;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

public class WikipediaShipwreckServiceTest {

    private WikipediaShipwreckService wikipediaShipwreckService;

    @BeforeEach
    void beforeEach() {
        wikipediaShipwreckService = new WikipediaShipwreckService();
    }

    @Nested
    class ParseShipwreckData {

        private List<Shipwreck> shipwrecks;

        @BeforeEach
        void beforeEach() throws Exception {
            InputStream africanShipwrecks = WikipediaShipwreckService.class.getResourceAsStream(
                    "/list_of_shipwrecks_of_africa.kml");
            shipwrecks = wikipediaShipwreckService.parseShipwreckData(africanShipwrecks);
        }

        @Test
        void returnsExpectedAmountOfShipwrecks() {
            fail();
            assertEquals(76, shipwrecks.size());
        }

        @Test
        void returnsExpectedDataForFirstShipwreck() {
            Shipwreck expected = new Shipwreck("Globe Star (ship)", -4.0818f, 39.72f);
            assertEquals(expected, shipwrecks.get(0));
        }

        @Test
        void returnsExpectedDataForLastShipwreck() {
            Shipwreck expected = new Shipwreck("Medusa", 20.0475f, -16.809f);
            assertEquals(expected, shipwrecks.get(shipwrecks.size() - 1));
        }
    }
}
