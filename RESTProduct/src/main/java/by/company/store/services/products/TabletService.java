/*
 * @(#)TabletService.java 1.8.0_101 2017/10/01
 *
 * Copyright (c) 2017 Kabat Vlad
 */



package by.company.store.services.products;

import by.company.soap.PriceServiceService;
import by.company.store.enums.ProductType;
import by.company.store.models.products.FrequencyConverter;
import by.company.store.repositories.products.TabletRepository;
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
 * Service for tablets
 *
 * @author Kabat Vlad
 * @version 1.0.0 19 Oct 2017
 */
@Service
public class TabletService {

    private final TabletRepository tabletRepository;
    private final PriceService priceService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public TabletService(TabletRepository tabletRepository) {
        this.priceService = new PriceServiceService().getPriceServicePort();
        this.tabletRepository = tabletRepository;
    }

    /**
     * Get tablet by id and set price (get price from SOAP)
     * @param id id tablet
     * @return tablet
     */
    public FrequencyConverter findById(String id) {
        FrequencyConverter frequencyConverter = tabletRepository.findById(id).orElse(null);
        if(frequencyConverter != null) {
            double price = priceService.getPriceByProductId(frequencyConverter.getId());
            frequencyConverter.setPrice(price);
            logger.info("FrequencyConverter '{}' is found", frequencyConverter.getName());
        } else {
            logger.error("FrequencyConverter '{}' not found", id);
        }
        return frequencyConverter;
    }

    public void delete(String id) {
        logger.info("FrequencyConverter '{}' is deleted", id);
        tabletRepository.deleteById(id);
    }

    public void save(FrequencyConverter frequencyConverter) {
        frequencyConverter.setType(ProductType.TABLET);
        frequencyConverter.setRatings(new ArrayList<>());
        logger.info("FrequencyConverter '{}' is saved", frequencyConverter.getName());
        tabletRepository.save(frequencyConverter);
    }

    public void update(FrequencyConverter frequencyConverter) {
        logger.info("FrequencyConverter '{}' is updated", frequencyConverter.getName());
        tabletRepository.save(frequencyConverter);
    }

    /**
     * Get all tablets from db and set prices (get prices from SOAP)
     * @return list with tablets
     */
    public Page<FrequencyConverter> findAll(Pageable pageable) {
        Page<FrequencyConverter> tablets = tabletRepository.findAll(pageable);
        for(FrequencyConverter frequencyConverter : tablets){
            double price = priceService.getPriceByProductId(frequencyConverter.getId());
            frequencyConverter.setPrice(price);
        }
        logger.info("User get {} tablets", tablets.getNumberOfElements());
        return tablets;
    }

    public boolean updateAmountMinus(String id, int amount){
        FrequencyConverter frequencyConverter = findById(id);
        if (frequencyConverter != null) {
            int count = frequencyConverter.getAmount() - amount;
            if (count >= 0) {
                frequencyConverter.setAmount(count);
                update(frequencyConverter);
                return true;
            }
        }
        return false;
    }

    /**
     * Get all phones from db and set prices (get prices from SOAP)
     * @return list with phones
     */
    public List<FrequencyConverter> findAll() {
        List<FrequencyConverter> frequencyConverters = tabletRepository.findAll();
        for(FrequencyConverter frequencyConverter : frequencyConverters){
            double price = priceService.getPriceByProductId(frequencyConverter.getId());
            frequencyConverter.setPrice(price);
        }
        logger.info("User get {} phones", frequencyConverters.size());
        return frequencyConverters;
    }
}
