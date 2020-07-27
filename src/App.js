import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import Store from './components/Store'
import Grid from '@material-ui/core/Grid'
// import { makeStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import { db, auth } from './firebase'

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
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [modalStyle] = useState(getModalStyle);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [openSignIn, setOpenSignIn] = useState(false)

  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  // useEffect(() => {
  //   let unsubscribe;
  //   if (manifestId) {
  //     unsubscribe = db
  //       .collection("comments")
  //       .doc(manifestId)
  //       .onSnapshot((snapshot) => {
  //         setComments(snapshot.docs.map((doc) => doc.data()))
  //       })
  //   }

  //   return () => {
  //     unsubscribe();
  //   }
  // }, [manifestId])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in
        console.log(authUser)
        setUser(authUser);

      } else {
        // user has logged out ...
        setUser(null);
      }
    })

    return () => {
      // perform some clean up action
      unsubscribe();
    }
  }, [user, username])
  


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

  const signUp = (e) => {
    e.preventDefault()

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        })
      })
      .catch((error) => alert(error.message))
    
      setOpen(false);
  }

  const signIn = (e) => {
    e.preventDefault()

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
    
    setOpenSignIn(false)
  }

  // const postComment = (e) => {
  //   e.preventDefault()

  //   db.collection("comments")
  //     .doc(manifestId).collection
  // }

  return (
    <div className="App">
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          
          <form className="app__signup">
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
          
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          
          <form className="app__signup">
            
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
          
        </div>
      </Modal>

      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
        
      )}

      

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
        
        <Modal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      >
            
          <div className='modal-container'>
            <div className="modal-items">
              <img src={show.imageUrl} alt={show.title} />
              <p>{show.name}</p>
              <p>rarity: {show.rarity}</p>
              <p>{show.vBucks} vBucks</p>

              <form className="post__commentBox">
                <input
                  className="post__input"
                  type="text"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                className="post__button"
                disabled={!comment}
                type="submit"
                
                >
                  Post
                </button>
            </form>

            </div>
            
            
                

          </div>
              
        </Modal>
      </Grid>
    </div>
  );
}

export default App;
