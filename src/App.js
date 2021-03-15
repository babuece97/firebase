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

const handleChange = (event) => {
console.log(event.target.name, event.target.value);
}
const handleSubmit = () => {

}

  return (
    <div className="App">
      <h1> FireBasee</h1>
      {
        user.isSignedIn ?<button onClick={handleSignOut}>signOutt</button> :
        <button onClick={handeleSignInn}>signinn</button>
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
    <input type="text" name="Email" onChange={handleChange} placeholder="Write your emailID" required/>
    <br/>
    <input type="password" name="password" onChange = {handleChange} placeholder="your pwd" required/>
    <br/>
    <input type="submit" value="Submitt"/>
    </form>
      
    </div>
    
  );
}

export default App;
