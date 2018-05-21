/*
 * @(#)PhoneRestController.java 1.8.0_101 2017/10/01
 *
 * Copyright (c) 2017 Kabat Vlad
 */


package by.company.store.controllers.products;

import by.company.store.models.products.Engine;
import by.company.store.models.Rating;
import by.company.store.services.ImageService;
import by.company.store.services.OrderService;
import by.company.store.services.products.PhoneService;
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
 * Rest controller for phones
 *
 * @author Kabat Vlad
 * @version 1.0.0 19 Oct 2017
 */
@RestController
@RequestMapping("phones")
public class PhoneRestController {

    private final ImageService imageService;
    private final PhoneService phoneService;
    private final OrderService orderService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public PhoneRestController(ImageService imageService, PhoneService phoneService,
                               OrderService orderService) {
        this.imageService = imageService;
        this.phoneService = phoneService;
        this.orderService = orderService;
    }

    /**
     * Get phone by id
     *
     * @param id id phone
     * @return if exist return 'phone with OK' else NOT_FOUND
     */
    @GetMapping("{id}")
    public ResponseEntity getPhone(@PathVariable String id) {
        Engine engine = phoneService.findById(id);
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
     * Update rating phone
     *
     * @param id     id phone
     * @param rating rating phone
     * @return if exist return 'phone with OK' else NOT_FOUND
     */
    @Secured("ROLE_CUSTOMER")
    @PutMapping("{id}/rating")
    public ResponseEntity updateRatingPhone(@PathVariable String id, @RequestBody Rating rating) {
        Engine engine = phoneService.findById(id);
        if (engine != null) {
            ArrayList<Rating> ratings = engine.getRatings();
            ratings.add(rating);
            engine.setRatings(ratings);
            phoneService.update(engine);
            logger.info("Rating engine {} is updated", engine.getName());
            return new ResponseEntity<>(engine, HttpStatus.OK);
        } else {
            String message = "Engine " + id + " not found!";
            logger.error(message);
            return new ResponseEntity<>(CustomErrorType.builder()
                    .errorMessage(message).build(), HttpStatus.NOT_FOUND);
        }
    }

    //get all phones
    @GetMapping()
    public ResponseEntity getPhones(Pageable pageable) {
        Page<Engine> products = phoneService.findAll(pageable);
        if (products.getTotalElements() > 0) {
            logger.info("Get {} phones", products.getNumberOfElements());
            return new ResponseEntity<>(products, HttpStatus.OK);
        } else {
            logger.info("No phones");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    /**
     * Delete phone by id
     *
     * @param id id phone
     * @return if exist return 'phone with OK' else NO_CONTENT
     */
    @Secured("ROLE_ADMIN")
    @DeleteMapping("{id}")
    public ResponseEntity deletePhone(@PathVariable String id) {
        Engine product = phoneService.findById(id);
        if (product != null) {
            phoneService.delete(id);
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
    public ResponseEntity updatePhone(@RequestParam(required = false) MultipartFile file,
                                      @RequestParam String id, @RequestParam String name,
                                      @RequestParam String description, @RequestParam double ram,
                                      @RequestParam double numberCores, @RequestParam int amount,
                                      @RequestParam double screenSize) {
        if (file != null && !file.isEmpty()) {
            GridFSFile gridFSFile = imageService.save(file);
            if (gridFSFile != null) {
                Engine engine = phoneService.findById(id);
                if (engine != null) {
                    imageService.delete(engine.getImageId());
                    String imageId = gridFSFile.getId().toString();
                    Date uploadDate = gridFSFile.getUploadDate();
                    engine.setName(name);
                    engine.setDescription(description);
                    engine.setRam(ram);
                    engine.setNumberCores(numberCores);
                    engine.setAmount(amount);
                    engine.setScreenSize(screenSize);
                    engine.setUploadDate(uploadDate);
                    engine.setImageId(imageId);
                    phoneService.update(engine);
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
            Engine engine = phoneService.findById(id);
            engine.setName(name);
            engine.setDescription(description);
            engine.setRam(ram);
            engine.setNumberCores(numberCores);
            engine.setAmount(amount);
            engine.setScreenSize(screenSize);
            engine.setUploadDate(uploadDate);
            phoneService.update(engine);
            orderService.updateProduct(engine);
            logger.info("Engine {} is updated", engine.getName());
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @Secured("ROLE_ADMIN")
    @PostMapping()
    public ResponseEntity savePhone(@RequestParam MultipartFile file,
                                    @RequestParam String name, @RequestParam String description,
                                    @RequestParam double ram, @RequestParam double numberCores,
                                    @RequestParam int amount, @RequestParam double screenSize) {
        if (!file.isEmpty()) {
            GridFSFile gridFSFile = imageService.save(file);
            if (gridFSFile != null) {
                String imageId = gridFSFile.getId().asObjectId().getValue().toString();
                Date uploadDate = gridFSFile.getUploadDate();
                Engine engine = new Engine();
                engine.setName(name);
                engine.setDescription(description);
                engine.setRam(ram);
                engine.setNumberCores(numberCores);
                engine.setAmount(amount);
                engine.setScreenSize(screenSize);
                engine.setUploadDate(uploadDate);
                engine.setImageId(imageId);
                phoneService.save(engine);
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
