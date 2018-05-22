/*
 * @(#)ManufacturerService.java
 *
 */



package by.company.store.services;

import by.company.store.models.Manufacturer;
import by.company.store.repositories.ManufacturerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service for manufacturer
 *
 */
@Service
public class ManufacturerService {

    private final ManufacturerRepository manufacturerRepository;

    @Autowired
    public ManufacturerService(ManufacturerRepository manufacturerRepository) {
        this.manufacturerRepository = manufacturerRepository;
    }

    public void save(Manufacturer manufacturer) {
        manufacturerRepository.save(manufacturer);

    }

    public void update(Manufacturer manufacturer){
        manufacturerRepository.save(manufacturer);
    }

    /**
     * Get manufacturer by id
     * @param id id manufacturer
     * @return manufacturer
     */
    public Manufacturer findById(String id) {
        return manufacturerRepository.findById(id).orElse(null);
    }

    public void delete(String id) {
        manufacturerRepository.deleteById(id);
    }

    /**
     * Get all manufacturers from db
     * @return list with manufacturers
     */
    public Page<Manufacturer> findAll(Pageable pageable) {
        return manufacturerRepository.findAll(pageable);
    }
}
