import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import Store from './components/Store'
import Grid from '@material-ui/core/Grid'
// import { makeStyles } from '@material-ui/core/styles';

import Modal from 'react-modal';

Modal.setAppElement('#root')

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
// }));


function App() {
  const [itemShop, setItemShop] = useState([])
  const [show, setShow] = useState({})
  const [modalIsOpen, setModalIsOpen] = useState(false)


  useEffect(() => {
    axios.get('https://cors-anywhere.herokuapp.com/https://api.fortnitetracker.com/v1/store', {
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

  // const classes = useStyles();

  return (
    <div className="App">
      <h1>Fortnite Fortnite</h1>

      <Grid container spacing={3}>
        
        {itemShop.map(items => (
          <Grid item sx={12} sm={6} md={4} key={items.manifestId} onClick={() => {
            setModalIsOpen(true);
            setShow(items)
          }}>
        <Store
          imageUrl={items.imageUrl}
          key={items.manifestId}
          name={items.name}
          rarity={items.rarity}
          vBucks={items.vBucks}
          storeCategory={items.storeCategory}
            />
           
            </Grid>
        ))}
        
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
            
          <div className='modal-container'>
            <img src={show.imageUrl} alt={show.title} />
            <p>{show.name}</p>
            <p>rarity: {show.rarity}</p>
            <p>{show.vBucks} vBucks</p>
            
            
          </div>
              
        </Modal>
      </Grid>
    </div>
  );
}

export default App;
