/*
 * @(#)TabletRestController.java 1.8.0_101 2017/10/01
 *
 * Copyright (c) 2017 Kabat Vlad
 */


package by.company.store.controllers.products;

import by.company.store.models.products.FrequencyConverter;
import by.company.store.util.CustomErrorType;
import by.company.store.models.Rating;
import by.company.store.services.ImageService;
import by.company.store.services.OrderService;
import by.company.store.services.products.TabletService;
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
 * Rest controller for tablets
 *
 * @author Kabat Vlad
 * @version 1.0.0 19 Oct 2017
 */
@RestController
@RequestMapping("tablets")
public class TabletRestController {

    private final TabletService tabletService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final ImageService imageService;
    private final OrderService orderService;

    @Autowired
    public TabletRestController(TabletService tabletService, ImageService imageService,
                                OrderService orderService) {
        this.tabletService = tabletService;
        this.imageService = imageService;
        this.orderService = orderService;
    }

    @GetMapping()
    public ResponseEntity getTablets(Pageable pageable) {
        Page<FrequencyConverter> products = tabletService.findAll(pageable);
        if (products.getTotalElements() > 0) {
            logger.info("Get {} tablets", products.getTotalElements());
            return new ResponseEntity<>(products, HttpStatus.OK);
        } else {
            logger.info("No tablets");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @Secured("ROLE_CUSTOMER")
    @PutMapping("{id}/rating")
    public ResponseEntity updateRatingTablet(@PathVariable String id, @RequestBody Rating rating) {
        FrequencyConverter frequencyConverter = tabletService.findById(id);
        if (frequencyConverter != null) {
            ArrayList<Rating> ratings = frequencyConverter.getRatings();
            ratings.add(rating);
            frequencyConverter.setRatings(ratings);
            tabletService.update(frequencyConverter);
            logger.info("Rating frequencyConverter {} is updated", frequencyConverter.getName());
            return new ResponseEntity<>(frequencyConverter, HttpStatus.OK);
        } else {
            String message = "FrequencyConverter " + id + " not found!";
            logger.error(message);
            return new ResponseEntity<>(CustomErrorType.builder()
                    .errorMessage(message).build(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity getTablet(@PathVariable String id) {
        FrequencyConverter product = tabletService.findById(id);
        if (product != null) {
            logger.info("FrequencyConverter {} is found", product.getName());
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            String message = "FrequencyConverter " + id + " not found!";
            logger.error(message);
            return new ResponseEntity<>(CustomErrorType.builder()
                    .errorMessage(message).build(), HttpStatus.NOT_FOUND);
        }
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping("{id}")
    public ResponseEntity deleteTablet(@PathVariable String id) {
        FrequencyConverter product = tabletService.findById(id);
        if (product != null) {
            tabletService.delete(id);
            logger.info("FrequencyConverter {} is deleted", product.getName());
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } else {
            String message = "FrequencyConverter " + id + " not fount!";
            logger.error(message);
            return new ResponseEntity<>(CustomErrorType.builder()
                    .errorMessage(message).build(), HttpStatus.NOT_FOUND);
        }
    }

    @Secured("ROLE_ADMIN")
    @PutMapping()
    public ResponseEntity update(@RequestParam(required = false) MultipartFile file,
                                 @RequestParam String id, @RequestParam String name,
                                 @RequestParam String description, @RequestParam double ram,
                                 @RequestParam double numberCores, @RequestParam int amount,
                                 @RequestParam double screenSize) {
        if (file != null && !file.isEmpty()) {
            GridFSFile gridFSFile = imageService.save(file);
            if (gridFSFile != null) {
                FrequencyConverter frequencyConverter = tabletService.findById(id);
                if (frequencyConverter != null) {
                    imageService.delete(frequencyConverter.getImageId());
                    String imageId = gridFSFile.getId().toString();
                    Date uploadDate = gridFSFile.getUploadDate();
                    frequencyConverter.setName(name);
                    frequencyConverter.setDescription(description);
                    frequencyConverter.setRam(ram);
                    frequencyConverter.setNumberCores(numberCores);
                    frequencyConverter.setAmount(amount);
                    frequencyConverter.setScreenSize(screenSize);
                    frequencyConverter.setUploadDate(uploadDate);
                    frequencyConverter.setImageId(imageId);
                    tabletService.update(frequencyConverter);
                    orderService.updateProduct(frequencyConverter);
                    logger.info("FrequencyConverter {} is updated", frequencyConverter.getName());
                    return new ResponseEntity<>(HttpStatus.OK);
                } else {
                    String message = "FrequencyConverter " + id + " not found!";
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
            FrequencyConverter frequencyConverter = tabletService.findById(id);
            frequencyConverter.setName(name);
            frequencyConverter.setDescription(description);
            frequencyConverter.setRam(ram);
            frequencyConverter.setNumberCores(numberCores);
            frequencyConverter.setAmount(amount);
            frequencyConverter.setScreenSize(screenSize);
            frequencyConverter.setUploadDate(uploadDate);
            tabletService.update(frequencyConverter);
            orderService.updateProduct(frequencyConverter);
            logger.info("FrequencyConverter {} is updated", frequencyConverter.getName());
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @Secured("ROLE_ADMIN")
    @PostMapping()
    public ResponseEntity save(@RequestParam MultipartFile file, @RequestParam String name,
                               @RequestParam String description, @RequestParam double ram,
                               @RequestParam double numberCores, @RequestParam int amount,
                               @RequestParam double screenSize) {
        if (!file.isEmpty()) {
            GridFSFile gridFSFile = imageService.save(file);
            if (gridFSFile != null) {
                String imageId = gridFSFile.getId().toString();
                Date uploadDate = gridFSFile.getUploadDate();
                FrequencyConverter frequencyConverter = new FrequencyConverter();
                frequencyConverter.setName(name);
                frequencyConverter.setDescription(description);
                frequencyConverter.setRam(ram);
                frequencyConverter.setNumberCores(numberCores);
                frequencyConverter.setAmount(amount);
                frequencyConverter.setScreenSize(screenSize);
                frequencyConverter.setUploadDate(uploadDate);
                frequencyConverter.setImageId(imageId);
                tabletService.save(frequencyConverter);
                logger.info("FrequencyConverter {} is saved", frequencyConverter.getName());
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
