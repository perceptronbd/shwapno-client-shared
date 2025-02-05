import { Dispatch, FC, SetStateAction } from "react";
import { cn } from "../../utils/cn";

type Variant = keyof typeof variants.container;

const variants = {
  container: {
    active: "border-primary-400",
    inActive: "border-primary-400",
    inactiveDisabled: "border-primary-200",
    activeDisabled: "border-primary-200",
  },
  ball: {
    active: "bg-primary-400",
    inActive: "bg-primary-400",
    inactiveDisabled: "bg-primary-200",
    activeDisabled: "bg-primary-200",
  },
} as const;

interface SwitchProps {
  type?: Variant;
  containerClass?: string;
  ballClass?: string;
  isToggled: boolean;
  setIsToggled: Dispatch<SetStateAction<boolean>>;
}

export const Switch: FC<SwitchProps> = ({
  type = "active",
  containerClass,
  ballClass,
  isToggled,
  setIsToggled,
}) => {
  return (
    <div
      className={cn(
        "transition-colors cursor-pointer duration-500 rounded-[12px] relative border-[2px] w-10 h-6",
        variants.container[type],
        isToggled && variants.ball[`${type}`],
        containerClass
      )}
      onClick={() => setIsToggled(!isToggled)}
    >
      <div
        className={cn(
          "transition-all absolute duration-500 rounded-full bg-neutral-50 shadow-[1px_2px_5px_2px_rgba(0,0,0,0.1)] size-5 left-0",
          isToggled && ` left-full -translate-x-full`,
          ballClass
        )}
      />
    </div>
  );
};
