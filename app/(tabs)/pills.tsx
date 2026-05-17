import Appbar from "@/components/Appbar";
import EmptyState from "@/components/EmptyState";
import { PillsType } from "@/types";
import { usePillStore } from "@/zustand/pills.store";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
    Button,
    Card,
    IconButton,
    Surface,
    Text,
    useTheme,
} from "react-native-paper";

const PillsScreen = () => {
  const { pillsList, deletePill, updatePill } = usePillStore();
  //   const [isInventoryDiaOpen, setIsInventoryDiaOpen] = useState(false);
  const [selectedPill, setSelectedPill] = useState({} as PillsType);
  const router = useRouter();

  const calcTakeDoses = useCallback((pill: PillsType) => {
    const totalTakenDose = pill.logs.reduce((sum, item) => sum + item.dose, 0);
    return totalTakenDose;
  }, []);
  const theme = useTheme();
  return (
    <Surface style={{ flex: 1 }}>
      <Appbar
        title="Pills"
        right={
          <Button
            className="me-2"
            mode="outlined"
            icon={"plus"}
            onPress={() => {
              router.push("/pills/add");
            }}
          >
            Add
          </Button>
        }
      />
      <View style={{ flex: 1 }} className="px-2 pt-2">
        {pillsList.length === 0 ? (
          <View className="p-2">
            <EmptyState
              Logo={"pill"}
              title="No medications tracked yet."
              subtitle="Add your first pill or medication to start tracking."
              btnText="Track Meds"
              onPress={()=>{
                router.push("/pills/add")
              }}
            />
          </View>
        ) : (
          <View className="">
            <FlatList
              data={pillsList}
              renderItem={({ item: pill }) => (
                <View className="p-2">
                  <Card mode="outlined">
                    <Card.Content>
                      <View className="flex flex-col items-start gap-2">
                        <View className="w-full flex-row justify-between items-center group/title">
                          <Text
                            style={{ fontSize: 20, fontFamily: "SpaceMono" }}
                          >
                            {pill.name}
                          </Text>
                          <View className="flex-row items-center gap-2">
                            <Text
                              className="capitalize"
                              style={{ fontFamily: "SpaceMono" }}
                            >
                              {pill.frequency.type}
                            </Text>
                            <IconButton
                              onPress={() => {
                                deletePill(pill.id);
                                //   if (confirm("Are you sure to delete?")) {
                                //   }
                              }}
                              icon={"delete"}
                            ></IconButton>
                          </View>
                        </View>
                        <Text style={{ fontFamily: "SpaceMono" }}>
                          Taken as ({pill.unit})
                        </Text>
                        <View className="flex-row justify-between w-full items-center">
                          <View className="flex-row items-center justify-center gap-4 mt-1">
                            {pill.frequency.shifts.map((m, i) => (
                              <Text
                                style={{
                                  borderWidth: 1,
                                  borderColor: theme.colors.onBackground,
                                  fontFamily: "SpaceMono",
                                  paddingHorizontal: 8,
                                  borderRadius: 20,
                                }}
                                key={i}
                              >
                                {m.time}
                              </Text>
                            ))}
                          </View>
                          <View className="">
                            <Button
                              mode="outlined"
                              onPress={() => {
                                setSelectedPill(pill);
                                /** ==========TODO : NEW PAGE/ALERT TO EDIT INVENTORY OF SELECTED PILL  */
                              }}
                              icon={"plus"}
                            >
                              Inventory
                            </Button>
                          </View>
                        </View>
                      </View>

                      
                    </Card.Content>
                    <Card.Actions className="w-full">
                    <View className="w-full">
                        <View className="flex-row justify-between items-center text-sm mt-2 ">
                          <View className="bg-transparent">
                            <Button
                              onPress={() => {
                                router.push(`/pills/view/${pill.id}`);
                              }}
                              mode="contained"
                              icon={"arrow-right"}
                            >
                              View
                            </Button>
                            {/* <Link href={`/pills/view/${pill.id}`}>
                            <Text className="border border-on-background">Views</Text>
                          </Link> */}
                          </View>

                          <Text className="shrink-0 font-medium text-foreground">
                            {Math.max(pill.inventory - calcTakeDoses(pill), 0)}/
                            {pill.inventory} left
                          </Text>
                        </View>
                      </View>
                    </Card.Actions>
                  </Card>
                </View>
              )}
            />
            {/* {pillsList.map((pill) => )} */}
          </View>
        )}
      </View>
    </Surface>
  );
};

export default PillsScreen;

const styles = StyleSheet.create({});
