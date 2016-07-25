package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.mycompany.myapp.domain.enumeration.Langue;

/**
 * A Collaborateur.
 */
@Entity
@Table(name = "collaborateur")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Collaborateur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "collaborateur_nom", nullable = false)
    private String collaborateurNom;

    @NotNull
    @Column(name = "collaborateur_prenom", nullable = false)
    private String collaborateurPrenom;

    @NotNull
    @Column(name = "collaborateur_date_naissance", nullable = false)
    private ZonedDateTime collaborateurDateNaissance;

    @NotNull
    @Column(name = "collaborateur_sexe", nullable = false)
    private String collaborateurSexe;

    @NotNull
    @Column(name = "collaborateur_etat_marital", nullable = false)
    private String collaborateurEtatMarital;

    @Column(name = "collaborateur_nombre_enfant")
    private String collaborateurNombreEnfant;

    @Enumerated(EnumType.STRING)
    @Column(name = "collaborateur_langue")
    private Langue collaborateurLangue;

    @OneToMany(mappedBy = "collaborateur")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Rubrique> donneeRubriques = new HashSet<>();

    @OneToMany(mappedBy = "collaborateur")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Email> emails = new HashSet<>();

    @OneToMany(mappedBy = "collaborateur")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Adresse> adresses = new HashSet<>();

    @OneToMany(mappedBy = "collaborateur")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Fonction> fonctions = new HashSet<>();

    @OneToMany(mappedBy = "collaborateur")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Classification> classifications = new HashSet<>();

    @OneToMany(mappedBy = "collaborateur")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Formation> formations = new HashSet<>();

    @OneToMany(mappedBy = "collaborateur")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Publication> publications = new HashSet<>();

    @OneToMany(mappedBy = "collaborateur")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Diplome> diplomes = new HashSet<>();

    @OneToMany(mappedBy = "collaborateur")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Experience> experiences = new HashSet<>();

    @OneToMany(mappedBy = "collaborateur")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Cv> cvs = new HashSet<>();

    @OneToMany(mappedBy = "collaborateur")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Competence> competences = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCollaborateurNom() {
        return collaborateurNom;
    }

    public void setCollaborateurNom(String collaborateurNom) {
        this.collaborateurNom = collaborateurNom;
    }

    public String getCollaborateurPrenom() {
        return collaborateurPrenom;
    }

    public void setCollaborateurPrenom(String collaborateurPrenom) {
        this.collaborateurPrenom = collaborateurPrenom;
    }

    public ZonedDateTime getCollaborateurDateNaissance() {
        return collaborateurDateNaissance;
    }

    public void setCollaborateurDateNaissance(ZonedDateTime collaborateurDateNaissance) {
        this.collaborateurDateNaissance = collaborateurDateNaissance;
    }

    public String getCollaborateurSexe() {
        return collaborateurSexe;
    }

    public void setCollaborateurSexe(String collaborateurSexe) {
        this.collaborateurSexe = collaborateurSexe;
    }

    public String getCollaborateurEtatMarital() {
        return collaborateurEtatMarital;
    }

    public void setCollaborateurEtatMarital(String collaborateurEtatMarital) {
        this.collaborateurEtatMarital = collaborateurEtatMarital;
    }

    public String getCollaborateurNombreEnfant() {
        return collaborateurNombreEnfant;
    }

    public void setCollaborateurNombreEnfant(String collaborateurNombreEnfant) {
        this.collaborateurNombreEnfant = collaborateurNombreEnfant;
    }

    public Langue getCollaborateurLangue() {
        return collaborateurLangue;
    }

    public void setCollaborateurLangue(Langue collaborateurLangue) {
        this.collaborateurLangue = collaborateurLangue;
    }

    public Set<Rubrique> getDonneeRubriques() {
        return donneeRubriques;
    }

    public void setDonneeRubriques(Set<Rubrique> rubriques) {
        this.donneeRubriques = rubriques;
    }

    public Set<Email> getEmails() {
        return emails;
    }

    public void setEmails(Set<Email> emails) {
        this.emails = emails;
    }

    public Set<Adresse> getAdresses() {
        return adresses;
    }

    public void setAdresses(Set<Adresse> adresses) {
        this.adresses = adresses;
    }

    public Set<Fonction> getFonctions() {
        return fonctions;
    }

    public void setFonctions(Set<Fonction> fonctions) {
        this.fonctions = fonctions;
    }

    public Set<Classification> getClassifications() {
        return classifications;
    }

    public void setClassifications(Set<Classification> classifications) {
        this.classifications = classifications;
    }

    public Set<Formation> getFormations() {
        return formations;
    }

    public void setFormations(Set<Formation> formations) {
        this.formations = formations;
    }

    public Set<Publication> getPublications() {
        return publications;
    }

    public void setPublications(Set<Publication> publications) {
        this.publications = publications;
    }

    public Set<Diplome> getDiplomes() {
        return diplomes;
    }

    public void setDiplomes(Set<Diplome> diplomes) {
        this.diplomes = diplomes;
    }

    public Set<Experience> getExperiences() {
        return experiences;
    }

    public void setExperiences(Set<Experience> experiences) {
        this.experiences = experiences;
    }

    public Set<Cv> getCvs() {
        return cvs;
    }

    public void setCvs(Set<Cv> cvs) {
        this.cvs = cvs;
    }

    public Set<Competence> getCompetences() {
        return competences;
    }

    public void setCompetences(Set<Competence> competences) {
        this.competences = competences;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Collaborateur collaborateur = (Collaborateur) o;
        if(collaborateur.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, collaborateur.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Collaborateur{" +
            "id=" + id +
            ", collaborateurNom='" + collaborateurNom + "'" +
            ", collaborateurPrenom='" + collaborateurPrenom + "'" +
            ", collaborateurDateNaissance='" + collaborateurDateNaissance + "'" +
            ", collaborateurSexe='" + collaborateurSexe + "'" +
            ", collaborateurEtatMarital='" + collaborateurEtatMarital + "'" +
            ", collaborateurNombreEnfant='" + collaborateurNombreEnfant + "'" +
            ", collaborateurLangue='" + collaborateurLangue + "'" +
            '}';
    }
}
