import { Card } from "@/components/ui/Card";
import { useCallback } from "react";
// import { Badge } from "@/components/ui/badge";
import { M3Text } from "@/components/ui/M3Text";
import { M3View } from "@/components/ui/M3View";
import type { PillsType, Shift } from "@/types";
import { usePillStore } from "@/zustand/pills.store";
import { ScrollView, View } from "react-native";
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
      <Card className="">
        {datesArr.map((date, index) => (
          <View key={index} className="p-2 ">
            <M3View
            
            className={`px-2 pb-2 border-b border-on-surface bg-transparent`}
          >
            <M3Text className="text-lg">{formattedReadableDate(new Date(date))}</M3Text>

            {targetPill.frequency.shifts.map((shift, ind) => (
              <M3Text
                key={ind}
                role="button"
                tabIndex={0}
                onPress={() => {
                  handleMark(date, shift);
                }}
                // onKeyDown={(key) => {
                //   if (key.code.toLowerCase() === "enter") {
                //     handleMark(date, shift);
                //   }
                // }}
                // variant={"secondary"}
                className={`border rounded-xl border-on-background mt-1 p-4 ${
                  checkIfMarked(formatDate(new Date(date)), shift.time)
                    ? "bg-primary text-on-primary"
                    : ""
                }`}
              >
                {shift.time} - {shift.dose}({targetPill.unit})
              </M3Text>
            ))}
          </M3View>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
};

export default DailyView;
