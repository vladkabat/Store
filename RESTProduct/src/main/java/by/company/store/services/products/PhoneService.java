/*
 * @(#)PhoneService.java 1.8.0_101 2017/10/01
 *
 * Copyright (c) 2017 Kabat Vlad
 */



package by.company.store.services.products;

import by.company.soap.PriceServiceService;
import by.company.store.enums.ProductType;
import by.company.store.models.products.Engine;
import by.company.store.repositories.products.PhoneRepository;
import by.company.soap.PriceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Service for phones
 *
 * @author Kabat Vlad
 * @version 1.0.0 19 Oct 2017
 */
@Service
public class PhoneService {

    private final PhoneRepository phoneRepository;
    private final PriceService priceService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public PhoneService(PhoneRepository phoneRepository) {
        this.priceService = new PriceServiceService().getPriceServicePort();
        this.phoneRepository = phoneRepository;
    }

    public void save(Engine engine) {
        engine.setType(ProductType.PHONE);
        engine.setRatings(new ArrayList<>());
        logger.info("Engine '{}' is saved", engine.getName());
        phoneRepository.save(engine);
    }

    public boolean updateAmountMinus(String id, int amount){
        Engine engine = findById(id);
        if (engine != null) {
            int count = engine.getAmount() - amount;
            if (count >= 0) {
                engine.setAmount(count);
                update(engine);
                return true;
            }
        }
        return false;
    }

    public void update(Engine engine){
        logger.info("Engine '{}' is updated", engine.getName());
        phoneRepository.save(engine);
    }

    /**
     * Get all phones from db and set prices (get prices from SOAP)
     * @return list with phones
     */
    public List<Engine> findAll() {
        List<Engine> engines = phoneRepository.findAll();
        for(Engine engine : engines){
            double price = priceService.getPriceByProductId(engine.getId());
            engine.setPrice(price);
        }
        logger.info("User get {} engines", engines.size());
        return engines;
    }

    /**
     * Get phone by id and set price (get price from SOAP)
     * @param id id phone
     * @return phone
     */
    public Engine findById(String id) {
        Engine engine = phoneRepository.findById(id).orElse(null);
        if(engine != null) {
            double price = priceService.getPriceByProductId(engine.getId());
            engine.setPrice(price);
            logger.info("Engine '{}' is found", engine.getName());
        } else {
            logger.error("Engine '{}' not found", id);
        }
        return engine;
    }

    public void delete(String id) {
        logger.info("Engine '{}' is deleted", id);
        phoneRepository.deleteById(id);
    }

    /**
     * Get all phones from db and set prices (get prices from SOAP)
     * @return list with phones
     */
    public Page<Engine> findAll(Pageable pageable) {
        Page<Engine> phones = phoneRepository.findAll(pageable);
        for(Engine engine : phones){
            double price = priceService.getPriceByProductId(engine.getId());
            engine.setPrice(price);
        }
        logger.info("User get {} phones", phones.getNumberOfElements());
        return phones;
    }
}
