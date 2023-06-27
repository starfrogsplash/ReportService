import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Link, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password
      },
        { withCredentials: true }
      )

      const { token } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        onLogin()
        navigate('/user-reports'); // Redirect to CreateReport page
      } else {
        setError('Error: No token returned from server');
      }

    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  return (
    <>
      {location.state?.signupSuccess &&
        <Typography variant="h6">
          Sign up successful! You can now log in.
        </Typography>
      }

      {error &&
        <Typography variant="h6">Error: {error}</Typography>
      }
      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom>
                Login to your account
              </Typography>
              <form onSubmit={(e) => handleSubmit(e)}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Sign In
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2" onClick={handleSignUpClick}>
                      Don't have an account? Sign up
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
