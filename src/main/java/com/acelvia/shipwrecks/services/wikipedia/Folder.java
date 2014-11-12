package com.acelvia.shipwrecks.services.wikipedia;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import java.util.List;

@XmlAccessorType(XmlAccessType.FIELD)
public class Folder {

    @XmlElement(name = "Placemark")
    private List<Placemark> placemarks;

    public List<Placemark> getPlacemarks() {
        return placemarks;
    }
}
