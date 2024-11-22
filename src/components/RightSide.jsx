import React from "react";
import { Box, Container, Typography,Stack } from '@mui/material';
import  SearchBar from "./SearchBar";
import IntroDivider from "./RBDivder";

function RightsideBar(){


    
    return(
        <Container sx={{display:'flex',flexDirection:"column"}}>
            <Stack spacing={2}>

                <SearchBar sx={{mb:2}}/>

                
                <IntroDivider />
                <IntroDivider />
                <IntroDivider />
                <IntroDivider />
                <IntroDivider />
            </Stack>

        </Container>
    )
};

export default RightsideBar;