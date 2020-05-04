package com.acelvia.shipwrecks.services.wikipedia.parse;

import com.acelvia.shipwrecks.models.Coordinates;
import com.acelvia.shipwrecks.models.Shipwreck;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Locale;

import static com.acelvia.shipwrecks.services.wikipedia.parse.ColumnType.*;

public class Row {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("d MMMM yyyy", Locale.US);
    private final Elements columns;
    private final List<ColumnType> columnTypes;

    public Row(Elements columns, List<ColumnType> columnTypes) {
        this.columns = columns;
        this.columnTypes = columnTypes;
    }

    public static boolean isValidIndex(int index, List<?> elements) {
        return index > -1 && index < elements.size();
    }

    public Shipwreck toShipwreck() {
        Coordinates coordinates = coordinates();
        if (coordinates == null || hasNoWikipediaArticle()) {
            return null;
        }

        return new Shipwreck(name(), coordinates.getLatitude(), coordinates.getLongitude(), sunkDate());
    }

    private boolean hasNoWikipediaArticle() {
        return get(SHIP).select("a:not(.new)").isEmpty();
    }

    private String name() {
        String href = get(SHIP).select("a").attr("href");
        return href.substring(href.lastIndexOf('/') + 1).replaceAll("_", " ");
    }

    private Coordinates coordinates() {
        String[] floatCoordinates = get(COORDINATES).select(".geo").text().split(";");
        if (floatCoordinates.length != 2) {
            return null;
        }
        float latitude = Float.parseFloat(floatCoordinates[0].trim());
        float longitude = Float.parseFloat(floatCoordinates[1].trim());

        return new Coordinates(latitude, longitude);
    }

    private LocalDate sunkDate() {
        if (!isValidIndex(columnTypes.indexOf(SUNK_DATE), columns)) {
            return null;
        }

        try {
            return LocalDate.parse(get(SUNK_DATE).text(), FORMATTER);
        } catch (DateTimeParseException dtpe) {
            return null;
        }
    }

    private Element get(ColumnType columnType) {
        return columns.get(columnTypes.indexOf(columnType));
    }
}
