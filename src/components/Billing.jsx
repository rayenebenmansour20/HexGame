import React from 'react';

function Billing({ src, width, height }) {
  return (
    <div className="flex justify-center items-center h-screen">
    <video className="max-w-full rounded-full custom-gradient-shadow" width={width} height={height} controls autoPlay>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  );
}

export default Billing;
