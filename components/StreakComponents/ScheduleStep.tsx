// import DateSelector from "@/components/DateSelector";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
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
    <View>
      <Card mode="outlined">
        <Card.Title title="Start Date"></Card.Title>
        <Card.Content>
          {/* content */}
          <View>
            <Text variant="titleMedium" style={{textAlign:"center"}}>
              {selectedDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
            <View className="text-gray-300 mt-2 cursor-pointer pt-2">
              <Button mode="outlined" onPress={showDatepicker}>
                Select Date
              </Button>
              {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
              {/* <Text>selected: {date.toLocaleString()}</Text> */}
              {/* <DateSelector
                  selectedDate={selectedDate}
                  setselectedDate={setselectedDate}
                /> */}
            </View>
          </View>
        </Card.Content>
        <Card.Actions style={{ justifyContent: "space-between" }}>
          <Button onPress={handlePrev} mode={"outlined"}>
            Previous
          </Button>

          <Button mode="contained" onPress={handleNext}>
            Next
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default ScheduleStep;
