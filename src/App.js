import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import  firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './FirebaseConfig';
firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignedIn:false,
    name:'',
    email:'',
    photo:'',
  })

  const provider = new firebase.auth.GoogleAuthProvider();
  const handeleSignInn = ()=>{
    firebase.auth().signInWithPopup(provider)
  .then(result => {
    const {displayName, photoURL, email}= result.user;
    const signedInUser = {
      isSignedIn: true,
      name: displayName,
      email:email,
      photo: photoURL
    }
    setUser(signedInUser);
    console.log(displayName, photoURL, email);
    // Google Auth is done
  })
  .catch(Errorr=> {
    console.log(Errorr);
    console.log(Errorr.messagee);
  })
}

  return (
    <div className="App">
      <h1> FireBasee</h1>
      <button onClick={handeleSignInn}>signinn</button>
      {
        user.isSignedIn && <div>
        <p> Welcomee, {user.name}</p>
        <p> Your Email: {user.email}</p>
        <img src={user.photo} alt=""/> 
        </div>
      }
      
    </div>
  );
}

export default App;
