// import { setAudioModeAsync } from 'expo-audio'; // or expo-audio
import "@/global.css";
import { useFonts } from "expo-font";
// import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
// import { Uniwind } from "uniwind";

// Register dark token overrides
// Uniwind.updateCSSVariables("dark", {
//   "--color-primary": M3Colors.dark.primary,
//   "--color-surface-tint": M3Colors.dark.surfaceTint,
//   "--color-on-primary": M3Colors.dark.onPrimary,
//   "--color-primary-container": M3Colors.dark.primaryContainer,
//   "--color-on-primary-container": M3Colors.dark.onPrimaryContainer,
//   "--color-secondary": M3Colors.dark.secondary,
//   "--color-on-secondary": M3Colors.dark.onSecondary,
//   "--color-secondary-container:": M3Colors.dark.secondaryContainer,
//   "--color-on-secondary-container:": M3Colors.dark.onSecondaryContainer,
//   "--color-tertiary": M3Colors.dark.tertiary,
//   "--color-on-tertiary:": M3Colors.dark.onTertiary,
//   "--color-tertiary-container:": M3Colors.dark.tertiaryContainer,
//   "--color-on-tertiary-container": M3Colors.dark.onTertiaryContainer,
//   "--color-error": M3Colors.dark.error,
//   "--color-on-error": M3Colors.dark.onError,
//   "--color-error-container:": M3Colors.dark.errorContainer,
//   "--color-on-error-container": M3Colors.dark.onErrorContainer,
//   "--color-background": M3Colors.dark.background,
//   "--color-on-background": M3Colors.dark.onBackground,
//   "--color-surface:": M3Colors.dark.surface,
//   "--color-on-surface": M3Colors.dark.onSurface,
//   "--color-surface-variant": M3Colors.dark.surfaceVariant,
//   "--color-on-surface-variant": M3Colors.dark.onSurfaceVariant,
//   "--color-outline": M3Colors.dark.outline,
//   "--color-outline-variant:": M3Colors.dark.outlineVariant,
//   "--color-inverse-surface": M3Colors.dark.inverseSurface,
//   "--color-inverse-on-surface": M3Colors.dark.inverseOnSurface,
//   "--color-inverse-primary": M3Colors.dark.inversePrimary,
//   "--color-surface-dim": M3Colors.dark.surfaceDim,
//   "--color-surface-bright": M3Colors.dark.surfaceBright,
//   "--color-surface-container-lowest": M3Colors.dark.surfaceContainerLowest,
//   "--color-surface-container-low": M3Colors.dark.surfaceContainerLow,
//   "--color-surface-container": M3Colors.dark.surfaceContainer,
//   "--color-surface-container-high:": M3Colors.dark.surfaceContainerHigh,
//   "--color-surface-container-highest:": M3Colors.dark.surfaceContainerHighest,
//   // ...rest of dark tokens
// });

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

try {
//   Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//       shouldShowAlert: true, // Shows the popup at the top of the screen
//       shouldPlaySound: true,
//       shouldSetBadge: false,
//       shouldShowBanner: true,
//       shouldShowList: true,
//     }),
//   });
} catch (error) {
  console.log("Notification setup bypassed in Expo Go:", error);
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/JetBrainsMonoNL-Regular.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

//   useEffect(() => {
//     try {
//       requestPermissions();
//     } catch (error) {
//       console.log("Notification setup bypassed in Expo Go:", error);
//     }
//   }, []);
//   const requestPermissions = async () => {
//     // const { status: existingStatus } =
//     //   await Notifications.getPermissionsAsync();
//     // let finalStatus = existingStatus;

//     // if (existingStatus !== "granted") {
//     //   const { status } = await Notifications.requestPermissionsAsync();
//     //   finalStatus = status;
//     // }

//     // if (finalStatus !== "granted") {
//     //   Alert.alert(
//     //     "Permissions Required",
//     //     "Please enable notifications in your device settings to get your habit reminders!"
//     //   );
//     // }
//   };

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <>
      <Stack
        screenOptions={{
          statusBarStyle: "light",
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
