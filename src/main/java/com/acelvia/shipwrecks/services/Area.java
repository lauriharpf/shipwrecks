package com.acelvia.shipwrecks.services;

public enum Area {

    AFRICA("List_of_shipwrecks_of_Africa"),
    ATLANTIC_OCEAN("List_of_shipwrecks_in_the_Atlantic_Ocean"),
    ASIA("List_of_shipwrecks_of_Asia"),
    AUSTRALIA("List_of_shipwrecks_of_Australia"),
    CALIFORNIA("List_of_shipwrecks_of_California"),
    CANADA("List_of_shipwrecks_of_Canada"),
    EUROPE("List_of_shipwrecks_of_Europe"),
    FLORIDA("List_of_shipwrecks_of_Florida"),
    PACIFIC_OCEAN("List_of_shipwrecks_in_the_Pacific_Ocean");

    private final String pageName;

    Area(String pageName) {
        this.pageName = pageName;
    }

    protected String getPageName() {
        return pageName;
    }

}
