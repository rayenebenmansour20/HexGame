import React from 'react';
import styles from '../style';

function Billing({ src, width, height }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p className={`${styles.paragraph} 
       font-medium object-top my-20 text-7xl`}>
        Apprendre a jouer HexGame
      </p>
    <video className="max-w-full rounded-full custom-gradient-shadow" width={width} height={height} controls autoPlay>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  );
}

export default Billing;
