import react from 'react';
import DashBoardCard from "../components/DashBoardCard";
import { Container } from '@mui/material';


const FlowPage = function(){
    return(
        <Container>
            <DashBoardCard />
            <DashBoardCard />
        </Container>
    )
}


export default FlowPage;