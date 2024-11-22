import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container  from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { NAVIGATION } from '../data/navData'
import DashBoardCard from '../components/DashBoardCard';
import RightsideBar from '../components/RightSide';
import DBTabs from '../components/DBTabs';


const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  //const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      //window={demoWindow}
    >
    <DashboardLayout>
      <Box sx={{display:"flex", flexDirection:"row",justifyContent:"space-between",height:"100vh"}}>
        {/* <DemoPageContent pathname={router.pathname} /> */}
        <Container className='dbleft' sx={{width:"60%",display:'flex',flexDirection:"column",ml:-2,height:"100%",overflowY:"auto"}}>
            <DBTabs />
        </Container>
        <Container className='dbright' sx={{width:"40%",display:'flex',py:2,mx:1,height:"100%",overflowY:"auto"}}>  
            <RightsideBar />
        </Container>
      </Box>
    </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

export default DashboardLayoutBasic;
