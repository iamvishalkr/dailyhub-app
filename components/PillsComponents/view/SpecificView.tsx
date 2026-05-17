import { useCallback, useMemo } from "react";
import { Button, Card } from "react-native-paper";
// import { Badge } from "@/components/ui/badge";
import type { PillsType, SpecificFreq } from "@/types";
import { usePillStore } from "@/zustand/pills.store";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate()}`;
};
const formattedReadableDate = (date: Date) => {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

type ViewProps = {
  targetPill: PillsType;
};

const SpecificView = ({ targetPill }: ViewProps) => {
  const { updatePill } = usePillStore();
  const frequency = targetPill.frequency as SpecificFreq;
  const divisor =
    frequency.shifts.reduce((prev, curr) => prev + curr.dose, 0) || 1;

  const datesArr = useMemo(() => {
    const times = Math.ceil(targetPill.inventory / divisor);
    const arr = [];
    let currentDate = targetPill.startDate;
    // adding safeguard for infinite loops
    let iterations = 0;

    // ensure specific days are selected
    if (!frequency.days || frequency.days.length === 0) return [];

    while (arr.length < times && iterations < 365) {
      const dateObj = new Date(currentDate);
      if (frequency.days.includes(dateObj.getDay())) {
        arr.push(currentDate);
      }
      currentDate += 24 * 60 * 60 * 1000;
      iterations++;
    }
    return arr;
  }, [targetPill.startDate, targetPill.inventory, divisor, frequency.days]);

  const checkIfMarked = useCallback(
    (date: string, time: string) => {
      const p = targetPill.logs;
      if (p.length <= 0) {
        return false;
      }
      for (let i = 0; i < p.length; i++) {
        const { scheduledDate, scheduledShiftTime } = p[i];
        if (scheduledDate === date && scheduledShiftTime === time) {
          return true;
        }
      }
      return false;
    },
    [targetPill.logs.length]
  );

  return (
    <ScrollView className="flex-1">
      <Card mode="outlined">
        <Card.Content>
          {datesArr.map((date, index) => (
            <Card mode="elevated" key={index} className="mb-2">
              <Card.Content className="p-2">
                <View>
                  <Text variant="titleMedium" className="mb-2">
                    {formattedReadableDate(new Date(date))}
                  </Text>

                  {frequency.shifts.map((m, ind) => (
                    <Button
                      key={ind}
                      mode={
                        checkIfMarked(formatDate(new Date(date)), m.time)
                          ? "contained"
                          : "outlined"
                      }
                      onPress={() => {
                        const fDate = formatDate(new Date(date));
                        // if not exist, push:
                        if (checkIfMarked(fDate, m.time)) {
                          // already exists, remove:
                          updatePill(targetPill.id, {
                            ...targetPill,
                            logs: targetPill.logs.filter(
                              (f) =>
                                !(
                                  f.scheduledDate === fDate &&
                                  f.scheduledShiftTime === m.time
                                )
                            ),
                          });
                        } else {
                          // is new add:
                          updatePill(targetPill.id, {
                            ...targetPill,
                            logs: [
                              ...targetPill.logs,
                              {
                                scheduledDate: fDate,
                                scheduledShiftTime: m.time,
                                dose: m.dose,
                              },
                            ],
                          });
                        }
                      }}

                      //   className={`border rounded-xl border-on-background mt-1 p-4 ${
                      //     checkIfMarked(formatDate(new Date(date)), m.time)
                      //       ? "bg-primary text-on-primary"
                      //       : ""
                      //   }`}
                    >
                      {m.time} - {m.dose}({targetPill.unit})
                    </Button>
                  ))}
                </View>
              </Card.Content>
            </Card>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default SpecificView;
