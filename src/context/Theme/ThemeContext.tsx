import {createContext} from 'react';

export const ThemeContext = createContext<{
  isDarkMode: boolean | undefined;
  setDarkMode: (isDarkMode: boolean) => void;
}>({
  isDarkMode: undefined,
  setDarkMode: () => {}
});
