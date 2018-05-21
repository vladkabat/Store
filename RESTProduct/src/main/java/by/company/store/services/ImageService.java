/*
 * @(#)ImageService.java 1.8.0_101 2017/10/01
 *
 * Copyright (c) 2017 Kabat Vlad
 */



package by.company.store.services;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Service for image products
 *
 * @author Kabat Vlad
 * @version 1.0.0 19 Oct 2017
 */
@Service
public class ImageService {

    private final GridFsTemplate gridFsTemplate;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public ImageService(GridFsTemplate gridFsTemplate) {
        this.gridFsTemplate = gridFsTemplate;
    }

    public GridFSFile save(MultipartFile file) {
        ObjectId fileId = null;
        try {
            InputStream imageStream = new ByteArrayInputStream(file.getBytes());
            String nameFile = file.getName();
            int indexLastSlash = nameFile.lastIndexOf('\\');
            String realNameFile = nameFile.substring(indexLastSlash + 1,
                    nameFile.length());
            int indexLastPoint = nameFile.lastIndexOf('.');
            String contentType = "image/" +
                    nameFile.substring(indexLastPoint + 1, nameFile.length());
            DBObject metaData = new BasicDBObject();
            metaData.put("originalFilename", nameFile);
            fileId = gridFsTemplate
                    .store(imageStream, realNameFile, contentType, metaData);
        } catch (IOException e) {
            logger.error("Image '{}' not saved", file.getName());
            e.printStackTrace();
        }
        logger.info("Image '{}' is saved", file.getName());
        return gridFsTemplate.findOne(new Query(Criteria.where("_id").is(String.valueOf(fileId))));
    }

    public GridFsResource  findById(String id) {
        GridFSFile file = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(id)));
        GridFsResource resource = gridFsTemplate.getResource(file.getFilename());
        logger.info("Image '{}' is found", file.getFilename());
        return resource;
    }

    public void delete(String id){
        logger.error("Image '{}' deleted", id);
        gridFsTemplate.delete(new Query(Criteria.where("_id").is(id)));
    }
}
