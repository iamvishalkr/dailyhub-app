// import CircularProgress from "./CircularProgress";
import type { StreakType } from "@/types";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Button } from "../ui/Button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/Card";
import { M3Text } from "../ui/M3Text";
import { ThemedIcon } from "../ui/ThemedIcon";

const StreakCards = ({ data }: { data: StreakType }) => {
  const router = useRouter();
  return (
    <View className="p-4">
      <Card className="w-full overflow-hidden bg-surface-container min-h-42 ps-2">
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
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>

          <View>
            <View className="my-2 flex-row gap-2 items-center">
              <ThemedIcon name="calendar" size={20} />
              <M3Text>
                {new Date(data.startDateMs).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  // year: "numeric",
                })}
              </M3Text>
            </View>
            <View
              style={{ flexDirection: "row" }}
              className="flex gap-2 items-center"
            >
              <ThemedIcon
                name="calendar-clock"
                size={20}
              />
              <M3Text>{data.totalCount} Days</M3Text>
            </View>
          </View>
        </CardHeader>
        <CardFooter style={{justifyContent:"space-between"}}>
          <Button
            title="View"
            onPress={() => {
              router.push(`/streaks/view/${data.id}`);
            }}
          ></Button>
          <Button
            mode="outline"
            title="Manage"
            onPress={() => {
              router.push(`/streaks/manage/${data.id}`);
            }}
          ></Button>
        </CardFooter>
      </Card>
    </View>
  );
};

export default StreakCards;
