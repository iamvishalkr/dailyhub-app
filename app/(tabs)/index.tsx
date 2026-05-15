import EmptyState from "@/components/EmptyState";
import StreakCards from "@/components/StreakComponents/StreakCards";
import { Button } from "@/components/ui/Button";
import { useStreakStore } from "@/zustand/streak.store";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Appbar from "@/components/Appbar";
import { M3View } from "@/components/ui/M3View";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Uniwind, useCSSVariable, useUniwind } from "uniwind";
import { useThemeStore } from "@/zustand/theme";

const StreakScreen = () => {
  const { streaksList } = useStreakStore();
  const { theme, toggleTheme } = useThemeStore();
  const router = useRouter();
  //   const { theme } = useUniwind();
  //   const onBackground = useCSSVariable('--color-on-background')
  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"DailyHub"}
        right={
          <View className="flex-row items-center gap-2">
            <Button
              title="Add"
              mode="outline"
              style={{ borderColor: "#fff" }}
              textStyle={{ color: "#fff" }}
              leadingIcon={
                <MaterialCommunityIcons name="plus" color={"#fff"} size={20} />
              }
              onPress={() => {
                router.push("/streaks/add");
              }}
            />
            <Pressable onPress={toggleTheme}>
              {theme === "dark" ? (
                <MaterialIcons name="light-mode" color={"#fff"} size={24} />
              ) : (
                <MaterialIcons
                  name="dark-mode"
                  color={"#fff"}
                  size={24}
                />
              )}
            </Pressable>
          </View>
        }
      />

      <M3View style={{ flex: 1 }}>
        {streaksList.length <= 0 ? (
          <View className="p-4">
            <EmptyState
              Logo={"fire"}
              title="No Streak tracked yet"
              subtitle="Start Your First Streak Now"
              btnText="Create Streaks"
              link="streaks/add"
            />
          </View>
        ) : (
          <SafeAreaView style={{ flex: 1, height: "100%" }} edges={["bottom"]}>
            <FlatList
              data={streaksList}
              renderItem={({ item }) => <StreakCards data={item} />}
            />
          </SafeAreaView>
          // <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pt-4 pb-4">
          //   {streaksList.map((streak) => (
          //     <StreakCards key={streak.id} data={streak} />
          //   ))}
          // </div>
        )}
      </M3View>
    </View>
  );
};

export default StreakScreen;

const styles = StyleSheet.create({});

// function RouteComponent() {
//   return (
//     <main>
//       <div className="flex items-center justify-between mb-2">
//         <TopTitle title="Streaks" hasBack={true} />
//         <Link to={"/streaks/add"}>
//           <Button title="Create New"></Button>
//         </Link>
//       </div>

//       {streaksList.length <= 0 ? (
//         <EmptyState
//           Logo={<AppLogo />}
//           title="No Streak tracked yet"
//           subtitle="Start Your First Streak Now"
//           btnText="Create Streak"
//           link="/streaks/add"
//         />
//       ) : (
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pt-4 pb-4">
//           {streaksList.map((streak) => (
//             <StreakCards key={streak.id} data={streak} />
//           ))}
//         </div>
//       )}
//     </main>
//   );
// }
