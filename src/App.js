import logo from './logo.svg';
import './App.css';
import  firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './FirebaseConfig';
firebase.initializeApp(firebaseConfig);

function App() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const handeleSignInn = ()=>{
    firebase.auth().signInWithPopup(provider)
  .then(result => {
    const {displayName, photoURL, email}= result.user;
    console.log(displayName, photoURL, email);
    // Google Auth is done

  })
}

  return (
    <div className="App">
      <button onClick={handeleSignInn}>signinn</button>
      <h1> FireBasee</h1>
    </div>
  );
}

export default App;
