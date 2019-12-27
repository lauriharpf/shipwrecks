package com.acelvia.shipwrecks.integrationtests;

import com.acelvia.shipwrecks.Application;
import com.acelvia.shipwrecks.models.Favourite;
import com.acelvia.shipwrecks.models.User;
import com.acelvia.shipwrecks.testdata.Shipwrecks;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = Application.class)
@AutoConfigureMockMvc
public class ShipwreckControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RestTemplate restTemplate;

    @BeforeEach
    void beforeEach() {
        whenGettingAnythingFromWikipedia().thenReturn(Shipwrecks.ofAfrica());
    }

    private org.mockito.stubbing.OngoingStubbing<String> whenGettingAnythingFromWikipedia() {
        return when(restTemplate.getForObject(any(String.class), eq(String.class)));
    }

    public static class TestShipwreck {
        public String name;
        public float latitude;
        public float longitude;
        public boolean favourite;
        public String favouriteId;
    }

    @Nested
    public class WhenUserIsNotLoggedIn {

        @BeforeEach
        void beforeEach() throws Exception {
            loggedInUserWithFavouritesHasFetchedShipwrecks();
        }

        @Test
        public void noFavouritesShouldBeReturned() throws Exception {
            TestShipwreck[] shipwrecks = getShipwrecks(getShipwrecksRequest());
            Assert.assertTrue(Arrays.stream(shipwrecks).noneMatch(shipwreck -> shipwreck.favourite));
        }

        private void loggedInUserWithFavouritesHasFetchedShipwrecks() throws Exception {
            getShipwrecks(getShipwrecksRequest().session(sessionOfLoggedInUser()));
        }

        private MockHttpServletRequestBuilder getShipwrecksRequest() {
            return MockMvcRequestBuilders.get("/shipwrecks");
        }

        private TestShipwreck[] getShipwrecks(MockHttpServletRequestBuilder requestBuilder) throws Exception {
            String responseBody = mockMvc.perform(requestBuilder).andReturn().getResponse().getContentAsString();

            return new ObjectMapper().readValue(responseBody, TestShipwreck[].class);
        }

        private MockHttpSession sessionOfLoggedInUser() {
            User user = Mockito.mock(User.class);
            Favourite favourite = Mockito.mock(Favourite.class);
            when(user.getFavourites()).thenReturn(List.of(favourite));

            MockHttpSession session = new MockHttpSession();
            session.setAttribute("user", user);

            return session;
        }

    }
}
