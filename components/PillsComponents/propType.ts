import type { PillsType } from "@/types";

export type stepsPropsType = {
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    formData: PillsType;
    setformData: React.Dispatch<React.SetStateAction<PillsType>>;
    handleAddPill?: () => void;
};
