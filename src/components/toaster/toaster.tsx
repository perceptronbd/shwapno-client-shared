import { CircleAlert, CircleCheck, CircleX, Info } from "lucide-react";
import { Text } from "../texts/text";
import { cn } from "../../utils/cn";

interface CustomToastProps {
  title: string;
  description?: string;
  type?: "success" | "error" | "warning" | "info";
}

export const CustomToast = ({
  title,
  description,
  type = "info",
}: CustomToastProps) => {
  const iconProps = {
    strokeWidth: 2,
    className: cn("size-10", {
      "text-success-500": type === "success",
      "text-error-500": type === "error",
      "text-warning-500": type === "warning",
    }),
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CircleCheck {...iconProps} />;
      case "error":
        return <CircleX {...iconProps} />;
      case "warning":
        return <CircleAlert {...iconProps} />;
      default:
        return <Info {...iconProps} />;
    }
  };

  return (
    <div role="alert" className="flex w-full items-start gap-3 p-3">
      {getIcon()}
      <div className="flex-1 space-y-1">
        <Text
          weight="bold"
          className={cn("leading-none", {
            "text-success-500": type === "success",
            "text-error-500": type === "error",
            "text-warning-500": type === "warning",
          })}
        >
          {title}
        </Text>
        {description && (
          <Text variant="bodySmall" className="text-neutral-400">
            {description}
          </Text>
        )}
      </div>
    </div>
  );
};
