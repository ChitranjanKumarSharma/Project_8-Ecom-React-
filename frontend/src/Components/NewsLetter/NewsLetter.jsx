import React from 'react'
import './NewsLetter.css'

function NewsLetter() {
  return (
    <div className='newsLetter'>
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newsletter and stay update</p>
        <div>
            <input type="email" name="email" id="Your email id" />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter