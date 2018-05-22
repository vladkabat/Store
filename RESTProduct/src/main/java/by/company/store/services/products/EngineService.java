/*
 * @(#)EngineService.java
 *
 */



package by.company.store.services.products;

import by.company.soap.PriceServiceService;
import by.company.store.enums.ProductType;
import by.company.store.models.products.Engine;
import by.company.store.repositories.products.EngineRepository;
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
 * Service for engine
 *
 */
@Service
public class EngineService {

    private final EngineRepository engineRepository;
    private final PriceService priceService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public EngineService(EngineRepository engineRepository) {
        this.priceService = new PriceServiceService().getPriceServicePort();
        this.engineRepository = engineRepository;
    }

    public void save(Engine engine) {
        engine.setType(ProductType.ENGINE);
        engine.setRatings(new ArrayList<>());
        logger.info("Engine '{}' is saved", engine.getName());
        engineRepository.save(engine);
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
        engineRepository.save(engine);
    }

    /**
     * Get all engines from db and set prices (get prices from SOAP)
     * @return list with engines
     */
    public List<Engine> findAll() {
        List<Engine> engines = engineRepository.findAll();
        for(Engine engine : engines){
            double price = priceService.getPriceByProductId(engine.getId());
            engine.setPrice(price);
        }
        logger.info("User get {} engines", engines.size());
        return engines;
    }

    /**
     * Get engines by id and set price (get price from SOAP)
     * @param id id engine
     * @return engine
     */
    public Engine findById(String id) {
        Engine engine = engineRepository.findById(id).orElse(null);
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
        engineRepository.deleteById(id);
    }

    /**
     * Get all engines from db and set prices (get prices from SOAP)
     * @return list with engines
     */
    public Page<Engine> findAll(Pageable pageable) {
        Page<Engine> phones = engineRepository.findAll(pageable);
        for(Engine engine : phones){
            double price = priceService.getPriceByProductId(engine.getId());
            engine.setPrice(price);
        }
        logger.info("User get {} phones", phones.getNumberOfElements());
        return phones;
    }
}
