import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Avatar, Grid, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';


const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [state, setState] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [userEditId, setUserEditId] = useState(null);
  const [password,setPassword] = useState('');
  const [ConfirmPassword,setConfirmPassword] = useState('');


  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    const id = sessionStorage.getItem('uid');
    axios.get(`http://localhost:5000/UserRegById/${id}`).then((res) => {
      const user = res.data.user;
      setName(user.name);
      setEmail(user.email);
      setAddress(user.address);
      setContact(user.contact);
      setState(user.state);
      setProfileImage(user.profileImage);  
      setPassword(user.password);
      setConfirmPassword(user.confirmPassword);
      setUserEditId(user._id); 
    }).catch((err) => {
      console.error(err);
    });
  };

 

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = sessionStorage.getItem('uid');

    const data = {
      name: name,
      email: email,
      address: address,
      password:password,
      contact:contact,
      state:state,
      confirmPassword:ConfirmPassword
    }
    if (userEditId !== null) {
      axios
        .put(`http://localhost:5000/UserRegById/${id}`,data)
        .then((res) => {
          alert(res.data.message);
          fetchUser(); 
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // If sellerEditId is null, create a new seller
      axios
        .post("http://localhost:5000/userReg", data)
        .then((res) => {
          alert(res.data.message);
          fetchUser(); 
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Box sx={{ marginBottom: 10 }}>
      <form onSubmit={handleSubmit}>
        <Card sx={{ marginTop: 7, marginLeft: 5, marginRight: 5 }}>
          <Grid container spacing={3}>
          
            <Grid item xs={12} sm={6}>
              <Box sx={{ fontSize: 40, fontFamily: 'fantasy', marginLeft: 5 }}>
                EDIT PROFILE
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3 }}>
                <Avatar alt="Profile" src={profileImage} sx={{ width: 150, height: 150 }} />
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Name:</strong></TableCell>
                    <TableCell>{name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Email:</strong></TableCell>
                    <TableCell>{email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Address:</strong></TableCell>
                    <TableCell>{address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Contact:</strong></TableCell>
                    <TableCell>{contact}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>State:</strong></TableCell>
                    <TableCell>{state}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Password:</strong></TableCell>
                    <TableCell>{password}</TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell><strong>Photo:</strong></TableCell>
                    <TableCell>
                      <img src={profileImage} width={100} alt="Profile" />
                    </TableCell>
                  </TableRow> */}
                </TableBody>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <CardContent>
                <TableBody>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Contact</TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>State</TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Password</TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Password</TableCell>                             
                    <TableCell>
                      <TextField
                        fullWidth
                        value={ConfirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell>Profile Pic</TableCell>
                    <TableCell>
                      <input type="file" onChange={handleFileChange} name="photo" />
                    </TableCell>
                  </TableRow> */}
                </TableBody>
              </CardContent>
              <CardActions> 
                <Button
                  variant="contained"
                  sx={{ fontFamily: 'fantasy' }}
                  type="submit"
                >
                  <EditIcon /> Save Changes
                </Button>
                <Button
                  variant="contained"
                  sx={{ fontFamily: 'fantasy' }}
                  type="submit"
                >
                  <EditIcon /> <Link to={'/user/pro'}>Edit Pic</Link>
                </Button>

               
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      </form>
    </Box>
  );
};

export default EditProfile;
