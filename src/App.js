import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import Store from './components/Store'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function App() {
  const [itemShop, setItemShop] = useState([])

  useEffect(() => {
    axios.get('https://cors-anywhere.herokuapp.com/https://fortnite-server-api.herokuapp.com/api/store', {
      headers: {
        'TRN-Api-Key': process.env.REACT_APP_API_KEY
        
      }
    })
      .then(res => {
        console.log(res.data)
        setItemShop(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const classes = useStyles();

  return (
    <div className="App">
      <h1>Fortnite Fortnite</h1>

      <Grid container spacing={3}>
        
        {itemShop.map(items => (
          <Grid item sx={12} sm={6} md={4} key={items.manifestId}>
        <Store
          imageUrl={items.imageUrl}
          key={items.manifestId}
          name={items.name}
          rarity={items.rarity}
          vBucks={items.vBucks}
          storeCategory={items.storeCategory}
            />
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
            </Grid>
      ))}
      </Grid>
    </div>
  );
}

export default App;
