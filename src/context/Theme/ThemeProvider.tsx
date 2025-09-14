import {updateDoc} from 'firebase/firestore';
import {type ReactNode, useEffect, useRef} from 'react';
import {firestore} from '../../firebase/firebase';
import {useLocalStorage} from '../../hooks/useLocalStorage';
import {getUserRef} from '../../models/firestore/user';
import {useAuth} from '../Auth/useAuth';
import {ThemeContext} from './ThemeContext';

type AuthProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({children}: AuthProviderProps) => {

  const {user} = useAuth();
  const [savedIsDarkMode, setSavedDarkMode] = useLocalStorage<boolean>('isDarkMode', window.matchMedia('(prefers-color-scheme: dark)').matches);
  const htmlRef = useRef(document.documentElement);

  useEffect(() => {

    let isDarkMode = savedIsDarkMode;

    if (user?.isDarkMode !== undefined) {
      isDarkMode = user.isDarkMode;
    }

    if (savedIsDarkMode !== isDarkMode) {
      setSavedDarkMode(isDarkMode);
    }

    if (isDarkMode) {
      htmlRef.current.setAttribute('data-theme', 'dark');
    } else {
      htmlRef.current.removeAttribute('data-theme');
    }
  }, [user?.isDarkMode, savedIsDarkMode, setSavedDarkMode]);

  function setDarkMode(isDarkMode: boolean) {
    const userRef = getUserRef(firestore, user!.uid);
    updateDoc(userRef, {isDarkMode});
  }

  return (
    <ThemeContext.Provider value={{isDarkMode: savedIsDarkMode, setDarkMode}}>
      {children}
    </ThemeContext.Provider>
  );
};
