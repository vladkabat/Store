/*
 * @(#)ProductRestController.java
 *
 */




package by.company.store.controllers.products;

import by.company.store.enums.FilterProducts;
import by.company.store.models.Rating;
import by.company.store.models.products.*;
import by.company.store.services.products.EngineService;
import by.company.store.services.products.FrequencyConverterService;
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
 */
@RestController
@RequestMapping("products")
public class ProductRestController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final EngineService engineService;
    private final FrequencyConverterService frequencyConverterService;

    private FilterProducts filterProducts = FilterProducts.UPLOAD_DATE;

    @Autowired
    public ProductRestController(EngineService engineService, FrequencyConverterService frequencyConverterService) {
        this.engineService = engineService;
        this.frequencyConverterService = frequencyConverterService;
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
        List<Engine> engines = engineService.findAll();
        List<FrequencyConverter> frequencyConverters = frequencyConverterService.findAll();
        //add all products in one map
        List<Product> products = getProducts(engines, frequencyConverters);
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
            for(int i = 0; i < countProducts; i++) {
                clientProducts.add(products.get(i));
            }
        } else {
            clientProducts = products;
        }
        return clientProducts;
    }

    //add all products in one list
    private List<Product> getProducts(List<Engine> engines, List<FrequencyConverter> frequencyConverters) {
        List<Product> products = new ArrayList<>();
        if (engines.size() != 0) {
            products.addAll(engines);
        }
        if (frequencyConverters.size() != 0) {
            products.addAll(frequencyConverters);
        }
        return products;
    }
}
