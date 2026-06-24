import { Grid3X3, Shield, Signal, Webcam, type LucideIcon } from "lucide-react";
import type {  StepKey } from "./selection.interface";

export const STEP_CONFIG: StepConfig[] = [
  {
    key: "cameras",
    value: "camera",
    label: "Choose your cameras",
    categoryLabel: "Cameras",
    icon: Webcam,
    gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-5",
  },
  {
    key: "plan",
    value: "Home monitoring plan",
    label: "Choose your plan",
    categoryLabel: "Plan",
    icon: Shield,
    gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  },
  {
    key: "sensors",
    value: "sensors",
    label: "Choose your sensors",
    categoryLabel: "Sensors",
    icon: Signal,
    gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  },
  {
    key: "extraProtection",
    value: "accessories",
    label: "Add extra protection",
    categoryLabel: "Accessories",
    icon: Grid3X3,
    gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  },
];
export type StepConfig = {
  key: StepKey;
  value: string;
  label: string;
  icon: LucideIcon;
  gridCols: string;
  categoryLabel: string;
};