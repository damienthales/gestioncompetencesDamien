package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Cv;
import com.mycompany.myapp.repository.CvRepository;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Cv.
 */
@RestController
@RequestMapping("/api")
public class CvResource {

    private final Logger log = LoggerFactory.getLogger(CvResource.class);
        
    @Inject
    private CvRepository cvRepository;
    
    /**
     * POST  /cvs : Create a new cv.
     *
     * @param cv the cv to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cv, or with status 400 (Bad Request) if the cv has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/cvs",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Cv> createCv(@RequestBody Cv cv) throws URISyntaxException {
        log.debug("REST request to save Cv : {}", cv);
        if (cv.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("cv", "idexists", "A new cv cannot already have an ID")).body(null);
        }
        Cv result = cvRepository.save(cv);
        return ResponseEntity.created(new URI("/api/cvs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("cv", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cvs : Updates an existing cv.
     *
     * @param cv the cv to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cv,
     * or with status 400 (Bad Request) if the cv is not valid,
     * or with status 500 (Internal Server Error) if the cv couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/cvs",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Cv> updateCv(@RequestBody Cv cv) throws URISyntaxException {
        log.debug("REST request to update Cv : {}", cv);
        if (cv.getId() == null) {
            return createCv(cv);
        }
        Cv result = cvRepository.save(cv);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("cv", cv.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cvs : get all the cvs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cvs in body
     */
    @RequestMapping(value = "/cvs",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Cv> getAllCvs() {
        log.debug("REST request to get all Cvs");
        List<Cv> cvs = cvRepository.findAll();
        return cvs;
    }

    /**
     * GET  /cvs/:id : get the "id" cv.
     *
     * @param id the id of the cv to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cv, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/cvs/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Cv> getCv(@PathVariable Long id) {
        log.debug("REST request to get Cv : {}", id);
        Cv cv = cvRepository.findOne(id);
        return Optional.ofNullable(cv)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /cvs/:id : delete the "id" cv.
     *
     * @param id the id of the cv to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/cvs/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteCv(@PathVariable Long id) {
        log.debug("REST request to delete Cv : {}", id);
        cvRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("cv", id.toString())).build();
    }

}
