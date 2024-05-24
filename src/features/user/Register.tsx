'use client';

import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { IUserData } from './data/UserData';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState<IUserData>({
    username: '',
    email: '',
    password: '',
    passwordVerify: '',
    phone: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const body = {
    email: formData.email,
    password: formData.password,
    passwordVerify: formData.passwordVerify,
    username: formData.username,
    phone: formData.phone,
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://express3-0319.vercel.app/api/user/register', body);
      console.log(response);
    } catch (error) {
      console.error('Error register:', error);
    }
  };

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Register
          </Typography>
          <Box component='form' noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField margin='normal' required fullWidth id='email' label='Email Address' name='email' autoComplete='email' onChange={handleChange} />
            <TextField margin='normal' required fullWidth name='password' label='Password' type='text' id='password' onChange={handleChange} />
            <TextField margin='normal' required fullWidth name='passwordVerify' label='confirm password' type='text' id='passwordVerify' onChange={handleChange} />
            <TextField margin='normal' required fullWidth name='username' label='username' type='text' id='username' onChange={handleChange} />
            <TextField margin='normal' fullWidth name='phone' label='phone' type='number' id='phone' onChange={handleChange} />

            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
