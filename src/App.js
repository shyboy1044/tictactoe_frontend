import React, { useEffect, useState } from 'react';
import './App.css';
import Game from './Components/Game';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
const App = () => {

  const [userId, setUserId] = useState("");
  useEffect(async () => {
    let data = localStorage.getItem("userId")
    console.log(data)
    if (data) {
      await verify(data);
    }
  }, []);


  const verify = async (token) => {
    const result = await fetch("http://localhost:8086/api/auth/verifyToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  // Make sure this header is included
      },
      body: JSON.stringify({ userId: `${token}` }),  // Ensure the body is stringified
    });

    if (!result.ok) {
      // throw new Error("Failed to authenticate");
      //logout
    }
    const data = await result.json();
    const { userId} = data;
    setUserId(userId);
    localStorage.setItem("userId", userId);
  }

  const login = useGoogleLogin({
    onSuccess: async codeResponse => {
      localStorage.setItem("googleInfo", codeResponse.code);
      await sendToken(codeResponse.code);
    },
    onError: error => {
      console.log("error");
    },
    flow: 'auth-code',
  });


  const sendToken = async (token) => {
    const result = await fetch("http://localhost:8086/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  // Make sure this header is included
      },
      body: JSON.stringify({ code: token }),  // Ensure the body is stringified
    });

    if (!result.ok) {
      // throw new Error("Failed to authenticate");
      //logout
    }

    // Parse the JSON response
    const data = await result.json();

    // Extract the email from the response
    const { userId, access_token, refresh_token } = data;
    setUserId(userId);
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", refresh_token);
    localStorage.setItem("access_token", access_token);

  }

  return (
    <div className="App">
      {
        userId ? (<>
          <Game />
        </>) : (
          <button onClick={() => login()}>Sign in with Google 🚀</button>
        )
      }
    </div>
  );
};

export default App;
