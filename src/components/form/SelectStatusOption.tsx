import { StatusIcon } from "@/components/form/StatusIcon";
import { SelectOption } from "@/types";

export const statusOptions: SelectOption[] = [
  {
    value: "1",
    icon: <StatusIcon className="bg-green-500" />,
    label: "Active",
  },
  {
    value: "0",
    icon: <StatusIcon className="bg-red-500" />,
    label: "Inactive",
  },
];
