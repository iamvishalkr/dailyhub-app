// import CircularProgress from "./CircularProgress";
import type { StreakType } from "@/types";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { ThemedIcon } from "../ui/ThemedIcon";

const StreakCards = ({ data }: { data: StreakType }) => {
  const router = useRouter();
  return (
    <View className="p-4">
      <Card mode="outlined" className="w-full min-h-42">
        {/* <CircularProgress
        value={Math.floor((data.completedDates.length / data.totalCount) * 100)}
        size={100}
        strokeWidth={8}
      >
        <div className="text-xl font-bold ">
          <p className="text-primary">{data.completedDates.length}</p>
          <p>Days</p>
        </div>
      </CircularProgress> */}
        <Card.Content>
          <Text variant="titleMedium">{data.title}</Text>

          <View>
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
            <View
              style={{ flexDirection: "row" }}
              className="flex gap-2 items-center"
            >
              <ThemedIcon
                name="calendar-clock"
                size={20}
              />
              <Text variant="titleSmall">{data.totalCount} Days</Text>
            </View>
          </View>
        </Card.Content>
        <Card.Actions style={{justifyContent:"space-between", marginTop:8}}>
          <Button
          mode="contained"
            onPress={() => {
              router.push(`/streaks/view/${data.id}`);
            }}
          >View</Button>
          <Button
            mode="outlined"
            onPress={() => {
              router.push(`/streaks/manage/${data.id}`);
            }}
          >Manage</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default StreakCards;
