package com.acelvia.shipwrecks.services.wikipedia;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class Placemark {

    @XmlElement(name = "name")
    private String name;

    @XmlElement(name = "Point")
    private Point point;

    public String getName() {
        return name;
    }

    public boolean isNameValid() {
        return !name.startsWith("#");
    }

    public Point getPoint() {
        return point;
    }
}
