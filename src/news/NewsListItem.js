
import { toLocaleNewsString } from '../utils/date';
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {Typography} from "@mui/material";

function NewsListItem(props) {
  const news = props.news;
  return (
      <Card variant="outlined" sx={{m: 1.5}}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {toLocaleNewsString(new Date(news.createdAt))}
          </Typography>
          <Typography variant="h5" sx={{mb: 1}}>{news.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {news.content}
          </Typography>
        </CardContent>
      </Card>
  )
}

export default NewsListItem