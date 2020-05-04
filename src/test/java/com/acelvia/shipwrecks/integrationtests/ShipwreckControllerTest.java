package com.acelvia.shipwrecks.integrationtests;

import com.acelvia.shipwrecks.Application;
import com.acelvia.shipwrecks.components.CacheInitializer;
import com.acelvia.shipwrecks.components.HtmlFetcher;
import com.acelvia.shipwrecks.testdata.Shipwrecks;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = Application.class)
@AutoConfigureMockMvc
public class ShipwreckControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HtmlFetcher htmlFetcher;

    @MockBean
    private CacheInitializer cacheInitializer;

    @BeforeEach
    void beforeEach() throws Exception {
        whenFetchingHtml().thenReturn(Jsoup.parse(Shipwrecks.ofAfrica()));
    }

    private org.mockito.stubbing.OngoingStubbing<Document> whenFetchingHtml() throws Exception {
        return when(htmlFetcher.fetch(any(String.class)));
    }

    @Test
    public void getShipwrecksReturnsShipwrecks() throws Exception {
        TestShipwreck[] shipwrecks = getShipwrecks(getShipwrecksRequest());
        int validUniqueShipwrecks = 64;

        Assert.assertEquals(validUniqueShipwrecks, shipwrecks.length);
    }

    private TestShipwreck[] getShipwrecks(MockHttpServletRequestBuilder requestBuilder) throws Exception {
        String responseBody = mockMvc.perform(requestBuilder).andReturn().getResponse().getContentAsString();
        var mapper = new ObjectMapper().registerModule(new JavaTimeModule());

        return mapper.readValue(responseBody, TestShipwreck[].class);
    }

    private MockHttpServletRequestBuilder getShipwrecksRequest() {
        return MockMvcRequestBuilders.get("/api/shipwrecks");
    }

    public static class TestShipwreck {
        public String name;
        public float latitude;
        public float longitude;
        public LocalDate sunkDate;
    }
}
