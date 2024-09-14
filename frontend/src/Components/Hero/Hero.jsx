import React from 'react'
import "./Hero.css"
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from "../Assets/hero_image.png"
import hero_image2 from "../Assets/hero_image2.jpg"

function Hero() {
    return (
        <div className='hero'>
            <div className="hero-left">
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>New</p>
                        <img src={hand_icon} alt="" />
                    </div>
                    <p>Collections</p>
                    <p>For Everyone</p>
                </div>
                <div className="hero-latest-button">
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="arrow icon" />
                </div>

            </div>
            <div className="hero-right">
                <img src={hero_image2} alt="" />
            </div>
        </div>
    )
}

export default Hero