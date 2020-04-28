package com.acelvia.shipwrecks.services.wikipedia;

import com.acelvia.shipwrecks.models.Shipwreck;
import com.acelvia.shipwrecks.testdata.Shipwrecks;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ShipwreckParserTest {

    private List<Shipwreck> results;

    @BeforeAll
    void beforeAll() {
        Document document = Jsoup.parse(Shipwrecks.ofAfrica());
        results = ShipwreckParser.parse(document);
    }

    @Test
    void hasExpectedAmountOfShipwrecks() {
        assertEquals(64, results.size());
    }

    @Test
    void hasExpectedDataForFirstShipwreck() {
        var globeStar = new Shipwreck("Globe Star (ship)", -4.0818f, 39.72f, LocalDate.of(1973, 4, 27));
        assertEquals(globeStar, results.get(0));
    }

    @Test
    void hasExpectedDataForLastShipwreck() {
        var medusa = new Shipwreck("French frigate Méduse (1810)", 20.0475f, -16.809f, LocalDate.of(1816, 7, 2));
        assertEquals(medusa, results.get(results.size() - 1));
    }
}
