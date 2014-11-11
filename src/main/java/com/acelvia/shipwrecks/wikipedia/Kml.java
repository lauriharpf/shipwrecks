package com.acelvia.shipwrecks.wikipedia;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "kml", namespace = "http://earth.google.com/kml/2.1")
@XmlAccessorType(XmlAccessType.FIELD)
public class Kml {

    @XmlElement(name = "Document")
    private Document document;

    public Document getDocument() {
        return document;
    }
}
