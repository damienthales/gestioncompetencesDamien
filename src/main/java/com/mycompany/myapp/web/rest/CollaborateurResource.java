package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Collaborateur;
import com.mycompany.myapp.repository.CollaborateurRepository;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Collaborateur.
 */
@RestController
@RequestMapping("/api")
public class CollaborateurResource {

    private final Logger log = LoggerFactory.getLogger(CollaborateurResource.class);
        
    @Inject
    private CollaborateurRepository collaborateurRepository;
    
    /**
     * POST  /collaborateurs : Create a new collaborateur.
     *
     * @param collaborateur the collaborateur to create
     * @return the ResponseEntity with status 201 (Created) and with body the new collaborateur, or with status 400 (Bad Request) if the collaborateur has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/collaborateurs",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Collaborateur> createCollaborateur(@Valid @RequestBody Collaborateur collaborateur) throws URISyntaxException {
        log.debug("REST request to save Collaborateur : {}", collaborateur);
        if (collaborateur.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("collaborateur", "idexists", "A new collaborateur cannot already have an ID")).body(null);
        }
        Collaborateur result = collaborateurRepository.save(collaborateur);
        return ResponseEntity.created(new URI("/api/collaborateurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("collaborateur", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /collaborateurs : Updates an existing collaborateur.
     *
     * @param collaborateur the collaborateur to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated collaborateur,
     * or with status 400 (Bad Request) if the collaborateur is not valid,
     * or with status 500 (Internal Server Error) if the collaborateur couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/collaborateurs",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Collaborateur> updateCollaborateur(@Valid @RequestBody Collaborateur collaborateur) throws URISyntaxException {
        log.debug("REST request to update Collaborateur : {}", collaborateur);
        if (collaborateur.getId() == null) {
            return createCollaborateur(collaborateur);
        }
        Collaborateur result = collaborateurRepository.save(collaborateur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("collaborateur", collaborateur.getId().toString()))
            .body(result);
    }

    /**
     * GET  /collaborateurs : get all the collaborateurs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of collaborateurs in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @RequestMapping(value = "/collaborateurs",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Collaborateur>> getAllCollaborateurs(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Collaborateurs");
        Page<Collaborateur> page = collaborateurRepository.findAll(pageable); 
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/collaborateurs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /collaborateurs/:id : get the "id" collaborateur.
     *
     * @param id the id of the collaborateur to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the collaborateur, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/collaborateurs/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Collaborateur> getCollaborateur(@PathVariable Long id) {
        log.debug("REST request to get Collaborateur : {}", id);
        Collaborateur collaborateur = collaborateurRepository.findOne(id);
        return Optional.ofNullable(collaborateur)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /collaborateurs/:id : delete the "id" collaborateur.
     *
     * @param id the id of the collaborateur to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/collaborateurs/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteCollaborateur(@PathVariable Long id) {
        log.debug("REST request to delete Collaborateur : {}", id);
        collaborateurRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("collaborateur", id.toString())).build();
    }

}
