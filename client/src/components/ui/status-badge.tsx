import { CheckIcon, Highlighter, ClockIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "fulfilled" | "unfulfilled" | "in_progress";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "fulfilled":
        return {
          icon: CheckIcon,
          text: "Fulfilled",
          bgColor: "bg-success",
          textColor: "text-success",
        };
      case "unfulfilled":
        return {
          icon: Highlighter,
          text: "Unfulfilled",
          bgColor: "bg-warning",
          textColor: "text-warning",
        };
      case "in_progress":
        return {
          icon: ClockIcon,
          text: "In Progress",
          bgColor: "bg-gold",
          textColor: "text-gold",
        };
      default:
        return {
          icon: ClockIcon,
          text: "Unknown",
          bgColor: "bg-slate-500",
          textColor: "text-slate-500",
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn("w-5 h-5 rounded-full flex items-center justify-center", config.bgColor)}>
        <Icon className="w-3 h-3 text-white" />
      </div>
      <span className={cn("ml-2 text-sm font-medium", config.textColor)}>
        {config.text}
      </span>
    </div>
  );
}
