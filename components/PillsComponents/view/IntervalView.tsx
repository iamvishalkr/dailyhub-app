import { Card } from "@/components/ui/Card";
import { useCallback } from "react";
// import { Badge } from "@/components/ui/badge";
import { M3Text } from "@/components/ui/M3Text";
import { M3View } from "@/components/ui/M3View";
import type { IntervalFreq, PillsType } from "@/types";
import { usePillStore } from "@/zustand/pills.store";
import { ScrollView, View } from "react-native";

const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate()}-${date.getHours()}`;
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

const IntervalView = ({ targetPill }: ViewProps) => {
  const { updatePill } = usePillStore();
  const frequency = targetPill.frequency as IntervalFreq;
  const divisor =
    frequency.shifts.reduce((prev, curr) => prev + curr.dose, 0) || 1;

  const unitMs =
    frequency.unit === "days"
      ? 24 * 60 * 60 * 1000
      : frequency.unit === "weeks"
      ? 7 * 24 * 60 * 60 * 1000
      : 60 * 60 * 1000;

  const datesArr = Array.from(
    { length: Math.ceil(targetPill.inventory / divisor) },
    (_, i) => targetPill.startDate + i * frequency.every * unitMs
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

  return (
    <ScrollView className="flex-1">
      <Card className="">
        {datesArr.map((date, index) => (
            <View key={index} className="p-2 ">
          <M3View
            className={`px-2 pb-2 border-b border-on-surface bg-transparent`}
          >
            <M3Text>{formattedReadableDate(new Date(date))}</M3Text>

            {frequency.shifts.map((m, ind) => (
              <M3Text
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
                key={ind}
                className={`border rounded-xl border-on-background mt-1 p-4 ${
                  checkIfMarked(formatDate(new Date(date)), m.time)
                    ? "bg-primary text-on-primary"
                    : ""
                }`}
              >
                {m.time} - {m.dose}({targetPill.unit})
              </M3Text>
            ))}
          </M3View></View>
        ))}
      </Card>
    </ScrollView>
  );
};

export default IntervalView;
