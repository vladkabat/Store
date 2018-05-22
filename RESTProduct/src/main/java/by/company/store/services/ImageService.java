/*
 * @(#)ImageService.java
 *
 */



package by.company.store.services;

import com.mongodb.client.gridfs.model.GridFSFile;
import org.bson.types.ObjectId;
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
 */
@Service
public class ImageService {

    private final GridFsTemplate gridFsTemplate;

    @Autowired
    public ImageService(GridFsTemplate gridFsTemplate) {
        this.gridFsTemplate = gridFsTemplate;
    }

    public GridFSFile save(MultipartFile file) {
        ObjectId fileId = null;
        try {
            InputStream imageStream = new ByteArrayInputStream(file.getBytes());
            fileId = gridFsTemplate
                    .store(imageStream, file.getOriginalFilename(), file.getContentType(), null);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return gridFsTemplate.findOne(new Query(Criteria.where("_id").is(String.valueOf(fileId))));
    }

    public GridFsResource  findById(String id) {
        GridFSFile file = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(id)));
        return gridFsTemplate.getResource(file.getFilename());
    }

    public void delete(String id){
        gridFsTemplate.delete(new Query(Criteria.where("_id").is(id)));
    }
}
