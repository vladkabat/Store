/*
 * @(#)FrequencyConverterService.java
 *
 */



package by.company.store.services.products;

import by.company.soap.PriceServiceService;
import by.company.store.enums.ProductType;
import by.company.store.models.products.FrequencyConverter;
import by.company.store.repositories.products.FrequencyConverterRepository;
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
 * Service for frequency converter
 *
 */
@Service
public class FrequencyConverterService {

    private final FrequencyConverterRepository frequencyConverterRepository;
    private final PriceService priceService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public FrequencyConverterService(FrequencyConverterRepository frequencyConverterRepository) {
        this.priceService = new PriceServiceService().getPriceServicePort();
        this.frequencyConverterRepository = frequencyConverterRepository;
    }

    /**
     * Get frequency converter by id and set price (get price from SOAP)
     * @param id id frequency converter
     * @return frequency converter
     */
    public FrequencyConverter findById(String id) {
        FrequencyConverter frequencyConverter = frequencyConverterRepository.findById(id).orElse(null);
        if(frequencyConverter != null) {
            double price = priceService.getPriceByProductId(frequencyConverter.getId());
            frequencyConverter.setPrice(price);
            logger.info("Frequency converter '{}' is found", frequencyConverter.getName());
        } else {
            logger.error("Frequency converter '{}' not found", id);
        }
        return frequencyConverter;
    }

    public void delete(String id) {
        logger.info("Frequency converter '{}' is deleted", id);
        frequencyConverterRepository.deleteById(id);
    }

    public void save(FrequencyConverter frequencyConverter) {
        frequencyConverter.setType(ProductType.FREQUENCY_CONVERTER);
        frequencyConverter.setRatings(new ArrayList<>());
        logger.info("Frequency converter '{}' is saved", frequencyConverter.getName());
        frequencyConverterRepository.save(frequencyConverter);
    }

    public void update(FrequencyConverter frequencyConverter) {
        logger.info("FrequencyConverter '{}' is updated", frequencyConverter.getName());
        frequencyConverterRepository.save(frequencyConverter);
    }

    /**
     * Get all frequency converters from db and set prices (get prices from SOAP)
     * @return list with frequency converters
     */
    public Page<FrequencyConverter> findAll(Pageable pageable) {
        Page<FrequencyConverter> tablets = frequencyConverterRepository.findAll(pageable);
        for(FrequencyConverter frequencyConverter : tablets){
            double price = priceService.getPriceByProductId(frequencyConverter.getId());
            frequencyConverter.setPrice(price);
        }
        logger.info("User get {} frequency converters", tablets.getNumberOfElements());
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
     * Get all frequency converters from db and set prices (get prices from SOAP)
     * @return list with frequency converters
     */
    public List<FrequencyConverter> findAll() {
        List<FrequencyConverter> frequencyConverters = frequencyConverterRepository.findAll();
        for(FrequencyConverter frequencyConverter : frequencyConverters){
            double price = priceService.getPriceByProductId(frequencyConverter.getId());
            frequencyConverter.setPrice(price);
        }
        logger.info("User get {} frequency converters", frequencyConverters.size());
        return frequencyConverters;
    }
}
