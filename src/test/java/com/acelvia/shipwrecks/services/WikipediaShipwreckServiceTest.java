package com.acelvia.shipwrecks.services;

import com.acelvia.shipwrecks.models.Shipwreck;
import com.acelvia.shipwrecks.testdata.Shipwrecks;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class WikipediaShipwreckServiceTest {

    private WikipediaShipwreckService wikipediaShipwreckService;

    @BeforeEach
    void beforeEach() {
        wikipediaShipwreckService = new WikipediaShipwreckService(Mockito.mock(RestTemplate.class));
    }

    @Nested
    class ParseShipwreckData {

        private List<Shipwreck> shipwrecks;

        @BeforeEach
        void beforeEach() throws Exception {
            shipwrecks = wikipediaShipwreckService.parseShipwreckData(Shipwrecks.ofAfrica());
        }


        @Test
        void returnsExpectedAmountOfShipwrecks() {
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
