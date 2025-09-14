import {type User as FirebaseUser} from 'firebase/auth';
import {createContext} from 'react';
import type { User } from '../../models/firestore/user';

export const AuthContext = createContext<{
  user: User | null | undefined;
  firebaseUser: FirebaseUser | null | undefined;
}>({
  user: undefined,
  firebaseUser: undefined
});
