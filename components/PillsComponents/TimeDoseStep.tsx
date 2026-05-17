import type { Frequency, Shift } from "@/types";
import { useState } from "react";
import { Button, Card } from "react-native-paper";
// import DateSelector from "../DateSelector";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "../ui/select";
import { useThemeStore } from "@/zustand/theme";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { M3Input } from "../ui/M3Input";
import type { stepsPropsType } from "./propType";

const TimeDoseStep = ({
  setCurrentStep,
  formData,
  setformData,
}: stepsPropsType) => {
  const { theme } = useThemeStore();
  const [errorMsg, seterrorMsg] = useState("");
  const [everyUnit, setEveryUnit] = useState({
    every: 1,
    unit: "hours",
  });
  const [shift, setshift] = useState({
    dose: 1,
    time: `08:00`,
  } as Shift);
  const [specificDaysArr, setSpecificDaysArr] = useState<number[]>([]);

  const handleNext = () => {
    setCurrentStep((prev) => prev - -1); // equivalent to + 1 but avoiding string concat if bugs
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleAddDaily = () => {
    setformData({
      ...formData,
      startDate: Date.now(),
      frequency: {
        ...formData.frequency,
        shifts: [...formData.frequency.shifts, shift],
      },
    });
  };
  const handleAddInterval = () => {
    setformData({
      ...formData,
      startDate: Date.now(),
      frequency: {
        ...formData.frequency,
        type: "interval",
        ...everyUnit,
        shifts: [...formData.frequency.shifts, shift],
      } as Frequency,
    });
  };
  const handleAddSpecific = () => {
    setformData({
      ...formData,
      startDate: Date.now(),
      frequency: {
        ...formData.frequency,
        type: "specific",
        days: specificDaysArr,
        shifts: [...formData.frequency.shifts, shift],
      } as Frequency,
    });
  };

  const removeShift = (i: number) => {
    // formData.frequency.shifts;
    setformData({
      ...formData,
      frequency: {
        ...formData.frequency,
        shifts: formData.frequency.shifts.filter((_, index) => index !== i),
      },
    });
  };

  const setselectedDate = (date: Date) => {
    setformData({
      ...formData,
      startDate: date.getTime(),
    });
  };

  const showMode = (date: Date, currentMode: "date" | "time") => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (_event, selectedDate) => {
        if (currentMode === "date") {
          if (selectedDate) {
            setselectedDate(selectedDate);
          }
        } else {
          if (selectedDate) {
            setshift({
              ...shift,
              time: selectedDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }),
            });
          }
        }
      },
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode(
      formData.startDate !== 0 ? new Date(formData.startDate) : new Date(),
      "date"
    );
  };
  const showTimepicker = () => {
    const t = shift.time.split(":");
    const date = new Date();
    date.setHours(Number(t[0]), Number(t[1]));
    showMode(date, "time");
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <ScrollView className="flex-1">
        <Card mode="outlined">
          <Card.Title title="Time and Dose"></Card.Title>
          <Card.Content>
            <View className="">
              <Text variant="titleMedium">Select Start Date</Text>
              <View className="mt-2">
                <Button
                  style={{ width: "100%" }}
                  mode="contained"
                  onPress={showDatepicker}
                >
                  {formData.startDate !== 0
                    ? new Date(formData.startDate).toDateString()
                    : "Select Date"}
                </Button>
              </View>

              {/* ====== DAILY ====== */}
              {formData.frequency.type === "daily" && (
                <View>
                  <Text variant="titleMedium" className="my-4">
                    Add Daily Slots
                  </Text>
                </View>
              )}

              {/* ====== INTERVAL ====== */}
              {formData.frequency.type === "interval" && (
                <View>
                  <Text variant="titleMedium" className="mt-4 mb-2">
                    Add Interval Slots
                  </Text>
                  <View className="flex-row items-center gap-4 mb-2">
                    <Text variant="titleSmall" className="flex-nowrap">
                      I take Every
                    </Text>
                    {/* <Text className=""></Text> */}
                    <M3Input
                      className="border-b flex-1"
                      inputMode="numeric"
                      value={String(everyUnit.every)}
                      onChangeText={(value) => {
                        seterrorMsg("");
                        setEveryUnit({
                          ...everyUnit,
                          every: Number(value),
                        });
                      }}
                      placeholder="Every"
                    />

                    {/* <FieldLabel htmlFor="every-unit">Unit</FieldLabel> */}
                    <View className="flex-2">
                      <Picker
                        dropdownIconColor={
                          theme === "dark" ? "#ffffff" : "#000000"
                        }
                        style={{
                          color: theme === "dark" ? "#ffffff" : "#000000",
                        }}
                        selectedValue={formData.unit}
                        onValueChange={(itemValue, _itemIndex) => {
                          seterrorMsg("");
                          setEveryUnit({ ...everyUnit, unit: itemValue });
                        }}
                      >
                        {["hours", "days", "weeks"].map((u) => (
                          <Picker.Item
                            key={u}
                            label={u}
                            value={u}
                            style={{ fontFamily: "SpaceMono" }}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </View>
              )}

              {/* ====== SPECIFIC ====== */}
              {formData.frequency.type === "specific" && (
                <View>
                  <Text variant="titleMedium" className="mt-4">
                    Add Specific Slots
                  </Text>
                  <View className="pt-2">
                    <Text variant="titleSmall" className="mb-2">
                      I take on: (select day(s))
                    </Text>

                    <View className="gap-1 mb-4">
                      {[
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thrusday",
                        "Friday",
                        "Saturday",
                      ].map((d, i) => (
                        <View key={i}>
                          <Button
                            mode={
                              specificDaysArr.includes(i)
                                ? "contained"
                                : "outlined"
                            }
                            style={{ width: "100%" }}
                            onPress={() => {
                              const setD = new Set(specificDaysArr);
                              if (setD.has(i)) {
                                // remove
                                setSpecificDaysArr(
                                  specificDaysArr.filter((f) => f !== i)
                                );
                              } else {
                                // add
                                setSpecificDaysArr([...specificDaysArr, i]);
                              }
                            }}
                          >
                            {d}
                          </Button>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              )}

              {/* ADD DOSE CARD */}
              <Card mode="outlined">
                <Card.Content>
                  <View className="flex-row items-center ">
                    <Text variant="titleSmall" className="flex-1">
                      Dose
                    </Text>
                    <M3Input
                      className="border-b flex-1"
                      inputMode="numeric"
                      value={String(shift.dose)}
                      onChangeText={(value) => {
                        seterrorMsg("");
                        setshift({ ...shift, dose: Number(value) });
                      }}
                      placeholder="Enter dose"
                    />
                  </View>
                  <View className="flex-row items-center my-2">
                    <Text variant="titleSmall" className="flex-1">
                      Select Time
                    </Text>
                    <Button
                      style={{ flex: 1 }}
                      mode="outlined"
                      onPress={showTimepicker}
                    >
                      {shift.time}
                    </Button>
                  </View>
                  <Button
                    mode="contained"
                    style={{ width: "100%" }}
                    onPress={() => {
                      if (formData.frequency.type === "daily") {
                        handleAddDaily();
                      } else if (formData.frequency.type === "interval") {
                        handleAddInterval();
                      } else if (formData.frequency.type === "specific") {
                        handleAddSpecific();
                      }
                    }}
                  >
                    Add
                  </Button>
                </Card.Content>
              </Card>

              {/* <hr /> */}
              <View className="mt-4">
                {formData.frequency.shifts.length > 0 &&
                  formData.frequency.shifts.map((sh, i) => (
                    <Card mode="outlined" key={i} className="mb-2">
                      <Card.Content>
                        <View
                          className="flex-row justify-between"
                          style={{ width: "100%" }}
                        >
                          <View>
                            <Text className="" variant="labelMedium">
                              {i + 1}
                              {")."} Dose: {sh.dose} {formData.unit}
                            </Text>
                            <Text variant="labelMedium" className="mt-1">
                              Time: {sh.time}
                            </Text>
                          </View>
                          <Button
                            mode="outlined"
                            onPress={() => {
                              removeShift(i);
                            }}
                          >
                            Remove
                          </Button>
                        </View>
                      </Card.Content>
                    </Card>
                  ))}
              </View>

              <Text className="text-red-700 text-sm mt-2">{errorMsg}</Text>
            </View>
          </Card.Content>
          <Card.Actions style={{ justifyContent: "space-between" }}>
            <Button onPress={handlePrev} mode={"outlined"}>
              Previous
            </Button>

            <Button
              mode="contained"
              disabled={formData.frequency.shifts.length <= 0}
              onPress={handleNext}
            >
              Next Step
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TimeDoseStep;
