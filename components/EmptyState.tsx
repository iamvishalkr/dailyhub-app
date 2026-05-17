import { useRouter } from "expo-router";
import type React from "react";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { ThemedIcon } from "./ui/ThemedIcon";

const EmptyState = ({
  title,
  subtitle,
  btnText,
  Logo,
  onPress,
}: {
  title: string;
  subtitle: string;
  btnText: string;
  Logo: string;
  onPress?: () => void;
}) => {
  const router = useRouter();
  return (
    <Card mode="outlined">
      <Card.Content
        style={{
          paddingVertical: 40,
          paddingHorizontal: 16,
          alignItems: "center",
          rowGap: 8,
        }}
      >
        <ThemedIcon
          name={Logo as unknown as any}
          size={28}
          style={{ textAlign: "center" }}
        />
        <Text variant="titleMedium"  style={{textAlign:"center"}}>
          {title}
        </Text>
        <Text variant="labelMedium" style={{textAlign:"center"}}>
          {subtitle}
        </Text>
        <View className="mt-4">
          <Button mode="outlined" onPress={onPress} icon={"plus"}>
            {btnText}
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

export default EmptyState;
