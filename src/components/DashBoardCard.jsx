import React from 'react';
import { Box, Container, Typography,Stack } from '@mui/material';
import Grid from "@mui/material/Grid2";
import Avatar from '@mui/material/Avatar';
import CustomizedMenus from './CardMenu';
import CardImageList from './CardImageList';
import FloatingActionButtons from './FloatButtons';
import Divider from '@mui/material/Divider';

function DashBoardCard(){

    return(
        <Container mb={2}>
            <Grid container spacing={1} mt={3} width={600}>
                <Grid item size={1} >
                    <Box display='flex' alignItems='center' justifyContent='center'>
                        <Stack>
                            <Avatar alt='"user avatar"' src='https://mui.com/static/images/cards/contemplative-reptile.jpg' />
                        </Stack>
                    </Box>
                </Grid>

                <Grid item size={11} >
                    <Box display='flex' direction='row' gap={1} alignItems='center'  >
                        <Box display='flex' direction='row' gap={1}>
                            <Typography variant='h6' component="h6" >
                                <Box sx={{fontWeight:'bold'}}>Bull Coming</Box>
                            </Typography>
                            <Typography  >
                                <Box sx={{fontWeight:'300'}} mt={0.9}>@onlyName</Box>
                            </Typography>
                            <Typography  >
                                <Box sx={{fontWeight:'300'}} mt={0.9}>～ 3 Hours</Box>
                            </Typography>
                        </Box>

                        {/* 其中 margin-left: auto 会消耗掉 flex 容器中所有剩余的空间，从而将元素推到右侧。 */}
                        
                        <Box marginLeft='auto'>
                            <CustomizedMenus />
                        </Box>
                        
                    </Box>
                    <Box my={1}>
                        <Typography variant='body' component="body" >
                        fsdfjslkdjflsjdflksjdlkfsjdlkfjslkdjflksdjfsdfjslkdjflsjdflksjdlkfsjdlkfjslkdjflksdj
                        fsdfjslkdjflsjdflksjdlkfsjdlkfjslkdjflksdjfsdfjslkdjflsjdflksjdlkfsjdlkfjslkdjflksdj
                        fsdfjslkdjflsjdflksjdlkfsjdlkfjslkdjflksdjfsdfjslkdjflsjdflksjdlkfsjdlkfjslkdjflksdj
                        </Typography>
                    </Box>
                    <CardImageList />
                    <FloatingActionButtons />

                </Grid>
            </Grid>
            <Divider />
        </Container>

    )
};


export default DashBoardCard;