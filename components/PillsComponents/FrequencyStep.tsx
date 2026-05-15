import { Button } from "@/components/ui/Button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import type { stepsPropsType } from "./propType";

// import {
//   Field,
//   FieldContent,
//   FieldDescription,
//   FieldLabel,
//   FieldTitle,
// } from "@/components/ui/field";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Frequency } from "@/types";
import { Pressable, View } from "react-native";
import { ThemedIcon } from "../ui/ThemedIcon";

type OptionType = "daily" | "interval" | "specific";

interface RadioOption {
  id: OptionType;
  title: string;
  description: string;
}

interface RadioSelectorProps {
  selectedValue: OptionType;
  onValueChange: (value: OptionType) => void;
}

const FrequencyStep = ({
  setCurrentStep,
  formData,
  setformData,
}: stepsPropsType) => {
  const { theme } = useThemeStore();
  const themedSelected = theme === "dark" ? "#ffffff" : "#000000";

  const options: RadioOption[] = [
    {
      id: "daily",
      title: "Daily",
      description: "E.g I take daily at 8:00 AM and 6:00 PM",
    },
    {
      id: "interval",
      title: "Interval",
      description: "E.g I take every '12 hours' or '3 days' or '1 weeks' ",
    },
    {
      id: "specific",
      title: "Specific",
      description: "E.g I take every 'Monday'",
    },
  ];

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <View className="flex-1">
      <Card>
        <CardHeader>
          <CardTitle>How often do you take this?</CardTitle>
          <CardDescription></CardDescription>
          <View className="mt-4 text-left flex flex-col gap-3">
            <View style={styles.container}>
              {options.map((item) => {
                const completed = formData.frequency.type === item.id;

                return (
                  <Pressable
                    key={item.id}
                    onPress={() => {
                      setformData({
                        ...formData,
                        frequency: {
                          type: item.id,
                          shifts: [],
                        } as Frequency,
                      });
                    }}
                    style={[
                      styles.parentView,
                      completed
                        ? { borderColor: themedSelected }
                        : {
                            borderColor: "grey",
                          },
                    ]}
                  >
                    {/* Left Section */}
                    <View style={styles.leftContainer}>
                      <ThemedIcon
                        name={completed ? "check" : "square-outline"}
                        size={20}
                        style={styles.iconStyle}
                      />
                    </View>

                    {/* Right Section */}
                    <View style={styles.rightContainer}>
                      <M3Text style={styles.titleText}>{item.title}</M3Text>
                      <M3Text style={styles.descriptionText}>
                        {item.description}
                      </M3Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
            {/* <RadioGroup
              value={formData.frequency.type}
              className=""
              onValueChange={(e) => {
                setformData({
                  ...formData,
                  frequency: {
                    type: e,
                    shifts: [],
                  } as Frequency,
                });
              }}
            >
              <FieldLabel htmlFor="daily-plan">
                <Field orientation="horizontal">
                  <RadioGroupItem value="daily" id="daily-plan" />
                  <FieldContent>
                    <FieldTitle>Daily</FieldTitle>
                    <FieldDescription>
                      E.g I take daily at 8:00 AM and 6:00 PM
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="interval-plan">
                <Field orientation="horizontal">
                  <RadioGroupItem value="interval" id="interval-plan" />
                  <FieldContent>
                    <FieldTitle>Interval</FieldTitle>
                    <FieldDescription>
                      E.g I take every "12 hours" or "3 days" or "1 weeks"
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="specific-plan">
                <Field orientation="horizontal">
                  <RadioGroupItem value="specific" id="specific-plan" />
                  <FieldContent>
                    <FieldTitle>Specific Day</FieldTitle>
                    <FieldDescription>
                      E.g I take every "Monday"
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldLabel>
            </RadioGroup> */}
          </View>
        </CardHeader>
        <CardFooter style={{justifyContent:"space-between"}}>
          <Button
            onPress={handlePrev}
            mode={"outline"}
            title="Previous"
          ></Button>

          <Button onPress={handleNext} title="Next Step"></Button>
        </CardFooter>
      </Card>
    </View>
  );
};

export default FrequencyStep;

import { useThemeStore } from "@/zustand/theme";
import { StyleSheet } from "react-native";
import { M3Text } from "../ui/M3Text";

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    gap: 12,
  },
  parentView: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    // backgroundColor: "#fff",
  },
  leftContainer: {
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    width: 24,
  },
  iconStyle: {
    textAlign: "center",
  },
  rightContainer: {
    flex: 1,
    flexDirection: "column",
  },
  titleText: {
    fontSize: 16,
    // fontWeight: "bold",
    // color: "#000",
    marginBottom: 2,
  },
  descriptionText: {
    fontSize: 14,
    color: "#666",
  },
});
