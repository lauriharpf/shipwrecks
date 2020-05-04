package com.acelvia.shipwrecks.services.wikipedia;

import com.acelvia.shipwrecks.models.Shipwreck;
import com.acelvia.shipwrecks.services.Area;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Component
public class AsyncCachingShipwreckFetcher {

    private final CachingShipwreckFetcher cachingShipwreckFetcher;

    public AsyncCachingShipwreckFetcher(CachingShipwreckFetcher cachingShipwreckFetcher) {
        this.cachingShipwreckFetcher = cachingShipwreckFetcher;
    }

    @Async
    public CompletableFuture<List<Shipwreck>> getShipwrecks(Area area) {
        return CompletableFuture.completedFuture(cachingShipwreckFetcher.getShipwrecks(area));
    }
}
