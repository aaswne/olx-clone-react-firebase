import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import {
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useHistory } from 'react-router-dom';
import { auth, db } from '../../firebase/config';
import { AuthContext } from '../../store/FirebaseContext';

export default function Signup() {
  const history = useHistory();
  const { setUser } = useContext(AuthContext);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(result.user, {
        displayName: userName
      });

      await setDoc(doc(db, 'users', result.user.uid), {
        id: result.user.uid,
        userName,
        number,
        email
      });

      await result.user.reload();

      setUser(auth.currentUser);

      console.log("signup user:", auth.currentUser);

      history.push('/');
    } catch (error) {
      console.error('Signup error:', error);
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />

        <form onSubmit={submit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            value={userName}
            className="input"
            type="text"
            id="fname"
            name="name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />

          <label htmlFor="email">Email</label>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            id="email"
            name="email"
          />
          <br />

          <label htmlFor="phone">Phone</label>
          <br />
          <input
            value={number}
            className="input"
            type="tel"
            id="phone"
            name="phone"
            onChange={(e) => setNumber(e.target.value)}
          />
          <br />

          <label htmlFor="password">Password</label>
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            id="password"
            name="password"
          />
          <br />
          <br />

          <button type="submit">Signup</button>
        </form>

        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}