import { Grid2, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import { styled } from "@mui/material/styles";
import Divider from '@mui/material/Divider';



const Item = styled(Paper)(({theme})=>({
    backgroundColor:"#fff",
    ...theme.typography.body2,
    // padding:theme.spacing(1),
    height:120,
    textAlign: 'center',
    marginTop: "10px",
    marginBottom: "10px",
}));

function BoxPratice(){

    return(
        <Container sx={{my:2,display:"flex",flexDirection:"column"}}>
            <Box sx={{width:"300px", my:3,mx:2,}}>
                <Typography>
                    this is Typography
                </Typography>
                <Paper sx={{bgcolor:"#fff"}} elevation={6}>
                    what is paper?
                </Paper>
                <span>this is span</span>
            </Box>
            <Grid container spacing={12} my={4} >
                <Grid size={3}>
                    <Item>this is item</Item>
                </Grid>
                <Grid size={3}>
                    <Item>this is item</Item>
                </Grid>
                <Grid size={3}>
                    <Item>this is item</Item>
                </Grid>
                <Grid size={3}>
                    <Item>this is item</Item>
                </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={1} my={4} display="flex" justifyContent="space-between">
                <Grid size="auto">
                    <Item>this is auto item</Item>
                </Grid>
                <Grid size={8} >
                    <Item>this is auto item</Item>
                </Grid>
                <Grid size="auto">
                    <Item >this is auto item</Item>
                </Grid>
            </Grid>

            <Divider />

            <Grid container display={"flex"} direction={"row"} spacing={2} my={2} >
                <Grid size={2} >
                    <Item>this is item</Item>
                    <Item>this is item</Item>
                    <Typography>
                        this is Typography
                        this is Typography
                        this is Typography
                        this is Typography
                    </Typography>
                </Grid>
                <Grid size={10} >
                    <Item>this is item</Item>
                    
                    <Item >this is item</Item>
                    <Typography>
                        this is Typography
                        this is Typography
                        this is Typography
                        this is Typography
                        this is Typography
                    </Typography>
                </Grid>
            </Grid>
         
            
        </Container>
    );
};

export default BoxPratice;