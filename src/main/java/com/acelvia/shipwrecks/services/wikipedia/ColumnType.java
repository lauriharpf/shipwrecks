package com.acelvia.shipwrecks.services.wikipedia;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum ColumnType {
    SHIP(true), SUNK_DATE(false), COORDINATES(true), OTHER(false);

    private final boolean isMandatory;

    ColumnType(boolean isMandatory) {
        this.isMandatory = isMandatory;
    }

    public static ColumnType from(String text) {
        String value = text.toUpperCase().strip();

        switch (value) {
            case "SHIP":
                return SHIP;
            case "SUNK DATE":
                return SUNK_DATE;
            case "COORDINATES":
                return COORDINATES;
            default:
                return OTHER;
        }
    }

    public static List<ColumnType> mandatoryColumns() {
        return Arrays.stream(ColumnType.values())
                .filter(item -> item.isMandatory)
                .collect(Collectors.toList());
    }
}
