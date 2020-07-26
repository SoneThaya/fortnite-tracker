import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import Store from './components/Store'
import Grid from '@material-ui/core/Grid'
// import { makeStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

// import Modal from 'react-modal';

// Modal.setAppElement('#root')

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

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
  const classes = useStyles();

  const [itemShop, setItemShop] = useState([])
  const [show, setShow] = useState({})
  //const [modalIsOpen, setModalIsOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [modalStyle] = useState(getModalStyle);


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

  // const classes = useStyles();

  return (
    <div className="App">
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>I am a modal</h2>
          
          
        </div>
      </Modal>

      <h1>Fortnite Fortnite</h1>

      <Grid container spacing={3}>
        
        {itemShop.map(items => (
          <Grid item sx={12} sm={6} md={4} key={items.manifestId} onClick={() => {
            //setModalIsOpen(true);
            setOpen(true);
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
        
        <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
            
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
