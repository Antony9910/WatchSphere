import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, Typography } from '@mui/material';
import { blue, orange, red } from '@mui/material/colors';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';
import GitHubIcon from '@mui/icons-material/GitHub';
import img from './image/watch.avif'; 
import img1 from './image/image1.jpg'
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    axios.post("http://localhost:5000/Login", data)
      .then((res) => {
        console.log(res.data);
        const { id, login } = res.data;
        console.log(login);

        if (login === "Admin") {
          sessionStorage.setItem("aid", id);
          navigate("/admin");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box>
      {/* {sessionStorage.getItem("aid")} */}

      <Box
        sx={{
          backgroundImage: `url(${img})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '1000px',
          width: '110%',
          marginTop:-0
        }}
      >
        </Box>
       
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 3,
            padding: 4,
            width: 300,
            margin: 'auto',
            marginTop: -115,
            marginLeft: 63,
            ":hover": { transform: "scale(1.05)" }
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: 'orange',
              marginBottom: 20,
              marginLeft: 9,
              display: 'flex',
              alignItems: 'center',
              fontSize: 40,
            }}
          >
            SIGN-IN <LoginIcon />
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              marginTop: -49,
              color: 'orange',
            }}
          >
            <form onSubmit={handleSubmit}> 
              <Box sx={{ marginTop: 30 }}>
                <TextField
                  label="Email"
                  color="primary"
                  focused
                  sx={{ marginTop: 2, width: 300 }}
                  value={email}
                  placeholder='Enter your email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box sx={{ marginTop: 5 }}>
                <TextField
                  label="Password"
                  color="primary"
                  focused
                  sx={{ marginBottom: 2, width: 300 }}
                  placeholder='Enter your password'
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>

              <Box
                sx={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                  marginTop: 0,
                  fontFamily: 'fantasy'
                }}
              >
                Forgot your password?
              </Box>

              <Box sx={{ marginBottom: 0 }}>
                <Button
                  variant="contained"
                  sx={{ marginTop: 7, width: 300, height: 40 }}
                  type="submit" 
                >
                  Sign-in
                </Button>
              </Box>

              <Typography sx={{ color: red[500], textAlign: 'center', marginTop: 2 }}>
                or
              </Typography>

              <Box
                sx={{
                  fontSize: 20,
                  width: 300,
                  color: 'orange',
                  alignItems: 'center',
                  display: 'flex',
                  marginLeft: 20
                }}
              >
                Sign in with <GoogleIcon /> <GitHubIcon />
              </Box>
            </form> 
          </Box>
        </Box>
      </Box>

  );
};

export default Login;
