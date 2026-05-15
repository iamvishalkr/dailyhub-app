import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Constants from "expo-constants";
import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Appbar = ({right, title, hasBack=true}:{title:string,right?:React.ReactNode, hasBack?:boolean}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: "teal" }}>
      <View
        style={{
          height: 30 + Constants.statusBarHeight,
          paddingHorizontal: 16,
          alignItems: "center",
          flexDirection: "row",
          columnGap: 8,
        }}
      >
        {(navigation.canGoBack()) && <MaterialCommunityIcons
          color={"#fff"}
          size={24}
          name="arrow-left"
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
        />}
        <Text style={{ color: "#fff", fontSize: 24, fontFamily: "SpaceMono", flex:1 }}>
          {title}
        </Text>

        <View>
        {right && right}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Appbar;

const styles = StyleSheet.create({});
