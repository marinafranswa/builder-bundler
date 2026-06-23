
import { Grid3X3, Shield, Signal, Webcam } from "lucide-react";
import type { StepConfig } from "./selection.interfacs";


export const STEP_CONFIG: StepConfig[] = [
  {
    key: "cameras",
    value: "camera",
    label: "cameras",
    icon: Webcam,
    gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-5",
  },
  {
    key: "plan",
    value: "plan",
    label: "Home monitoring plan",
    icon: Shield,
    gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  },
  {
    key: "sensors",
    value: "sensors",
    label: "sensors",
    icon: Signal,
    gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  },
  {
    key: "extraProtection",
    value: "protection",
    label: "accessories",
    icon: Grid3X3,
    gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  },
];