// import DateSelector from "@/components/DateSelector";
import { Button } from "@/components/ui/Button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { M3Text } from "../ui/M3Text";
import type { stepsPropsType } from "./propType";

const ScheduleStep = ({
  setCurrentStep,
  formData,
  setformData,
}: stepsPropsType) => {
  const [selectedDate, setselectedDate] = useState(new Date());

  const showMode = (currentMode: "date" | "time") => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      onChange: (_event, selectedDate) => {
        if (selectedDate) {
          setselectedDate(selectedDate);
        }
      },
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  useEffect(() => {
    setformData({ ...formData, startDateMs: selectedDate.getTime() });
  }, [selectedDate]);

  return (
    <View className="px-2">
      <Card>
        <CardHeader>
          <CardTitle>Start Date</CardTitle>
          <CardDescription></CardDescription>
          {/* content */}
          <View className="text-center">
            <M3Text className="text-xl font-bold">
              {selectedDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </M3Text>
            <View className="text-gray-300 mt-2 cursor-pointer pt-2">
              <Button onPress={showDatepicker} title="Select Date" />
              {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
              {/* <Text>selected: {date.toLocaleString()}</Text> */}
              {/* <DateSelector
                  selectedDate={selectedDate}
                  setselectedDate={setselectedDate}
                /> */}
            </View>
          </View>
        </CardHeader>
        <CardFooter style={{ justifyContent: "space-between" }}>
          <Button onPress={handlePrev} mode={"outline"} title="Previous" />

          <Button onPress={handleNext} title="Next Step" />
        </CardFooter>
      </Card>
    </View>
  );
};

export default ScheduleStep;
