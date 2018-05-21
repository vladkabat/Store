/*
 * @(#)ProductRestController.java 1.8.0_101 2017/10/01
 *
 * Copyright (c) 2017 Kabat Vlad
 */




package by.company.store.controllers.products;

import by.company.store.enums.FilterProducts;
import by.company.store.models.Rating;
import by.company.store.models.products.*;
import by.company.store.services.products.PhoneService;
import by.company.store.services.products.TabletService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Rest controller for products
 *
 * @version 1.0.0 19 Oct 2017
 * @author Kabat Vlad
 */
@RestController
@RequestMapping("products")
public class ProductRestController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final PhoneService phoneService;
    private final TvService tvService;
    private final TabletService tabletService;
    private final VideoCameraService videoCameraService;

    private FilterProducts filterProducts = FilterProducts.UPLOAD_DATE;

    @Autowired
    public ProductRestController(PhoneService phoneService, TvService tvService,
                                 TabletService tabletService, VideoCameraService videoCameraService) {
        this.phoneService = phoneService;
        this.tvService = tvService;
        this.tabletService = tabletService;
        this.videoCameraService = videoCameraService;
    }

    @Secured("ROLE_ADMIN")
    @PostMapping("filter")
    public void setDataHomePageProducts(@RequestParam String value) {
        if (value.equals(FilterProducts.UPLOAD_DATE.name())) {
            filterProducts = FilterProducts.UPLOAD_DATE;
        } else if (value.equals(FilterProducts.RATING.name())) {
            filterProducts = FilterProducts.RATING;
        }
        logger.info("Admin set value for filter = {}", filterProducts);
    }

    @GetMapping()
    public ResponseEntity getFourProductsHomePage() {
        //get products
        List<Engine> engines = phoneService.findAll();
        List<Tv> tvs = tvService.findAll();
        List<VideoCamera> videoCameras = videoCameraService.findAll();
        List<FrequencyConverter> frequencyConverters = tabletService.findAll();
        //add all products in one map
        List<Product> products = getProducts(engines, tvs, videoCameras, frequencyConverters);
        //sort products
        if (filterProducts.equals(FilterProducts.UPLOAD_DATE)) {
            products.sort(Comparator.comparing(Product::getUploadDate));
            Collections.reverse(products);
        } else {
            products.sort((product1, product2) -> {
                int value1 = 0, value2 = 0;
                for (Rating rating : product1.getRatings()) {
                    value1 += rating.getValue();
                }
                for (Rating rating : product2.getRatings()) {
                    value2 += rating.getValue();
                }
                if(value1 != 0){
                    value1 = value1 / product1.getRatings().size();
                }
                if(value2 != 0){
                    value2 = value2 / product2.getRatings().size();
                }
                return Integer.compare(value2, value1);
            });
        }
        //filter products
        List<Product> filterProducts = getFilterProducts(products);
        logger.info("User get {} products", filterProducts.size());
        return new ResponseEntity<>(filterProducts, HttpStatus.OK);
    }

    //get 4 filter products
    private List<Product> getFilterProducts(List<Product> products) {
        List<Product> clientProducts = new ArrayList<>();
        int countProducts = 4;
        if (products.size() >= countProducts) {
            for(int i = 0; i < 4; i++) {
                clientProducts.add(products.get(i));
            }
        } else {
            clientProducts = products;
        }
        return clientProducts;
    }

    //add all products in one list
    private List<Product> getProducts(List<Engine> engines, List<Tv> tvs,
                                      List<VideoCamera> videoCameras,
                                      List<FrequencyConverter> frequencyConverters) {
        List<Product> products = new ArrayList<>();
        if (engines.size() != 0) {
            products.addAll(engines);
        }
        if (tvs.size() != 0) {
            products.addAll(tvs);
        }
        if (videoCameras.size() != 0) {
            products.addAll(videoCameras);
        }
        if (frequencyConverters.size() != 0) {
            products.addAll(frequencyConverters);
        }
        return products;
    }
}
