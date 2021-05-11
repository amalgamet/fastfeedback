import Router from 'next/dist/next-server/lib/router/router';
import { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';
import { createUser } from './db';

const AuthContext = createContext();

const formatUser = (user) => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  provider: user.providerData[0].providerId,
  photoUrl: user.photoURL,
});

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);

      createUser(user.uid, user);
      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  const signinWithGithub = async () => {
    const res = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider());
    handleUser(res.user);
  };

  const signinWithGoogle = async () => {
    const res = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider());
    handleUser(res.user);
    if (redirect) {
      Router.push(redirect);
    }
  };

  const signout = () =>
    firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);
    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signinWithGoogle,
    signout,
  };
}

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
