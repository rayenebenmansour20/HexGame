import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { H1,H2,H3,NASH } from '../assets';

const Animations = () => {
useEffect(() => {
  function animateFrom(elem, direction) {
    direction = direction || 1;
    var x = 0,
        y = direction * 100;
    if(elem.classList.contains("gs_reveal_fromLeft")) {
      x = -100;
      y = 0;
    } else if (elem.classList.contains("gs_reveal_fromRight")) {
      x = 100;
      y = 0;
    }
    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
      duration: 1.25, 
      x: 0,
      y: 0, 
      autoAlpha: 1, 
      ease: "expo", 
      overwrite: "auto"
    });
  }
  
  function hide(elem) {
    gsap.set(elem, {autoAlpha: 0});
  }
  
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
    hide(elem); // assure that the element is hidden when scrolled into view
    
    ScrollTrigger.create({
      trigger: elem,
      onEnter: function() { animateFrom(elem) }, 
      onEnterBack: function() { animateFrom(elem, -1) },
      onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
    });
  });
}, []);

  return (
    <div class="cInnerContent">
    <h1 className={`text-gradient object-center my-20 text-6xl text-center`}>A Propos</h1>
    
    <div class="features">
  
      <div class="feature ipsSpacer_bottom_double ipsGrid ipsGrid_collapsePhone">
        <div class="featured-image-container ipsGrid_span5 gs_reveal gs_reveal_fromLeft">
          <div class="card1">
            <img width="467" src={NASH} alt="NASH"
             />
          </div>
        </div>
  
        <div class="ipsGrid_span7 ipsType_left">
          <h2 class="heading_large gs_reveal" ><strong><a href="https://fr.wikipedia.org/wiki/John_Forbes_Nash">John Forbes Nash</a></strong></h2>
          <p class="gs_reveal" className='text-gradient font-poppins'>Hex a également été inventé par le brillant mathématicien John Forbes Nash en 1948, à Princeton aux États-Unis. John Nash est surtout connu pour sa théorie des jeux, qui lui a permis d'obtenir le prix Nobel d'économie en 1994</p>
        </div>
      </div>
  
      <div class="feature ipsSpacer_bottom_double ipsGrid ipsGrid_collapsePhone">
        <div class="ipsGrid_span7 ipsType_right">
          <h2 class="heading_large gs_reveal"><strong>Placement des Pièces,Déplacements </strong></h2>
          <p class="gs_reveal" className='text-gradient font-poppins'>Les joueurs peuvent placer des pièces ou des pions sur les cellules de la grille hexagonale selon les règles spécifiques du jeu.Les pièces peuvent se déplacer d'une cellule à une autre selon des règles de mouvement prédéfinies. Les déplacements peuvent être limités par des obstacles ou des conditions spéciales</p>
        </div>
  
        <div class="featured-image-container ipsGrid_span5 gs_reveal gs_reveal_fromRight">
          <div class="card1">
            <img  src={H1} alt="H1"/> 
          </div>
        </div>
      </div>
  
      <div class="feature ipsSpacer_bottom_double ipsGrid ipsGrid_collapsePhone">
        <div class="featured-image-container ipsGrid_span5 gs_reveal gs_reveal_fromLeft">
          <div class="card1">
            <img src={H2} alt="H2" />
          </div>
        </div>
  
        <div class="ipsGrid_span7 ipsType_left">
          <h2 class="heading_large gs_reveal"><strong>Objectifs,Interaction Multijoueur</strong></h2>
          <p class="gs_reveal" className='text-gradient'>Chaque jeu peut avoir ses propres objectifs, tels que la capture de pièces adverses, la conquête de territoire, ou la résolution de puzzles. Les joueurs doivent atteindre ces objectifs pour gagner la partie.De nombreux jeux Hexgame peuvent être joués en mode multijoueur, permettant à plusieurs joueurs de s'affronter en ligne ou en local</p>
        </div>
      </div>
  
      <div class="feature ipsSpacer_bottom_double ipsGrid ipsGrid_collapsePhone">
        <div class="ipsGrid_span7 ipsType_right">
          <h2 class="heading_large gs_reveal"><strong>Stratégie,Variété de Jeux </strong></h2>
          <p  className='text-gradient'>Les jeux développés avec Hexgame mettent souvent l'accent sur la stratégie, les joueurs devant planifier leurs mouvements et leurs actions pour atteindre leurs objectifs tout en contrant les stratégies adverses.Hexgame peut être utilisé pour créer une variété de jeux, des jeux de guerre stratégiques aux puzzles réflexifs, en passant par des jeux de société traditionnels</p>
        </div>
  
        <div class="featured-image-container ipsGrid_span5 gs_reveal gs_reveal_fromRight">
          <div class="card1">
            <img src={H3} alt="H3"/>
          </div>
        </div>
      </div>
  
    </div>
  
  </div>
  
  
  
  
  
  );
};

export default Animations;
