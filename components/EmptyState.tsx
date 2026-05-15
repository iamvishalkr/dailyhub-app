import { useRouter } from "expo-router";
import type React from "react";
import { View } from "react-native";
import { Button } from "./ui/Button";
import { M3Text } from "./ui/M3Text";
import { M3View } from "./ui/M3View";
import { ThemedIcon } from "./ui/ThemedIcon";

const EmptyState = ({
  title,
  subtitle,
  btnText,
  link,
  Logo,
  onClick,
}: {
  title: string;
  subtitle: string;
  btnText: string;
  link: string;
  Logo: string;
  onClick?: () => void;
}) => {
  const router = useRouter();
  return (
    <M3View
      className={`bg-muted/30 rounded-lg border border-dashed border-border border-primary`}
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
      <M3Text className={`text-lg text-center font-medium text-on-surface`}>
        {title}
      </M3Text>
      <M3Text className={`text-sm text-center text-on-surface mt-1 mb-6`}>
        {subtitle}
      </M3Text>
      <View>
        <Button
          mode="outline"
          onPress={
            onClick
              ? onClick
              : () => {
                  router.push(`/${link}`);
                }
          }
          leadingIcon={
            <ThemedIcon
              name="plus"
              size={28}
              style={{ textAlign: "center" }}
            />
          }
          title={btnText}
        />
      </View>
    </M3View>
  );
};

export default EmptyState;
