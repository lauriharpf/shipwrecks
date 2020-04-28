package com.acelvia.shipwrecks.services.wikipedia;

import com.acelvia.shipwrecks.models.Shipwreck;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ShipwreckParser {
    public static List<Shipwreck> parse(Document wikipediaPage) {
        return wikipediaPage.select(".wikitable").stream()
                .flatMap(ShipwreckParser::parse)
                .collect(Collectors.toList());
    }

    private static Stream<Shipwreck> parse(Element wikipediaTable) {
        List<ColumnType> columnTypes = ColumnTypeParser.parse(wikipediaTable);
        List<Row> dataRows = columnTypes.containsAll(ColumnType.mandatoryColumns()) ?
                DataRowParser.parse(wikipediaTable, columnTypes) :
                List.of();
        return dataRows.stream().map(Row::toShipwreck).filter(Objects::nonNull);
    }
}
