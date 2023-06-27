import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Article from '@mui/icons-material/Article';
import { useNavigate, useLocation } from 'react-router-dom';

const StyledTitle = styled(Typography)({
  flexGrow: 1,
  textDecoration: 'none',
  color: 'inherit',
});

const NavBar = ({ loggedIn, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;

  const handleLogout = () => {
    onLogout()
    navigate('/')
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <StyledTitle variant="h6" align='left'>
          Report App
        </StyledTitle>
        {loggedIn && (
          <React.Fragment>
            <Button  variant="contained" color="secondary" sx={{ mr: 1 }} onClick={() => navigate("/search-report")}>
              <SearchIcon />
              Search Report
            </Button>
            <Button variant="contained"  sx={{ mr: 1 }} color="secondary" onClick={() => navigate("/create-report")}>
              <AddIcon />
              Create Report
            </Button>
            <Button variant="contained" sx={{ mr: 1 }} color="secondary" onClick={() => navigate("/user-reports")}>
              <Article />
              View My Reports
            </Button>
          </React.Fragment>
        )}
        {loggedIn ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : pathname !== '/login' ?
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
          : ''
        }
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
