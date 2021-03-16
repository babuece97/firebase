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
    password:''
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
  debugger;
let isFormValid = true;   
if (e.target.name === 'email'){
   isFormValid = /\S+@\S+\.\S+/.test(e.target.value); 
}

if (e.target.name === 'password'){
  const isPasswordValid = e.target.value.length>6;
  const passwordHasNumber = /\d{1}/.test(e.target.value);
  isFormValid = isPasswordValid && passwordHasNumber;

 } 
 if(isFormValid){
   const newUserInfo = {...user};
   newUserInfo[e.target.name] = e.target.value;  
   setUser(newUserInfo);

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
        
        <p> Your Email: {user.email}</p>
        <p> Passsword: {user.password}</p>
        <img src={user.photo} alt=""/> 
        </div>
      }

    <h1>Our Authentication System</h1>
    <p>User Namee:{user.name}</p>
    <p>Emaill:{user.email}</p>
    <p>Passwprdd:{user.password}</p>
    <form onSubmit= {handleSubmit}> 
    
  
    <input name="name" type="text" onBlur={handleBlur} placeholder="YOUR name"/> 
    <br/>
    <input type="text" name="email" onBlur={handleBlur} placeholder="Write your emailID" required/>
    <br/>
    <input type="password" name="password" onBlur = {handleBlur} placeholder="your pwd" required/>
    <br/>
    <input type="submit" value="Submitt"/>
    </form>
      
    </div>
    
  );
}

export default App;
