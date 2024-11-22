import React from 'react';
import { Box, Container, Typography } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py:1}} >
      <Container maxWidth="lg">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          © Focus on some simple data of chains.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          {/* <Link color="inherit" href="https://yourwebsite.com/">
            Your Website
          </Link>{' '} */}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;