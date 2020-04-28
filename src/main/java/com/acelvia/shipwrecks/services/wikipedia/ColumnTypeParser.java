package com.acelvia.shipwrecks.services.wikipedia;

import org.jsoup.nodes.Element;

import java.util.List;
import java.util.stream.Collectors;

public class ColumnTypeParser {
    public static List<ColumnType> parse(Element wikipediaTable) {
        return wikipediaTable.select("th").stream()
                .map(element -> ColumnType.from(element.text()))
                .collect(Collectors.toList());
    }
}
