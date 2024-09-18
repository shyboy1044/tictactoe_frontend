import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleSuccess = (response) => {
    console.log('Login Success:', response);
    navigate('/game'); // Redirect to the game page
  };

  const handleFailure = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to Tic-Tac-Toe</h1>
      <GoogleLogin
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        onError={handleFailure}
      />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  },
};

export default Home;
