import { Circle, CircleDashed } from "lucide-react";
export const columns = [
  {
    label: "Backlog",
    status: "backlog",
    icon: <CircleDashed height={14} width={14} className="text-orange-500" />,
  },
  {
    label: "Todo",
    status: "todo",
    icon: <Circle height={14} width={14} className="text-purple-500" />,
  },
  {
    label: "In progress",
    status: "in-progress",
    icon: <Circle height={14} width={14} className="text-yellow-500" />,
  },
  {
    label: "In review",
    status: "in-review",
    icon: <Circle height={14} width={14} className="text-blue-500" />,
  },
  {
    label: "Done",
    status: "done",
    icon: <Circle height={14} width={14} className="text-green-500" />,
  },
];
