package com.acelvia.shipwrecks.services.wikipedia;

import com.acelvia.shipwrecks.components.HtmlFetcher;
import com.acelvia.shipwrecks.models.Shipwreck;
import com.acelvia.shipwrecks.services.Area;
import com.acelvia.shipwrecks.services.wikipedia.parse.ShipwreckParser;
import org.jsoup.nodes.Document;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Component
public class CachingShipwreckFetcher {

    private final HtmlFetcher htmlFetcher;

    public CachingShipwreckFetcher(HtmlFetcher htmlFetcher) {
        this.htmlFetcher = htmlFetcher;
    }

    @Cacheable(value = "shipwrecks", unless = "#result.isEmpty()")
    public List<Shipwreck> getShipwrecks(Area area) {
        try {
            String url = "https://en.wikipedia.org/api/rest_v1/page/html/" + area.getPageName();
            Document wikipediaPage = htmlFetcher.fetch(url);
            return ShipwreckParser.parse(wikipediaPage);
        } catch (IOException e) {
            // Something went wrong; return an empty list so the result isn't cached
            return Collections.emptyList();
        }
    }
}
