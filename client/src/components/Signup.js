import React, { useState } from 'react';
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
  };

  const handleSubmit = async () => {
    if (!username) {
      setUsernameError(true);
    }
    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }

    try {
      if (username && email && password) {
        axios.defaults.withCredentials = true;
        const response = await axios.post('http://localhost:3001/signup', {
          username,
          email,
          password
        },
          { withCredentials: true }
        )

        if (response.status === 201) {
          navigate('/login', { state: { signupSuccess: true } });
        }
      }

    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  if (error) {
    return <Typography variant="h6">Error: {error}</Typography>;
  }

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign up for an account
          </Typography>
          <form>
            <TextField
              id="username"
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={handleUsernameChange}
              error={usernameError}
              helperText={usernameError && 'Username is required'}
            />
            <TextField
              id="email"
              label="Email address"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailError && 'Email is required'}
            />
            <TextField
              id="password"
              label="Password"
              fullWidth
              margin="normal"
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
              helperText={passwordError && 'Password is required'}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleSubmit}
            >
              Sign up
            </Button>
          </form>
          <Typography variant="body1" align="center" sx={{ marginTop: 2 }}>
            <Link href="#" variant="body2" onClick={handleLoginClick}>
              Already have an account? Login
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignUp;
