package com.acelvia.shipwrecks.components;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class HtmlFetcher {
    public Document fetch(String url) throws IOException {
        return Jsoup.connect(url).userAgent("lauri.harpf@acelvia.com").get();
    }
}
