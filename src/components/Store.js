import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    backgroundColor: green,
  },
  media: {
    height: 340,
    padding: 20,
    backgroundColor: green,
  },
});

const Store = ({ imageUrl, name, rarity, vBucks, manifestId, storeCategory }) => {
  

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageUrl}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            rarity: {rarity}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {vBucks} vBucks
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Store
