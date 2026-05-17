import { useCallback } from "react";
import { Button, Card } from "react-native-paper";
// import { Badge } from "@/components/ui/badge";
import type { PillsType, Shift } from "@/types";
import { usePillStore } from "@/zustand/pills.store";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
// import { toast } from "sonner";

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
const DailyView = ({ targetPill }: ViewProps) => {
  const { updatePill } = usePillStore();
  const divisor =
    targetPill?.frequency?.shifts.reduce((prev, curr) => prev + curr.dose, 0) ||
    1;
  const datesArr = Array.from(
    { length: Math.ceil(targetPill.inventory / divisor) },
    (_, i) => targetPill.startDate + i * 24 * 60 * 60 * 1000
  );
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

  const handleMark = (date: number, shift: Shift) => {
    const fDate = formatDate(new Date(date));
    //   if not exist, push:
    if (checkIfMarked(fDate, shift.time)) {
      // already exists, remove:
      updatePill(targetPill.id, {
        ...targetPill,
        logs: targetPill.logs.filter(
          (f) =>
            !(f.scheduledDate === fDate && f.scheduledShiftTime === shift.time)
        ),
      });
      //   toast.info("Marked as n/a");
    } else {
      // is new add:
      updatePill(targetPill.id, {
        ...targetPill,
        logs: [
          ...targetPill.logs,
          {
            scheduledDate: fDate,
            scheduledShiftTime: shift.time,
            dose: shift.dose,
          },
        ],
      });

      //   toast.success("Marked as taken");
    }
  };

  return (
    <ScrollView className="flex-1">
      <Card mode="outlined">
        <Card.Content>
          {datesArr.map((date, index) => (
            <Card mode="elevated" key={index} className="mb-2">
              <Card.Content>
                <View>
                  <Text variant="titleMedium" className="mb-2">
                    {formattedReadableDate(new Date(date))}
                  </Text>

                  {targetPill.frequency.shifts.map((shift, ind) => (
                    <Button
                      key={ind}
                      onPress={() => {
                        handleMark(date, shift);
                      }}
                      mode={
                        checkIfMarked(formatDate(new Date(date)), shift.time)
                          ? "contained"
                          : "outlined"
                      }
                      // onKeyDown={(key) => {
                      //   if (key.code.toLowerCase() === "enter") {
                      //     handleMark(date, shift);
                      //   }
                      // }}
                      // variant={"secondary"}
                      // className={`border rounded-xl border-on-background mt-1 p-4 ${
                      //   checkIfMarked(formatDate(new Date(date)), shift.time)
                      //     ? "bg-primary text-on-primary"
                      //     : ""
                      // }`}
                    >
                      {shift.time} - {shift.dose}({targetPill.unit})
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

export default DailyView;
