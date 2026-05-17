import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Appbar as AppbarView } from "react-native-paper";

const Appbar = ({
  right,
  title,
  hasBack = true,
}: {
  title: string;
  right?: React.ReactNode;
  hasBack?: boolean;
}) => {
  const navigation = useNavigation();
  return (
    <AppbarView.Header elevated={true}>
      {navigation.canGoBack() && (
        <AppbarView.BackAction
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
        />
      )}
      <AppbarView.Content  title={title} />
      {right}
      {/* <AppbarView.Action icon="calendar" onPress={() => {}} /> */}
      {/* <AppbarView.Action icon="magnify" onPress={() => {}} /> */}
    </AppbarView.Header>
  );
};

export default Appbar;

const styles = StyleSheet.create({});
// return (
//     <SafeAreaView edges={["top"]} style={{ backgroundColor: "teal" }}>
//       <View
//         style={{
//           height: 30 + Constants.statusBarHeight,
//           paddingHorizontal: 16,
//           alignItems: "center",
//           flexDirection: "row",
//           columnGap: 8,
//         }}
//       >
//         {(navigation.canGoBack()) && <MaterialCommunityIcons
//           color={"#fff"}
//           size={24}
//           name="arrow-left"
//           onPress={() => {
//             if (navigation.canGoBack()) {
//               navigation.goBack();
//             }
//           }}
//         />}
//         <Text style={{ color: "#fff", fontSize: 24, fontFamily: "SpaceMono", flex:1 }}>
//           {title}
//         </Text>

//         <View>
//         {right && right}
//         </View>
//       </View>
//     </SafeAreaView>
//   );
