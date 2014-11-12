package com.acelvia.shipwrecks.services.wikipedia;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import java.util.ArrayList;
import java.util.List;

@XmlAccessorType(XmlAccessType.FIELD)
public class Document {

    @XmlElement(name = "Folder")
    private List<Folder> folders;

    public List<Folder> getFolders() {
        return folders;
    }

    public List<Placemark> getPlacemarks() {
        List<Placemark> placemarks = new ArrayList<Placemark>();

        for (Folder folder : getFolders()) {
            placemarks.addAll(folder.getPlacemarks());
        }

        return placemarks;
    }
}
