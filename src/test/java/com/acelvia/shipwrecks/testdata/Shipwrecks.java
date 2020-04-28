package com.acelvia.shipwrecks.testdata;

import com.acelvia.shipwrecks.services.WikipediaShipwreckService;

import java.io.InputStream;
import java.util.Scanner;

public class Shipwrecks {
    public static String ofAfrica() {
        InputStream africanShipwreckStream = WikipediaShipwreckService.class.getResourceAsStream(
                "/List_of_shipwrecks_of_Africa.html");
        return new Scanner(africanShipwreckStream).useDelimiter("\\A").next();
    }

}
