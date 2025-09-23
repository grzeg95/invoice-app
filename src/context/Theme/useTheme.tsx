import {useContext} from 'react';
import {ThemeContext} from './ThemeContext';

export function useTheme() {

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('useTheme must be used within the ThemeProvider');
  }

  return themeContext;
}
