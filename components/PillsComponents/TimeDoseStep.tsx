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
        <Card>
          <Card.Content>
            <Card.Title title="Time and Dose"></Card.Title>
            <View className="">
              <Text>Select Start Date</Text>
              {/* <TouchableOpacity>
              <ThemedIcon name="pen" />
              <Text>Select Start Date</Text>
            </TouchableOpacity> */}
              <View>
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
                  <Text className="my-4">Add Daily Slots</Text>
                  <View className="mb-3 border-on-surface border p-2 rounded-xl">
                    <View className="flex-row items-center">
                      <Text className="flex-1">Dose</Text>
                      <M3Input
                        className="border-b mb-2 flex-1"
                        inputMode="numeric"
                        value={String(shift.dose)}
                        onChangeText={(value) => {
                          seterrorMsg("");
                          setshift({ ...shift, dose: Number(value) });
                        }}
                        placeholder="Enter dose"
                      />
                    </View>
                    <View className="flex-row items-center">
                      <Text className="flex-1">Time</Text>
                      <Button
                        style={{ flex: 1 }}
                        mode="outlined"
                        onPress={showTimepicker}
                      >
                        {shift.time}
                      </Button>
                    </View>
                    <View>
                      <Button
                        mode="contained"
                        style={{ width: "100%", marginTop: 8 }}
                        onPress={handleAddDaily}
                      >
                        Add
                      </Button>
                    </View>
                  </View>
                </View>
              )}

              {/* ====== INTERVAL ====== */}
              {formData.frequency.type === "interval" && (
                <View>
                  <Text className="mt-4">Add Interval Slots</Text>
                  <View className="flex-row items-center gap-4">
                    <Text className="flex-nowrap">I take Every</Text>
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
                          <Picker.Item key={u} label={u} value={u} />
                        ))}
                      </Picker>
                    </View>
                  </View>

                  <View className="gap-3 border border-on-background rounded-xl p-2 bg-transparent">
                    <View className="flex-row items-center ">
                      <Text className="flex-1">Dose</Text>
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
                    <View className="flex-row items-center">
                      <Text className="flex-1">Time</Text>
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
                      onPress={handleAddInterval}
                    >
                      Add
                    </Button>
                  </View>
                  {/* <hr /> */}
                  {/* <View>
                    {formData.frequency.shifts.length > 0 &&
                      formData.frequency.shifts.map((sh, i) => (
                        <Card
                          key={i}
                          className="flex flex-row p-2 justify-between items-center mt-4"
                        >
                          <View>
                            <Text className="me-6">
                              {i + 1}
                              {")."} Dose: {sh.dose} {formData.unit}
                            </Text>
                            <Text>Time: {sh.time}</Text>
                          </View>
                          <Button
                            onPress={() => {
                              removeShift(i);
                            }}
                            title="Remove"
                          ></Button>
                        </Card>
                      ))}
                  </View> */}
                </View>
              )}

              {/* ====== SPECIFIC ====== */}
              {formData.frequency.type === "specific" && (
                <View>
                  <Text className="my-4">Add Specific Slots</Text>
                  <View className="mb-2">
                    <Text className="flex items-center my-4">
                      I take on: (select day(s))
                    </Text>

                    <View className="gap-1">
                      {[
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thrusday",
                        "Friday",
                        "Saturday",
                      ].map((d, i) => (
                        <View>
                          <Button
                            key={i}
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

                  <View className="gap-3 border border-on-background rounded-xl p-2 bg-transparent">
                    <View className="flex-row items-center ">
                      <Text className="flex-1">Dose</Text>
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
                    <View className="flex-row items-center">
                      <Text className="flex-1">Time</Text>
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
                      onPress={handleAddSpecific}
                    >
                      Add
                    </Button>
                  </View>
                  {/* <hr /> */}
                  {/* <View>
                    {formData.frequency.shifts.length > 0 &&
                      formData.frequency.shifts.map((sh, i) => (
                        <Card
                          key={i}
                          className="flex flex-row p-2 justify-between items-center mt-4"
                        >
                          <View>
                            <Text className="me-6">
                              {i + 1}
                              {")."} Dose: {sh.dose} {formData.unit}
                            </Text>
                            <Text>Time: {sh.time}</Text>
                          </View>
                          <Button
                            onPress={() => {
                              removeShift(i);
                            }}
                            title="Remove"
                          ></Button>
                        </Card>
                      ))}
                  </View> */}
                </View>
              )}

              {/* <hr /> */}
              <View>
                {formData.frequency.shifts.length > 0 &&
                  formData.frequency.shifts.map((sh, i) => (
                    <Card
                      key={i}
                      className="flex-row p-2 justify-between items-center mt-4"
                    >
                      <View>
                        <Text className="me-6">
                          {i + 1}
                          {")."} Dose: {sh.dose} {formData.unit}
                        </Text>
                        <Text>Time: {sh.time}</Text>
                      </View>
                      <Button
                        mode="outlined"
                        onPress={() => {
                          removeShift(i);
                        }}
                      >
                        Remove
                      </Button>
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
