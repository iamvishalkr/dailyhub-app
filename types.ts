export type StreakType = {
  id: number;
  title: string;
  reason?: string;
  startDateMs: number;
  totalCount: number;
  completedDates: number[];
};
export type TrophyType = "Spark" | "Pro" | "Expert" | "Master";

export type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};

export type JournalType = {
  id: number;
  dateMs: number;
  content: string;
};

export type ExpenseType = {
  id: number;
  type: "expense" | "income";
  amount: number;
  category: string;
  note?: string;
};

export type PillsType = {
  id: number; // date now timestamp
  name: string;
  unit: string; // "mg", "tablet", "ml"
  frequency: Frequency;
  inventory: number;
  logs: DoseLog[]; // append-only log, easy to query
  startDate: number; // "date timestamp in ms"
  endDate?: number;
  note?: string;
};

// A single scheduled dose within a day (e.g. 8am → 1 pill)
export type Shift = {
  time: string; // "08:00" or "20:00"
  dose: number; // pills for THIS shift
};

export type DailyFreq = { type: "daily"; shifts: Shift[] }; // once/twice/thrice daily

export type IntervalFreq = {
  type: "interval";
  every: number;
  unit: "hours" | "days" | "weeks";
  shifts: Shift[];
};

// days: [0,3,6] = Sun/Wed/Sat (JS day index)
export type SpecificFreq = {
  type: "specific";
  days: number[];
  shifts: Shift[];
};

// Frequency
export type Frequency = DailyFreq | IntervalFreq | SpecificFreq;

// A completion log entry — one record per taken dose
export type DoseLog = {
  takenAt?: string; // ISO timestamp "2025-04-14T08:03:00"
  scheduledShiftTime: string; // "08:00" — which shift this was for
  scheduledDate: string; // "2025-04-14"
  dose: number; // actual dose taken (might differ from scheduled)
};

// PASSWORDS
export type TypePassword = {
  id: string;
  name: string;
  url?: string;
  username?: string;
  password: string; // Encrypted
  note?: string;
};

// CART
export type CartItemType = {
  id: number;
  productName: string;
  rate: number;
  qty: number;
  isChecked: boolean;
};


// USER
export type UserType = {
    id:string,
    name:string,
    email:string
}