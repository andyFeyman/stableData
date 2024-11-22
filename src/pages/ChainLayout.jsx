import "./ChainLayout.scss"
import NavScrollHeader from "../components/NavScrollHeader";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

function ChainLayout() {
  return (
    <Box sx={{display:"flex",flexDirection:"column",minHeight:"100vh"}}>
      <NavScrollHeader />
      <Box sx={{display:"flex",flexDirection:"column",flexGrow:1}}>
        <Outlet/>
      </Box>
      <Box sx={{display:"flex", flexDirection:"column",marginBottom:"10px",alignItems:"center"} }>
        <Footer/>
      </Box>
    </Box>

  );
}


export default ChainLayout;
