import { THeaderProps } from "@/types";

export const Header = ({ title, description }: THeaderProps) => {
  return (
    <header className="flex justify-between items-center mb-[29px]">
      <div>
        <h1 className="text-[20px] font-semibold text-gray-900">{title}</h1>
        <p className="text-[12px] text-secondary-gray">{description}</p>
      </div>
    </header>
  );
};
