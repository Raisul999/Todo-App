import React, { lazy, Suspense } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import Errror from './components/Errror';
import { Routes, Route } from "react-router-dom"
import { RequireAuth } from 'react-auth-kit'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, CircularProgress } from '@mui/material';

const Statistics = lazy(() => import('./components/Statistics'))

const App = () => {

  // const darkTheme = createTheme({
  //   palette: {
  //     mode: 'light',
  //     action: {
  //       hover: '#fff'
  //     }
  //   },
  // });

  let theme = createTheme()

  theme = responsiveFontSizes(theme)

  return (

    <ThemeProvider theme={theme} >
      <Box sx={{ bgcolor: '#fafafa' }}
      >
        <CssBaseline />
        <Header />
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'10rem' }}>
          <CircularProgress />
        </div>}>
          <Routes>
            <Route path='/' element={<RequireAuth loginPath='/login'>
              <Home />
            </RequireAuth>} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/stats' element={<RequireAuth loginPath='/login'>
              <Statistics />
            </RequireAuth>} />
            <Route path='*' element={<Errror />} />
          </Routes>
        </Suspense>
      </Box>
    </ThemeProvider>



  );
}

export default App;
