import React, { useState } from 'react'
import './CSS/LoginSignup.css'

function LoginSignup() {
  
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: ""
  })

  const login = async () => {
    console.log("login fun executed", formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else {
      alert(responseData.errors)
    }


  }

  const signup = async () => {
    console.log("Sign Up fun executed", formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else {
      alert(responseData.errors)
    }

  }

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className='loginSignup'>
      <div className="loginSignup-container">
        <h1>{state}</h1>
        <div className="loginSignup-fields">
          {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" id="" placeholder='Your Name' /> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='email' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='password' />
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>

        {state === "Sign Up" ?
          <p className='loginSignup-login'>Already have an account <span onClick={() => setState("Login")}>Login here</span></p> :
          <p className='loginSignup-login'>New User, Create an account <span onClick={() => setState("Sign Up")}>Click here</span></p>}


        <div className="login-signup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup