// import CircularProgress from "./CircularProgress";
import type { StreakType } from "@/types";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { ThemedIcon } from "../ui/ThemedIcon";
import CircularProgress from "./CircularProgress";

const StreakCards = ({ data }: { data: StreakType }) => {
  const router = useRouter();
  return (
    <View className="p-4">
      <Card mode="outlined" className="w-full min-h-42">
        <Card.Content className="flex-row gap-2 items-center">
          <CircularProgress
            value={Math.floor(
              (data.completedDates.length / data.totalCount) * 100
            )}
            size={100}
            strokeWidth={8}
          >
            <View className="flex-row gap-1">
              <Text variant="titleSmall">{data.completedDates.length}</Text>
              <Text>Days</Text>
            </View>
          </CircularProgress>

          <View>
            <Text variant="titleMedium">{data.title}</Text>
            <View className="my-2 flex-row gap-2 items-center">
              <ThemedIcon name="calendar" size={20} />
              <Text variant="titleSmall">
                {new Date(data.startDateMs).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  // year: "numeric",
                })}
              </Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <ThemedIcon name="calendar-clock" size={20} />
              <Text variant="titleSmall">{data.totalCount} Days</Text>
            </View>
          </View>
        </Card.Content>
        <Card.Actions style={{ justifyContent: "space-between", marginTop: 8 }}>
          <Button
            mode="outlined"
            onPress={() => {
              router.push(`/streaks/manage/${data.id}`);
            }}
          >
            Manage
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              router.push(`/streaks/view/${data.id}`);
            }}
          >
            View
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default StreakCards;
