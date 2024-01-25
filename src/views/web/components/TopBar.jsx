import React from 'react';

import './TopBar.css'


const TopBar = ({ type = 'absolute' }) => {


    return (
        <div>

            {type === 'absolute' ? (
                <div className="top-navbar">
                <div className="left-nav-itmes">
                  <div className="logo">
                    <div className="group-18856">
                      <div className="rectangle-4"></div>
                      <div className="rectangle-5"></div>
                    </div>
                    <div className="macro">Macro </div>
                  </div>
                  <div className="nav-items">
                    <div className="features">Features </div>
                    <div className="pricing">Pricing </div>
                    <div className="about-us">About Us </div>
                    <div className="faq">FAQ </div>
                  </div>
                </div>
                <div className="frame-32">
                  <div className="how-it-works">How it works </div>
                  <div className="buttons">
                    <div className="sign-up">Sign Up </div>
                  </div>
                </div>
              </div>
            ):(
                <div className="top-navbar">
        <div className="left-nav-itmes">
          <div className="logo">
            <div className="group-18856">
              <div className="rectangle-4"></div>
              <div className="rectangle-5"></div>
            </div>
            <div className="macro">Macro </div>
          </div>
          <div className="nav-items">
            <div className="features">Features </div>
            <div className="pricing">Pricing </div>
            <div className="about-us">About Us </div>
            <div className="faq">FAQ </div>
          </div>
        </div>
        <div className="frame-32">
          <div className="how-it-works">How it works </div>
          <div className="buttons">
            <div className="sign-up">Sign Up </div>
          </div>
        </div>
      </div>

            )}


        </div>
    )
}


export default TopBar