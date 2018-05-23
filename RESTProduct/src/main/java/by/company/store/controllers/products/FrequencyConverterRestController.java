/*
 * @(#)FrequencyConverterRestController.java
 *
 */


package by.company.store.controllers.products;

import by.company.store.models.products.FrequencyConverter;
import by.company.store.services.products.FrequencyConverterService;
import by.company.store.util.CustomErrorType;
import by.company.store.models.Rating;
import by.company.store.services.ImageService;
import by.company.store.services.OrderService;
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
 * Rest controller for frequency converters
 *
 */
@RestController
@RequestMapping("frequencyConverters")
public class FrequencyConverterRestController {

    private final FrequencyConverterService frequencyConverterService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final ImageService imageService;
    private final OrderService orderService;

    @Autowired
    public FrequencyConverterRestController(FrequencyConverterService frequencyConverterService, ImageService imageService,
                                            OrderService orderService) {
        this.frequencyConverterService = frequencyConverterService;
        this.imageService = imageService;
        this.orderService = orderService;
    }

    @GetMapping()
    public ResponseEntity getFrequencyConverters(Pageable pageable) {
        Page<FrequencyConverter> products = frequencyConverterService.findAll(pageable);
        if (products.getTotalElements() > 0) {
            logger.info("Get {} frequency converters", products.getTotalElements());
            return new ResponseEntity<>(products, HttpStatus.OK);
        } else {
            logger.info("No frequency converters");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @Secured("ROLE_CUSTOMER")
    @PutMapping("{id}/rating")
    public ResponseEntity updateRatingFrequencyConverter(@PathVariable String id, @RequestBody Rating rating) {
        FrequencyConverter frequencyConverter = frequencyConverterService.findById(id);
        if (frequencyConverter != null) {
            ArrayList<Rating> ratings = frequencyConverter.getRatings();
            ratings.add(rating);
            frequencyConverter.setRatings(ratings);
            frequencyConverterService.update(frequencyConverter);
            logger.info("Rating frequency converter {} is updated", frequencyConverter.getName());
            return new ResponseEntity<>(frequencyConverter, HttpStatus.OK);
        } else {
            String message = "frequency converter " + id + " not found!";
            logger.error(message);
            return new ResponseEntity<>(CustomErrorType.builder()
                    .errorMessage(message).build(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity getFrequencyConverter(@PathVariable String id) {
        FrequencyConverter product = frequencyConverterService.findById(id);
        if (product != null) {
            logger.info("frequency converter {} is found", product.getName());
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            String message = "frequency converter " + id + " not found!";
            logger.error(message);
            return new ResponseEntity<>(CustomErrorType.builder()
                    .errorMessage(message).build(), HttpStatus.NOT_FOUND);
        }
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping("{id}")
    public ResponseEntity deleteFrequencyConverter(@PathVariable String id) {
        FrequencyConverter product = frequencyConverterService.findById(id);
        if (product != null) {
            frequencyConverterService.delete(id);
            logger.info("frequency converter {} is deleted", product.getName());
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } else {
            String message = "frequency converter " + id + " not fount!";
            logger.error(message);
            return new ResponseEntity<>(CustomErrorType.builder()
                    .errorMessage(message).build(), HttpStatus.NOT_FOUND);
        }
    }

    @Secured("ROLE_ADMIN")
    @PutMapping()
    public ResponseEntity update(@RequestParam(required = false) MultipartFile file,
                                 @RequestParam String id, @RequestParam String name,
                                 @RequestParam String manufacturer, @RequestParam double outputPower,
                                 @RequestParam double outputCurrent, @RequestParam int amount,
                                 @RequestParam double outputVoltage) {
        if (file != null && !file.isEmpty()) {
            GridFSFile gridFSFile = imageService.save(file);
            if (gridFSFile != null) {
                FrequencyConverter frequencyConverter = frequencyConverterService.findById(id);
                if (frequencyConverter != null) {
                    imageService.delete(frequencyConverter.getImageId());
                    String imageId = gridFSFile.getId().asObjectId().getValue().toString();
                    Date uploadDate = gridFSFile.getUploadDate();
                    frequencyConverter.setName(name);
                    frequencyConverter.setManufacturer(manufacturer);
                    frequencyConverter.setOutputCurrent(outputCurrent);
                    frequencyConverter.setOutputPower(outputPower);
                    frequencyConverter.setAmount(amount);
                    frequencyConverter.setOutputVoltage(outputVoltage);
                    frequencyConverter.setUploadDate(uploadDate);
                    frequencyConverter.setImageId(imageId);
                    frequencyConverterService.update(frequencyConverter);
                    orderService.updateProduct(frequencyConverter);
                    logger.info("frequency converter {} is updated", frequencyConverter.getName());
                    return new ResponseEntity<>(HttpStatus.OK);
                } else {
                    String message = "frequency converter " + id + " not found!";
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
            FrequencyConverter frequencyConverter = frequencyConverterService.findById(id);
            frequencyConverter.setName(name);
            frequencyConverter.setManufacturer(manufacturer);
            frequencyConverter.setOutputCurrent(outputCurrent);
            frequencyConverter.setOutputPower(outputPower);
            frequencyConverter.setAmount(amount);
            frequencyConverter.setOutputVoltage(outputVoltage);
            frequencyConverter.setUploadDate(uploadDate);
            frequencyConverterService.update(frequencyConverter);
            orderService.updateProduct(frequencyConverter);
            logger.info("frequency converter {} is updated", frequencyConverter.getName());
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @Secured("ROLE_ADMIN")
    @PostMapping()
    public ResponseEntity save(@RequestParam MultipartFile file, @RequestParam String name,
                               @RequestParam String manufacturer, @RequestParam double outputPower,
                               @RequestParam double outputCurrent, @RequestParam int amount,
                               @RequestParam double outputVoltage) {
        if (!file.isEmpty()) {
            GridFSFile gridFSFile = imageService.save(file);
            if (gridFSFile != null) {
                String imageId = gridFSFile.getId().asObjectId().getValue().toString();
                Date uploadDate = gridFSFile.getUploadDate();
                FrequencyConverter frequencyConverter = new FrequencyConverter();
                frequencyConverter.setName(name);
                frequencyConverter.setManufacturer(manufacturer);
                frequencyConverter.setOutputCurrent(outputCurrent);
                frequencyConverter.setOutputPower(outputPower);
                frequencyConverter.setAmount(amount);
                frequencyConverter.setOutputVoltage(outputVoltage);
                frequencyConverter.setUploadDate(uploadDate);
                frequencyConverter.setImageId(imageId);
                frequencyConverterService.save(frequencyConverter);
                logger.info("frequency converter {} is saved", frequencyConverter.getName());
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
