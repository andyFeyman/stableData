import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export default function FloatingActionButtons() {
  return (
    <Box sx={{ '& > :not(style)': { my:1 },display:'flex',justifyContent:'space-between' }} >
      <Fab size="small" color="primary" aria-label="add">
        <CommentIcon />
      </Fab>
      <Fab size="small" color="primary" aria-label="edit">
        <ShareIcon />
      </Fab>
      <Fab  size="small" color="primary" aria-label="like">
        <FavoriteIcon />
      </Fab>
      <Fab size="small" color="primary" variant="extended">
        <RemoveRedEyeIcon sx={{ mr: 1 }} />
      </Fab>
    </Box>
  );
}
