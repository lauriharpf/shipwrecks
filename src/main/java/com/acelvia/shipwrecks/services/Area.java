package com.acelvia.shipwrecks.services;

public enum Area {

    AFRICA("List_of_shipwrecks_of_Africa"),
    MID_ATLANTIC_OCEAN("List_of_shipwrecks_in_the_mid-Atlantic_Ocean"),
    ATLANTIC_OCEAN("List_of_shipwrecks_in_the_Atlantic_Ocean"),
    ASIA("List_of_shipwrecks_of_Asia"),
    AUSTRALIA("List_of_shipwrecks_of_Australia"),
    CALIFORNIA("List_of_shipwrecks_of_California"),
    CANADA("List_of_shipwrecks_of_Canada"),
    ENGLAND("List_of_shipwrecks_of_England"),
    EUROPE("List_of_shipwrecks_of_Europe"),
    FRANCE("List_of_shipwrecks_of_France"),
    GREAT_LAKES("List_of_shipwrecks_in_the_Great_Lakes"),
    INDIAN_OCEAN("List_of_shipwrecks_in_the_Indian_Ocean"),
    INTERNATIONAL_WATERS("List_of_shipwrecks_in_international_waters"),
    UNITED_KINGDOM("List_of_shipwrecks_of_the_United_Kingdom"),
    FLORIDA("List_of_shipwrecks_of_Florida"),
    MASSACHUSETTS("List_of_shipwrecks_of_Massachusetts"),
    NORTH_AMERICA("List_of_shipwrecks_of_North_America"),
    NORTH_CAROLINA("List_of_shipwrecks_of_North_Carolina"),
    OCEANIA("List_of_shipwrecks_of_Oceania"),
    PACIFIC_OCEAN("List_of_shipwrecks_in_the_Pacific_Ocean"),
    SOUTH_AMERICA("List_of_shipwrecks_of_South_America"),
    UNITED_STATES("List_of_shipwrecks_of_the_United_States");

    private final String pageName;

    Area(String pageName) {
        this.pageName = pageName;
    }

    protected String getPageName() {
        return pageName;
    }

}
