import Appbar from "@/components/Appbar";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/Button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { M3Text } from "@/components/ui/M3Text";
import { M3View } from "@/components/ui/M3View";
import { ThemedIcon } from "@/components/ui/ThemedIcon";
import { PillsType } from "@/types";
import { usePillStore } from "@/zustand/pills.store";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const PillsScreen = () => {
  const { pillsList, deletePill, updatePill } = usePillStore();
  //   const [isInventoryDiaOpen, setIsInventoryDiaOpen] = useState(false);
  const [selectedPill, setSelectedPill] = useState({} as PillsType);
  const router = useRouter();

  const calcTakeDoses = useCallback((pill: PillsType) => {
    const totalTakenDose = pill.logs.reduce((sum, item) => sum + item.dose, 0);
    return totalTakenDose;
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title="Pills"
        right={
          <Button
            title="Add"
            mode="outline"
            style={{ borderColor: "#fff" }}
            textStyle={{ color: "#fff" }}
            leadingIcon={<ThemedIcon color={"#ffffff"} name="plus" size={20} />}
            onPress={() => {
              router.push("/pills/add");
            }}
          />
        }
      />
      <M3View style={{ flex: 1 }} className="px-2 pt-1">
        {pillsList.length === 0 ? (
          <View className="p-4">
            <EmptyState
              Logo={"pill"}
              title="No medications tracked yet."
              subtitle="Add your first pill or medication to start tracking."
              btnText="Track Meds"
              link="pills/add"
            />
          </View>
        ) : (
          <View className="">
            <FlatList
              data={pillsList}
              renderItem={({ item: pill }) => (
                <View className="p-2">
                  <Card className="relative overflow-hidden group">
                    <CardHeader>
                      <View className="flex flex-col items-start gap-2">
                        <View className="w-full flex-row justify-between items-center group/title">
                          <CardTitle style={{ fontSize: 20 }}>
                            {pill.name}
                          </CardTitle>
                          <View className="flex-row items-center gap-2">
                            <M3Text className="capitalize whitespace-nowrap">
                              {pill.frequency.type}
                            </M3Text>
                            <Button
                              mode="link"
                              onPress={() => {
                                deletePill(pill.id);
                                //   if (confirm("Are you sure to delete?")) {
                                //   }
                              }}
                              title="delete"
                            >
                              <ThemedIcon name="delete" />
                            </Button>
                          </View>
                        </View>
                        <CardDescription>
                          Taken as ({pill.unit})
                        </CardDescription>
                        <View className="flex-row justify-between w-full items-center">
                          <View className="flex-row items-center justify-center gap-4 mt-1">
                            {pill.frequency.shifts.map((m, i) => (
                              <M3Text
                                className="p-1 px-4 border border-on-background rounded-full"
                                key={i}
                              >
                                {m.time}
                              </M3Text>
                            ))}
                          </View>
                          <View className="">
                            <Button
                              style={{ paddingVertical: 2 }}
                              mode="outline"
                              onPress={() => {
                                setSelectedPill(pill);
                                /** ==========TODO : NEW PAGE/ALERT TO EDIT INVENTORY OF SELECTED PILL  */
                              }}
                              title="Inventory"
                              trailingIcon={
                                <ThemedIcon name="plus" size={14} />
                              }
                            ></Button>
                          </View>
                        </View>
                      </View>

                      <View className="">
                        <M3View className="bg-transparent flex-row justify-between items-center text-sm  border-t border-on-background mt-2 pt-3  text-muted-foreground">
                          <M3View className="bg-transparent">
                            <Button
                              onPress={() => {
                                router.push(`/pills/view/${pill.id}`);
                              }}
                              title="View"
                              mode="filled"
                              style={{ paddingVertical: 2 }}
                            />
                            {/* <Link href={`/pills/view/${pill.id}`}>
                            <M3Text className="border border-on-background">Views</M3Text>
                          </Link> */}
                          </M3View>

                          <M3Text className="shrink-0 font-medium text-foreground">
                            {Math.max(pill.inventory - calcTakeDoses(pill), 0)}/
                            {pill.inventory} left
                          </M3Text>
                        </M3View>
                      </View>
                    </CardHeader>
                  </Card>
                </View>
              )}
            />
            {/* {pillsList.map((pill) => )} */}
          </View>
        )}
      </M3View>
    </View>
  );
};

export default PillsScreen;

const styles = StyleSheet.create({});
