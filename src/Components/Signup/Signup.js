import React from 'react';
import { useState , useContext} from 'react';
import { useHistory } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import { firebaseContext } from '../../store/firebaseContext';
import './Signup.css';

export default function Signup() {
  const history = useHistory()
  const [userName, setUsername] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [password, setpassword] = useState("")
  const {firebase} = useContext(firebaseContext)

  const handleSubmit = (e) =>{
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
      result.user.updateProfile({displayName:userName}).then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          userName:userName,
          phone:phone
        }).then(()=>{
          history.push("/login")
        })
        .catch((error) => {
          // Handle Firestore error
          console.log("Firestore error:");
          alert(error.message)
        });
      })
      .catch((error) => {
        // Handle updateProfile error
        console.log("updateProfile error:");
        alert(error.message)
      });
    })
    .catch((error) => {
      // Handle createUserWithEmailAndPassword error
      console.log("createUserWithEmailAndPassword error:");
      alert(error.message)
    });
  }

  return (
    <div> 
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input" 
            type="text"
            value={userName}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setphone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setpassword (e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>{
          history.push('/login')
        }}>Login</a>
      </div>
    </div>
  );
}
