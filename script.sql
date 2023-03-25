CREATE TABLE COMPTE(
   id_compte INT,
   nom VARCHAR(50),
   prenom VARCHAR(50),
   pwd VARCHAR(50),
   pseudo VARCHAR(50),
   email VARCHAR(255),
   role INT,
   abonnement VARCHAR(50),
   photo VARCHAR(50),
   dateheure_creation DATETIME,
   PRIMARY KEY(id_compte)
);

CREATE TABLE SITE(
   id_site INT,
   adresse VARCHAR(255),
   code_postal CHAR(5),
   PRIMARY KEY(id_site)
);

CREATE TABLE MATERIEL(
   id_materiel INT,
   description VARCHAR(50),
   nbr_dispo INT,
   prix INT,
   photo VARCHAR(50),
   PRIMARY KEY(id_materiel)
);

CREATE TABLE ESPACE(
   id_espace INT,
   nbr_places INT NOT NULL,
   id_site INT NOT NULL,
   PRIMARY KEY(id_espace),
   FOREIGN KEY(id_site) REFERENCES SITE(id_site)
);

CREATE TABLE CONVERSATION(
   id_conversation INT,
   id_destinataire INT,
   date_debut DATE,
   id_compte INT NOT NULL,
   PRIMARY KEY(id_conversation),
   FOREIGN KEY(id_compte) REFERENCES COMPTE(id_compte)
);

CREATE TABLE MESSAGE(
   id_message INT,
   id_auteur INT NOT NULL,
   contenu VARCHAR(255),
   post_dateheure DATETIME,
   id_conversation INT NOT NULL,
   PRIMARY KEY(id_message),
   FOREIGN KEY(id_conversation) REFERENCES CONVERSATION(id_conversation)
);

CREATE TABLE TICKET(
   id_ticket INT,
   titre VARCHAR(50),
   description VARCHAR(255),
   dateheure_creation DATETIME,
   id_compte INT NOT NULL,
   PRIMARY KEY(id_ticket),
   FOREIGN KEY(id_compte) REFERENCES COMPTE(id_compte)
);

CREATE TABLE COMMANDE(
   id_commande INT,
   dateheure_envoi DATETIME,
   prix_total INT,
   id_compte INT NOT NULL,
   PRIMARY KEY(id_commande),
   FOREIGN KEY(id_compte) REFERENCES COMPTE(id_compte)
);

CREATE TABLE SUIVI(
   id_suivi INT,
   id_auteur INT NOT NULL,
   contenu VARCHAR(255),
   post_dateheure DATETIME,
   id_ticket INT NOT NULL,
   PRIMARY KEY(id_suivi),
   FOREIGN KEY(id_ticket) REFERENCES TICKET(id_ticket)
);

CREATE TABLE EVENEMENT(
   id_evenement INT,
   description VARCHAR(50),
   type INT,
   nbr_particpants_max INT NOT NULL,
   tarif INT NOT NULL,
   dateheure_debut DATETIME,
   dateheure_fin DATETIME,
   id_site INT NOT NULL,
   PRIMARY KEY(id_evenement),
   FOREIGN KEY(id_site) REFERENCES SITE(id_site)
);

CREATE TABLE PARTICIPE(
   id_compte INT,
   id_evenement INT,
   PRIMARY KEY(id_compte, id_evenement),
   FOREIGN KEY(id_compte) REFERENCES COMPTE(id_compte),
   FOREIGN KEY(id_evenement) REFERENCES EVENEMENT(id_evenement)
);

CREATE TABLE CONTIENT(
   id_materiel INT,
   id_commande INT,
   PRIMARY KEY(id_materiel, id_commande),
   FOREIGN KEY(id_materiel) REFERENCES MATERIEL(id_materiel),
   FOREIGN KEY(id_commande) REFERENCES COMMANDE(id_commande)
);

CREATE TABLE RESERVE(
   id_compte INT,
   id_espace INT,
   date_resa VARCHAR(50),
   PRIMARY KEY(id_compte, id_espace),
   FOREIGN KEY(id_compte) REFERENCES COMPTE(id_compte),
   FOREIGN KEY(id_espace) REFERENCES ESPACE(id_espace)
);
