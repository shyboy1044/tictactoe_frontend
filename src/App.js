import React, { useEffect, useState } from 'react';
import './App.css';
import Game from './Components/Game';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
const App = () => {
  const [user, setUser] = useState(null);

  useEffect(async () => {
    console.log("use")
    if(localStorage.getItem("token")){
      await sendToken(localStorage.getItem("token"));
    }
  }, [])

  const handleLoginSuccess = async (credentialResponse) => {

    const { credential } = credentialResponse;

        // You can decode the credential (JWT) to get the payload
    // const decoded = parseJwt(credential);
    const accessToken = credential;
    // const tokenId = decoded.sub;
    localStorage.setItem("token", accessToken);

    await sendToken(accessToken);

  };

  const sendToken = async (token) => {
    const result = await fetch("http://localhost:8086/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  // Make sure this header is included
      },
      body: JSON.stringify({ token: token }),  // Ensure the body is stringified
    });

    if (!result.ok) {
      // throw new Error("Failed to authenticate");
      //logout
    }

    // Parse the JSON response
    const data = await result.json();

    // Extract the email from the response
    const email = data.email;  // Assuming your backend returns { email: "user@example.com" }
    console.log(email)
    setUser(email);
  }

  return (
    <div className="App">
      {
        user ? (<>
          <Game />
        </>) : (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={(error) => console.error('Login Failed:', error)}
          />
        )
      }
    </div>
  );
};

export default App;
