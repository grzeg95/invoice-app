import {onAuthStateChanged, type User as FirebaseUser} from 'firebase/auth';
import {onSnapshot} from 'firebase/firestore';
import {type ReactNode, useEffect, useState} from 'react';
import {auth, firestore} from '../../firebase/firebase';
import {getUserRef, type User} from '../../models/firestore/user';
import {AuthContext} from './AuthContext';

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({children}: AuthProviderProps) => {

  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null | undefined>(undefined);
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [authStateReady, setAuthStateReady] = useState<boolean>(false);

  useEffect(() => {
    auth.authStateReady().then(() => setAuthStateReady(true))
  }, []);

  useEffect(() => {

    if (authStateReady) {
      return onAuthStateChanged(auth, {
        next: (nextUser) => {

          setFirebaseUser(nextUser);

          if (nextUser === null) {
            setUser(null);
          }
        },
        error: () => {},
        complete: () => {}
      });
    }
  }, [authStateReady]);

  useEffect(() => {

    if (firebaseUser) {

      const userRef = getUserRef(firestore, firebaseUser.uid);

      return onSnapshot(userRef, {
        next: (userDocSnap) => {

          const userData = userDocSnap.data();

          if (userData?.initialized) {
            setUser(userDocSnap.data());
          }
        },
        error: () => {
          auth.signOut().then(() => {
            setUser(null);
          });
        }
      });
    }
  }, [firebaseUser]);

  return (
    <AuthContext.Provider value={{firebaseUser, user}}>
      {children}
    </AuthContext.Provider>
  );
};
