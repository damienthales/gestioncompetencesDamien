package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Rubrique.
 */
@Entity
@Table(name = "rubrique")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Rubrique implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "rubrique_libelle", nullable = false)
    private String rubriqueLibelle;

    @Column(name = "rubrique_obligatoire")
    private Boolean rubriqueObligatoire;

    @ManyToOne
    private Collaborateur collaborateur;

    @OneToMany(mappedBy = "rubrique")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Cv> cvs = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRubriqueLibelle() {
        return rubriqueLibelle;
    }

    public void setRubriqueLibelle(String rubriqueLibelle) {
        this.rubriqueLibelle = rubriqueLibelle;
    }

    public Boolean isRubriqueObligatoire() {
        return rubriqueObligatoire;
    }

    public void setRubriqueObligatoire(Boolean rubriqueObligatoire) {
        this.rubriqueObligatoire = rubriqueObligatoire;
    }

    public Collaborateur getCollaborateur() {
        return collaborateur;
    }

    public void setCollaborateur(Collaborateur collaborateur) {
        this.collaborateur = collaborateur;
    }

    public Set<Cv> getCvs() {
        return cvs;
    }

    public void setCvs(Set<Cv> cvs) {
        this.cvs = cvs;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Rubrique rubrique = (Rubrique) o;
        if(rubrique.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, rubrique.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Rubrique{" +
            "id=" + id +
            ", rubriqueLibelle='" + rubriqueLibelle + "'" +
            ", rubriqueObligatoire='" + rubriqueObligatoire + "'" +
            '}';
    }
}
