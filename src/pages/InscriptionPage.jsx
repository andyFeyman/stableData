import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';

function BoxPratice1() {
  return (
    <CssVarsProvider>
      <Sheet 
        variant="outlined"
        sx={{
          display:"flex",
          flexDirection:"column",
          width:"100%",
          mt:4,
          justifyContent:"center"
        }}
      >
        Welcome!
      </Sheet>
    </CssVarsProvider>
  );
}


export default BoxPratice1;