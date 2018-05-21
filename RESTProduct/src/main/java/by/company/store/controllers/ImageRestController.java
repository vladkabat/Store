/*
 * @(#)ImageRestController.java 1.8.0_101 2017/09/19
 *
 * Copyright (c) 2017 Kabat Vlad
 */



package by.company.store.controllers;

import by.company.store.services.ImageService;
import by.company.store.util.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

/**
 * Rest controller for image products
 *
 * @author Kabat Vlad
 * @version 1.0.0 19 Sep 2017
 */
@RestController
@RequestMapping("images")
public class ImageRestController {

    private final ImageService imageService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public ImageRestController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("/{id}")
    public ResponseEntity getImage(@PathVariable String id){
        GridFsResource imageFile = null;
        try {
            imageFile = imageService.findById(id);
            if(imageFile != null) {
                logger.info("Image '{}' is found", imageFile.getFilename());
                return ResponseEntity.ok()
                        .contentLength(imageFile.contentLength())
                        .contentType(MediaType.parseMediaType(imageFile.getContentType()))
                        .body(new InputStreamResource(imageFile.getInputStream()));
            } else {
                String message = "Image " +  id + " not found!";
                logger.error(message);
                return new ResponseEntity<>(CustomErrorType.builder()
                        .errorMessage(message).build(), HttpStatus.NOT_FOUND);
            }
        } catch (IOException e) {
            String message = "Error while read image!";
            return new ResponseEntity<>(CustomErrorType.builder()
                    .errorMessage(message).build(), HttpStatus.BAD_REQUEST);
        }
    }
}
