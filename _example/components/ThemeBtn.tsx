import { Button, StyleSheet, View } from 'react-native';
import { useTheme } from '../provider/ThemeProvider'; // Import your custom hook

export default function ThemeBtn() {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Button 
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"} 
        onPress={toggleTheme} 
        color={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
