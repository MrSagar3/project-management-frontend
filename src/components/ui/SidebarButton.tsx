import { TSidebarButtonProps } from "@/types/components";

export const SidebarButton = ({
  onClick,
  path,
  icon: Icon,
  label,
  activePath,
}: TSidebarButtonProps) => {
  const getButtonClass = (path: string) =>
    `flex items-center space-x-3 w-full text-left py-1 ${
      activePath === path
        ? "text-orange-600 font-semibold rounded-md"
        : "text-gray-700 hover:text-black"
    }`;

  return (
    <button onClick={onClick} className={getButtonClass(path)}>
      <Icon size={19} />
      <span className=" md:inline">{label}</span>
    </button>
  );
};
