'use client';

import { selectUserData, sliceUserActions } from '@/lib/features/user/userSlice';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function Login() {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(sliceUserActions.setUserData(undefined));

    const body = {
      email,
      password,
    };
    try {
      const response = await axios.put('https://express3-0319.vercel.app/api/user/login', body);
      console.log('userData', userData);

      dispatch(sliceUserActions.setUserData(response.data));
    } catch (err) {
      console.error('error', err);
    }
    router.push('/');
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
            Sign in
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin='normal' required fullWidth id='email' label='Email Address' name='email' autoComplete='off' autoFocus onChange={(e) => setEmail(e.target.value)} />
            <TextField margin='normal' required fullWidth name='password' label='Password' type='password' id='password' autoComplete='off' onChange={(e) => setPassword(e.target.value)} />
            <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>{' '}
              <Grid item>
                {!userData && (
                  <Link href='/register' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
