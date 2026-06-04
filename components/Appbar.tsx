import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Appbar as AppbarView } from "react-native-paper";

const Appbar = ({
  right,
  title,
  hideBack = false
}: {
  title: string;
  right?: React.ReactNode;
  hideBack?: boolean
}) => {
  const navigation = useNavigation();
  return (
    <AppbarView.Header elevated={true}>
      {!hideBack && (
        <AppbarView.BackAction
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
        />
      )}
      <AppbarView.Content title={title} />
      {right}
      {/* <AppbarView.Action icon="calendar" onPress={() => {}} /> */}
      {/* <AppbarView.Action icon="magnify" onPress={() => {}} /> */}
    </AppbarView.Header>
  );
};

export default Appbar;

const styles = StyleSheet.create({});
