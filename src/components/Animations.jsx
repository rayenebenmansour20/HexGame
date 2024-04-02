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
          <h2 class="heading_large gs_reveal" >Create amazing <strong>SVG</strong> animations</h2>
          <p class="gs_reveal" className='text-gradient font-poppins'><a href="https://greensock.com/drawsvg/">DrawSVGPlugin</a> allows you to progressively reveal (or hide) SVG strokes to make them look like they're being drawn. <a href="https://greensock.com/morphsvg/">MorphSVGPlugin</a> to Morph any SVG shape into any other shape smoothly regardless of the number of points in each. <a href="/docs/v3/Plugins/MotionPathPlugin">MotionPathPlugin</a> allows you to easily move any object along a path.</p>
        </div>
      </div>
  
      <div class="feature ipsSpacer_bottom_double ipsGrid ipsGrid_collapsePhone">
        <div class="ipsGrid_span7 ipsType_right">
          <h2 class="heading_large gs_reveal">Supercharge immersive <strong>WebGL</strong> experiences</h2>
          <p class="gs_reveal" className='text-gradient font-poppins'>GreenSock is used in some of the most popular <a href="//threejs.org/">Three.js</a> powered WebGL projects. Animate any object in a scene. <a href="https://greensock.com/PixiPlugin/">PixiPlugin</a> makes animating <a href="//www.pixijs.com/">Pixi.js</a> objects with GSAP a breeze. Animate position, scale, color effects and more with all the power and control of GSAP and the rendering speed of Pixi.js.</p>
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
          <h2 class="heading_large gs_reveal">Control performant <strong>Canvas</strong> animations</h2>
          <p class="gs_reveal" className='text-gradient'>GSAP makes animating with Canvas even easier by providing an easier way to look and sequence animations. GSAP works great with <a href="//www.adobe.com/products/animate.html">Adobe Animate</a> and <a href="//createjs.com/easeljs">EaseJS</a> through GSAP's <a href="https://greensock.com/easelplugin/">EaselJSPlugin</a>.</p>
        </div>
      </div>
  
      <div class="feature ipsSpacer_bottom_double ipsGrid ipsGrid_collapsePhone">
        <div class="ipsGrid_span7 ipsType_right">
          <h2 class="heading_large gs_reveal"><strong>Award winning</strong> websites</h2>
          <p  className='text-gradient'>GSAP is used on over 8,500,000 sites and over 1,000 sites featured on <a href="https://www.awwwards.com/websites/gsap-animation/" target="_blank">Awwwards</a>. For some of our favorites, check out <a href="https://greensock.com/showcase/">our showcase</a>.</p>
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
