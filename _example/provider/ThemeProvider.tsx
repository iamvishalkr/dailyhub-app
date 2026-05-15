import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext<any>(null);

export const ThemeProviderContext = ({ children }:{ children:React.ReactNode }) => {
  const systemColorScheme = useColorScheme(); // Get system default
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// Define your color palettes
const lightColors = { background: '#FFFFFF', text: '#000000', primary: '#007AFF' };
const darkColors = { background: '#121212', text: '#FFFFFF', primary: '#0A84FF' };
