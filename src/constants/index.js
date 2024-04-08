import { people01, people02, people03, facebook, instagram, linkedin, twitter, airbnb, binance, coinbase, dropbox, send, shield, star  } from "../assets";
import {Link} from 'react-router-dom'
import App from "../App";

export const navLinks = [
  {
    id: "Acceuil",
    title: "Acceuil",
    
  },
  {
    id: "APropos",
    title: "A Propos",
  },
  {
    id: "Démo",
    title: "Démo",
  },
  {
    id: "Régles",
    title: "Régles du jeu",
  },
];

export const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Jeu de placement de pions",
    content:
    "Les joueurs placent alternativement un pion de leur couleur sur une case libre du plateau"  },
  {
    id: "feature-2",
    icon: send,
    title: "Objectif de connexion",
    content:
    "Gagner en reliant les deux bords du plateau avec un chemin continu de pions de sa propre couleur "},
  {
    id: "feature-3",
    icon: shield,
    title: "Règles Strictes",
    content:
    "Chaque case ne peut contenir qu'un seul pion, et une fois placé, un pion ne peut être ni retiré ni déplacé."  },
];




export const footerLinks = [
  {
    title: "Liens Utiles",
    links: [
      {
        name: "Videos",
        link: "https://www.hoobank.com/content/",
      },
      {
        name: "Régles du jeu",
        link: "https://www.hoobank.com/how-it-works/",
      },
      {
        name: "Démo",
        link: "https://www.hoobank.com/create/",
      },
      {
        name: "A Propos",
        link: "https://www.hoobank.com/explore/",
      },
      
    ],
  },
  {
    title: "Partenaires",
    links: [
      {
        name: "Devenir Partenaire",
        link: "https://www.hoobank.com/help-center/",
      },
      {
        name: "Publicité",
        link: "https://www.hoobank.com/partners/",
      },
      
    ],
  },
  {
    title: "Equipe",
    links: [
      {
        name: "R.BENMANSOUR",
        link: "https://www.hoobank.com/our-partner/",
      },
      {
        name: "L.AMARA",
        link: "https://www.hoobank.com/become-a-partner/",
      },
      {
        name: "Z.TOUBAL",
        link: "https://www.hoobank.com/become-a-partner/",
      },
      {
        name: "A.OUDIA",
        link: "https://www.hoobank.com/become-a-partner/",
      },

    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];
