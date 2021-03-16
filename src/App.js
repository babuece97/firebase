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
  const handleSignInn = ()=>{
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


const handleSignOut = () => {
 firebase.auth().signOut()
 .then (res => {
   const signedOutUser = {
   isSignedIn: false,
   name :'',
   phto:'',
   email:'',
   }
   setUser (signedOutUser);
   

 })
 .catch (errr => {

 });
}

const handleBlur = (e) => {
console.log(e.target.name, e.target.value);
if (e.target.name === 'Email'){
  const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
  console.log(isEmailValid)

}
if (e.target.name === 'password'){
  const isPasswordValid = e.target.value.length>6;
  const passwordHasNumber = /\d{1}/.test(e.target.value);
  console.log(isPasswordValid && passwordHasNumber);

 } 
}
const handleSubmit = () => {

}

  return (
    <div className="App">
      <h1> FireBasee</h1>
      {
        user.isSignedIn ?<button onClick={handleSignOut}>signOutt</button> :
        <button onClick={handleSignInn}>signinn</button>
      }
      {
        user.isSignedIn && <div>
        <p> Welcomee, {user.name}</p>
        <p> Your Email: {user.email}</p>
        <img src={user.photo} alt=""/> 
        </div>
      }

    <h1>Our Authentication System</h1>
    <form onSubmit= {handleSubmit}> 
    <input type="text" name="Email" onBlur={handleBlur} placeholder="Write your emailID" required/>
    <br/>
    <input type="password" name="password" onBlur = {handleBlur} placeholder="your pwd" required/>
    <br/>
    <input type="submit" value="Submitt"/>
    </form>
      
    </div>
    
  );
}

export default App;
