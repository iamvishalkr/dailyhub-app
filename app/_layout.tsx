// import { setAudioModeAsync } from 'expo-audio'; // or expo-audio
import { paperConfig } from "@/constants/paperConfig";
import "@/global.css";
import { useThemeStore } from "@/zustand/theme";
import { useFonts } from "expo-font";
// import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
    MD3LightTheme as DefaultTheme,
    MD3DarkTheme,
    PaperProvider,
    Surface,
} from "react-native-paper";
import "react-native-reanimated";

// import type { MD3TypescaleKey } from "react-native-paper/lib/typescript/types";
// 1. Get the baseline MD3 light theme fonts
// const baseFonts = DefaultTheme.fonts;
// 2. Map 'YourCustomFont-Regular' onto every variant dynamically
// const variantKeys = Object.keys(baseFonts) as MD3TypescaleKey[];

// 2. Type the accumulator precisely using Partial<Record<...>>
// const customVariants = variantKeys.reduce<
//   Partial<Record<MD3TypescaleKey, any>>
// >((acc, key) => {
//   acc[key] = {
//     ...baseFonts[key],
//     fontFamily: "SpaceMono",
//   };
//   return acc;
// }, {});

// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: "teal",
//   },
//   fonts: configureFonts({ config: customVariants, isV3: true }),
// };

const themeLight = {
  ...DefaultTheme,
  fonts: paperConfig.fontsConfig,
  colors: paperConfig.colors.light,
};
const themeDark = {
  ...MD3DarkTheme,
  fonts: paperConfig.fontsConfig,
  colors: paperConfig.colors.dark,
};

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
  const { theme: themeStore } = useThemeStore();
  return (
    <PaperProvider theme={themeStore === "dark" ? themeDark : themeLight}>
      <Surface className="flex-1">
        <Stack
          screenOptions={{
            statusBarStyle: "dark",
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </Surface>
    </PaperProvider>
  );
}
