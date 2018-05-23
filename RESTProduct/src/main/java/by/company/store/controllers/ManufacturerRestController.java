/*
 * @(#)ManufacturerRestController.java
 *
 */


package by.company.store.controllers;

import by.company.store.models.Manufacturer;
import by.company.store.services.ManufacturerService;
import by.company.store.util.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

/**
 * Rest controller for manufacturer
 */
@RestController
@RequestMapping("manufacturers")
public class ManufacturerRestController {

    private final ManufacturerService manufacturerService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public ManufacturerRestController(ManufacturerService manufacturerService) {
        this.manufacturerService = manufacturerService;
    }

    //get all manufacturers
    @GetMapping()
    public ResponseEntity getManufacturers(Pageable pageable) {
        Page<Manufacturer> manufacturers = manufacturerService.findAll(pageable);
        logger.info("Get {} manufacturers", manufacturers.getNumberOfElements());
        if (manufacturers.getTotalElements() > 0) {
            return new ResponseEntity<>(manufacturers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    /**
     * Delete manufacturer by id
     *
     * @param id id manufacturer
     * @return if exist return 'manufacturer with OK' else NO_CONTENT
     */
    @Secured("ROLE_ADMIN")
    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable String id) {
        Manufacturer manufacturer = manufacturerService.findById(id);
        if (manufacturer != null) {
            manufacturerService.delete(id);
            logger.info("Manufacturer {} is deleted", id);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } else {
            String message = "Manufacturer " + id + " not found!";
            logger.error(message);
            return new ResponseEntity<>(CustomErrorType.builder()
                    .errorMessage(message).build(), HttpStatus.NOT_FOUND);
        }
    }

    @Secured("ROLE_ADMIN")
    @PutMapping()
    public ResponseEntity update(@RequestBody Manufacturer manufac) {
        Manufacturer manufacturer = manufacturerService.findById(manufac.getId());
        if (manufacturer != null) {
            manufacturer.setName(manufac.getName());
            manufacturer.setDescription(manufac.getDescription());
            manufacturer.setEmail(manufac.getEmail());
            manufacturer.setPhone(manufac.getPhone());
            manufacturerService.update(manufacturer);
            logger.info("Manufacturer {} is updated", manufacturer.getName());
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            String message = "Manufacturer " + manufac.getId() + " not found!";
            logger.error(message);
            return new ResponseEntity<>(CustomErrorType.builder()
                    .errorMessage(message).build(), HttpStatus.NOT_FOUND);
        }
    }

    @Secured("ROLE_ADMIN")
    @PostMapping()
    public ResponseEntity save(@RequestParam String name, @RequestParam String description,
                                    @RequestParam String phone, @RequestParam String email) {
        Manufacturer manufacturer = new Manufacturer();
        manufacturer.setName(name);
        manufacturer.setDescription(description);
        manufacturer.setPhone(phone);
        manufacturer.setEmail(email);
        manufacturerService.save(manufacturer);
        logger.info("Manufacturer {} is saved", manufacturer.getName());
        return new ResponseEntity<>(HttpStatus.CREATED);

    }
}
