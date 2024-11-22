import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import {Container} from "@mui/material";


function Layout() {
  return (
    <Box sx={{display:"flex",flexDirection:"column",minHeight:"100vh"}}>
      <Header />
      <Container sx={{display:"flex",flexDirection:"column",flexGrow:1}}>
        <Outlet/>
      </Container>
      <Box sx={{display:"flex", flexDirection:"column",marginBottom:"10px",alignItems:"center"} }>
        <Footer/>
      </Box>
    </Box>

  );
}


export default Layout;


//<Outlet /> 本质上是一个占位符，告诉React Router在哪里插入匹配的子路由内容。
//flexGrow:1这允许内容区域增长并占据除了 header 和 footer 之外的所有可用空间。
//给最外层的 Box 组件添加了 minHeight: "100vh"，确保整个布局至少占据整个视口高度。
//Container 的 flexDirection: "column" 只影响其直接子元素的排列方式。在这种情况下，它的直接子元素是 <Outlet />。