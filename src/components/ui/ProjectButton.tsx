import { TProjectButtonProps } from "@/types/components";

export const ProjectButton = ({
  onClick,
  path,
  color,
  label,
  activePath,
}: TProjectButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 w-full text-left py-1 ${activePath === path ? "text-orange-600 font-semibold rounded-md" : "text-gray-700 hover:text-black"}`}>
      <div
        className={`w-3 h-3 rounded-full`}
        style={{ backgroundColor: color }}></div>
      <span className="px-2">{label}</span>
    </button>
  );
};
