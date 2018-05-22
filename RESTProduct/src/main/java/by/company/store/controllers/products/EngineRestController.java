/*
 * @(#)EngineRestController.java
 *
 */


package by.company.store.controllers.products;

import by.company.store.models.products.Engine;
import by.company.store.models.Rating;
import by.company.store.services.ImageService;
import by.company.store.services.OrderService;
import by.company.store.services.products.EngineService;
import by.company.store.util.CustomErrorType;

import com.mongodb.client.gridfs.model.GridFSFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

/**
 * Rest controller for engines
 *
 */
@RestController
@RequestMapping("engines")
public class EngineRestController {

    private final ImageService imageService;
    private final EngineService engineService;
    private final OrderService orderService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public EngineRestController(ImageService imageService, EngineService engineService,
                                OrderService orderService) {
        this.imageService = imageService;
        this.engineService = engineService;
        this.orderService = orderService;
    }

    /**
     * Get engine by id
     *
     * @param id id engine
     * @return if exist return 'engine with OK' else NOT_FOUND
     */
    @GetMapping("{id}")
    public ResponseEntity getEngine(@PathVariable String id) {
        Engine engine = engineService.findById(id);
        if (engine != null) {
            logger.info("Engine {} is found", engine.getName());
            return new ResponseEntity<>(engine, HttpStatus.OK);
        } else {
            String message = "Engine " + id + " not found!";
            logger.error(message);
            return new ResponseEntity<>(CustomErrorType.builder()
                    .errorMessage(message).build(), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Update rating engine
     *
     * @param id     id engine
     * @param rating rating engine
     * @return if exist return 'engine with OK' else NOT_FOUND
     */
    @Secured("ROLE_CUSTOMER")
    @PutMapping("{id}/rating")
    public ResponseEntity updateRatingEngine(@PathVariable String id, @RequestBody Rating rating) {
        Engine engine = engineService.findById(id);
        if (engine != null) {
            ArrayList<Rating> ratings = engine.getRatings();
            ratings.add(rating);
            engine.setRatings(ratings);
            engineService.update(engine);
            logger.info("Rating engine {} is updated", engine.getName());
            return new ResponseEntity<>(engine, HttpStatus.OK);
        } else {
            String message = "Engine " + id + " not found!";
            logger.error(message);
            return new ResponseEntity<>(CustomErrorType.builder()
                    .errorMessage(message).build(), HttpStatus.NOT_FOUND);
        }
    }

    //get all engines
    @GetMapping()
    public ResponseEntity getEngines(Pageable pageable) {
        Page<Engine> products = engineService.findAll(pageable);
        if (products.getTotalElements() > 0) {
            logger.info("Get {} engines", products.getNumberOfElements());
            return new ResponseEntity<>(products, HttpStatus.OK);
        } else {
            logger.info("No engines");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    /**
     * Delete engine by id
     *
     * @param id id engine
     * @return if exist return 'engine with OK' else NO_CONTENT
     */
    @Secured("ROLE_ADMIN")
    @DeleteMapping("{id}")
    public ResponseEntity deleteEngine(@PathVariable String id) {
        Engine product = engineService.findById(id);
        if (product != null) {
            engineService.delete(id);
            logger.info("Engine {} is deleted", product.getName());
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } else {
            String message = "Engine " + id + " not fount!";
            logger.error(message);
            return new ResponseEntity<>(CustomErrorType.builder()
                    .errorMessage(message).build(), HttpStatus.NOT_FOUND);
        }
    }

    @Secured("ROLE_ADMIN")
    @PutMapping()
    public ResponseEntity update(@RequestParam(required = false) MultipartFile file,
                                      @RequestParam String id, @RequestParam String name,
                                      @RequestParam String manufacturer, @RequestParam double ratedPower,
                                      @RequestParam double ratedCurrent, @RequestParam int amount,
                                      @RequestParam double ratedVoltage) {
        if (file != null && !file.isEmpty()) {
            GridFSFile gridFSFile = imageService.save(file);
            if (gridFSFile != null) {
                Engine engine = engineService.findById(id);
                if (engine != null) {
                    imageService.delete(engine.getImageId());
                    String imageId = gridFSFile.getId().toString();
                    Date uploadDate = gridFSFile.getUploadDate();
                    engine.setName(name);
                    engine.setManufacturer(manufacturer);
                    engine.setRatedPower(ratedPower);
                    engine.setRatedCurrent(ratedCurrent);
                    engine.setAmount(amount);
                    engine.setRatedVoltage(ratedVoltage);
                    engine.setUploadDate(uploadDate);
                    engine.setImageId(imageId);
                    engineService.update(engine);
                    orderService.updateProduct(engine);
                    logger.info("Engine {} is updated", engine.getName());
                    return new ResponseEntity<>(HttpStatus.OK);
                } else {
                    String message = "Engine " + id + " not found!";
                    logger.error(message);
                    return new ResponseEntity<>(CustomErrorType.builder()
                            .errorMessage(message).build(), HttpStatus.NOT_FOUND);
                }
            } else {
                String message = "Error. Image not saved!";
                logger.error(message);
                return new ResponseEntity<>(CustomErrorType.builder()
                        .errorMessage(message).build(), HttpStatus.CONFLICT);
            }
        } else {
            Date uploadDate = Calendar.getInstance().getTime();
            Engine engine = engineService.findById(id);
            engine.setName(name);
            engine.setManufacturer(manufacturer);
            engine.setRatedPower(ratedPower);
            engine.setRatedCurrent(ratedCurrent);
            engine.setAmount(amount);
            engine.setRatedVoltage(ratedVoltage);
            engine.setUploadDate(uploadDate);
            engineService.update(engine);
            orderService.updateProduct(engine);
            logger.info("Engine {} is updated", engine.getName());
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @Secured("ROLE_ADMIN")
    @PostMapping()
    public ResponseEntity save(@RequestParam MultipartFile file,
                                    @RequestParam String name, @RequestParam String manufacturer,
                                    @RequestParam double ratedPower, @RequestParam double ratedCurrent,
                                    @RequestParam int amount, @RequestParam double ratedVoltage) {
        if (!file.isEmpty()) {
            GridFSFile gridFSFile = imageService.save(file);
            if (gridFSFile != null) {
                String imageId = gridFSFile.getId().asObjectId().getValue().toString();
                Date uploadDate = gridFSFile.getUploadDate();
                Engine engine = new Engine();
                engine.setName(name);
                engine.setManufacturer(manufacturer);
                engine.setRatedPower(ratedPower);
                engine.setRatedCurrent(ratedCurrent);
                engine.setAmount(amount);
                engine.setRatedVoltage(ratedVoltage);
                engine.setUploadDate(uploadDate);
                engine.setImageId(imageId);
                engineService.save(engine);
                logger.info("Engine {} is saved", engine.getName());
                return new ResponseEntity<>(HttpStatus.CREATED);
            } else {
                String message = "Error. Image not saved!";
                logger.error(message);
                return new ResponseEntity<>(CustomErrorType.builder()
                        .errorMessage(message).build(), HttpStatus.CONFLICT);
            }
        } else {
            String message = "File is empty!";
            logger.error(message);
            return new ResponseEntity<>(CustomErrorType.builder()
                    .errorMessage(message).build(), HttpStatus.CONFLICT);
        }
    }
}
