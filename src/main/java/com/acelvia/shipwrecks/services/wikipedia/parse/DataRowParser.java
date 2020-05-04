package com.acelvia.shipwrecks.services.wikipedia.parse;

import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.List;
import java.util.stream.Collectors;

public class DataRowParser {
    public static List<Row> parse(Element wikipediaTable, List<ColumnType> columnTypes) {
        return wikipediaTable.select("tr:has(td)").stream()
                .map(row -> row.select("td"))
                .filter(columns -> DataRowParser.hasAllMandatoryColumns(columns, columnTypes))
                .map(columns -> new Row(columns, columnTypes))
                .collect(Collectors.toList());
    }

    private static boolean hasAllMandatoryColumns(Elements columnsOfDataRow, List<ColumnType> columnTypes) {
        return ColumnType.mandatoryColumns().stream()
                .allMatch(column -> Row.isValidIndex(columnTypes.indexOf(column), columnsOfDataRow));
    }
}
