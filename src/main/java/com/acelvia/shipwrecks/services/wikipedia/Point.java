package com.acelvia.shipwrecks.services.wikipedia;

import org.apache.commons.lang3.StringUtils;

import javax.xml.bind.annotation.XmlElement;


public class Point {

    @XmlElement(name = "coordinates")
    private String coordinates;

    public float getLatitude() throws InvalidCoordinateException {
        return getCoordinate(1);
    }

    public float getLongitude() throws InvalidCoordinateException {
        return getCoordinate(0);
    }

    private float getCoordinate(int index) throws InvalidCoordinateException {
        String[] coordinateArray = StringUtils.split(coordinates, ",");

        if (coordinateArray.length <= index || coordinateArray[index] == null) {
            throw new InvalidCoordinateException();
        }

        return Float.parseFloat(coordinateArray[index]);
    }
}
