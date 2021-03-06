import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import  firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './FirebaseConfig';
firebase.initializeApp(firebaseConfig);

function App() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn:false,
    newUser : false,
    name:'',
    email:'',
    photo:'',
    password:'',
    error:''
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
   error:'',
   success: false
   }
   setUser (signedOutUser);
   

 })
 .catch (errr => {

 });
}

const handleBlur = (e) => {    
let isFieldValid = true;   
if (e.target.name === 'email'){
   isFieldValid = /\S+@\S+\.\S+/.test(e.target.value); 
}

if (e.target.name === 'password'){
  const isPasswordValid = e.target.value.length>6;
  const passwordHasNumber = /\d{1}/.test(e.target.value);
  isFieldValid = isPasswordValid && passwordHasNumber;

 } 
 if(isFieldValid){
   const newUserInfo = {...user};
   newUserInfo[e.target.name] = e.target.value;  
   setUser(newUserInfo);

 }
}
const handleSubmit = (e) => {
  //console.log(user.email, user.password)
  if(newUser && user.email && user.password) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  .then(res => {
    const newUserInfo = {...user};
    newUserInfo.error = '';
    newUserInfo.success = true;
    setUser(newUserInfo);
    updateUserName(user.name);
    // Signed in 
   // var user = userCredential.user;
    // ...
  })
  .catch(error => {
    const newUserInfo = {...user};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    setUser(newUserInfo);
  });

  }
  if(!newUser && user.email && user.password){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(res => {
    const newUserInfo = {...user};
    newUserInfo.error = '';
    newUserInfo.success = true;
    setUser(newUserInfo);
    console.log('sign in user info',res.user);
    })
    .catch(function (error) {
    const newUserInfo = {...user};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    setUser(newUserInfo);
    });  
  }
  e.preventDefault();
}
const updateUserName = name => { 
  const user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: name,
        }).then(function() {
          console.log('Update successful')
        }).catch(function(error) {
          console.log(error)
        });
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
    <input type="checkBox" onChange = {()=> setNewUser(!newUser)} name="newUser" id =""/>
    <label htmlFor="newUser">New Registration</label>
    <form onSubmit= {handleSubmit}>
      {newUser && 
    <input name="name" type="text" onBlur={handleBlur} placeholder="YOUR name"/> }
    <br/>
    <input type="text" name="email" onBlur={handleBlur} placeholder="Write your emailID" required/>
    <br/>
    <input type="password" name="password" onBlur = {handleBlur} placeholder="your pwd" required/>
    <br/>
    <input type="submit" value= {newUser ? 'Signn Upp':'Sign Inn'}/>
    </form>
      <p style={{color:'red'}}>{user.error }</p>

      {user.success && <p style={{color:'green'}}>User {newUser?'Created': 'Loggeg Indd'} Successfullyy</p>} 
    </div>
    
  );
}

export default App;
