package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.GestionCollaborateur;
import com.mycompany.myapp.domain.Telephone;
import com.mycompany.myapp.repository.GestionCollaborateurRepository;
import com.mycompany.myapp.repository.TelephoneRepository;
import com.mycompany.myapp.service.GestionCollaborateurService;
import com.mycompany.myapp.web.rest.util.HeaderUtil;

import com.mycompany.myapp.web.rest.dto.GestionCollaborateurDTO;

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
 * REST controller for managing Telephone.
 */
@RestController
@RequestMapping("/api")
public class GestionCollaborateurResource {

    private final Logger log = LoggerFactory.getLogger(GestionCollaborateurResource.class);
        
    @Inject
    private GestionCollaborateurRepository gestionCollaborateurRepository;
    @Inject
    private GestionCollaborateurService gestionCollaborateurService;


    /**
     * GET  /telephones : get all the telephones.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of telephones in body
     */
    @RequestMapping(value = "/gestion-collaborateur",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public GestionCollaborateurDTO getFirstGestionCollaborateur() {
        log.debug("REST request to get all GestionCollaborateurs ******************************");
        GestionCollaborateurDTO gestionCollaborateur = gestionCollaborateurService.findFirstGestionCollaborateur();
        //List<GestionCollaborateur> gestionCollaborateur = gestionCollaborateurRepository.findAll();
        log.debug("***************" + gestionCollaborateur.getCollaborateur() + "    " + gestionCollaborateur.getAdresse());
        
        return gestionCollaborateur;
    }


}
