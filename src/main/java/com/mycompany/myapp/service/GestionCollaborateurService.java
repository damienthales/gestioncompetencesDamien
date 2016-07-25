package com.mycompany.myapp.service;

import com.mycompany.myapp.config.JHipsterProperties;
import com.mycompany.myapp.domain.Adresse;
import com.mycompany.myapp.domain.Collaborateur;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.repository.AdresseRepository;
import com.mycompany.myapp.repository.CollaborateurRepository;

import com.mycompany.myapp.web.rest.dto.GestionCollaborateurDTO;



import org.apache.commons.lang.CharEncoding;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;


import javax.inject.Inject;
import javax.mail.internet.MimeMessage;

import java.util.List;
import java.util.Locale;
import java.util.Set;

import org.springframework.transaction.annotation.Transactional;

/**
 * Service for sending e-mails.
 * <p>
 * We use the @Async annotation to send e-mails asynchronously.
 * </p>
 */
@Transactional
@Service
public class GestionCollaborateurService {

    private final Logger log = LoggerFactory.getLogger(GestionCollaborateurService.class);
   
    @Inject
    CollaborateurRepository collaborateurRepository;
    
    @Inject
    AdresseRepository adresseRepository;
    
    
    public GestionCollaborateurDTO findFirstGestionCollaborateur(){
    	
    	log.debug("GestionCollaborateurDTO ******************************");
    	
    	GestionCollaborateurDTO gestCollab = null;
    	
    	List<Collaborateur> collabList = collaborateurRepository.findAll();
    	
    	log.debug("après findALL ******************************");
    	log.debug("après ESTETESTET ");
    	log.debug("après ESTETESTET ");log.debug("après ESTETESTET ");log.debug("après ESTETESTET ");log.debug("après ESTETESTET ");
    	
    	if (collabList.size() > 0){
    		log.debug("taille collaborateur :" + collabList.size());
    		Collaborateur collab = collabList.get(0);
    		log.debug("AVANT getAdresses "+ collab.getCollaborateurNom());
    		
    		Set<Adresse> adresseList = collab.getAdresses();
    		if (adresseList == null){
    			log.debug("PAS D'ADRESSES!!!!);");
    		}else{
	    		log.debug("APRES getAdresses: "+ adresseList.size());
	    		if (adresseList.size() > 0){
	    			for (Adresse adresse : adresseList){
	    				log.debug("adresse");
	    				gestCollab = new GestionCollaborateurDTO(collab, adresse);
	    				log.debug("mon adresse : "+ adresse.getAdresseNumero());
	    				break;
	    			}
	    		}
    		}
    	}
    	log.debug("avant return");
    	
    	return gestCollab;
    }
 
    
}
