import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig)
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: ""
  })
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result)
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser)
        console.log(displayName, email, photoURL)
      })
      .catch(err => {
        console.log(err);
        console.log(err.message)
      })
  }
  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(result => {
      const signOutUser = {
        isSignedIn: false,
        name: "",
        email: "",
        photo: ""
      }
      setUser(signOutUser)
      console.log(result)
    })
    .catch(err => {

    })
  }
  return (
      <div className="App">
        {
          user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button>
                          : <button onClick={handleSignIn}>Sign in</button>
        }
        {
          user.isSignedIn && <div>
            <p>Welcome, <strong>{user.name}</strong></p>
            <p>Your email address is: {user.email}</p>
            <img src={user.photo} alt="" />
          </div>
        }
      </div>
    );
  }

  export default App;
