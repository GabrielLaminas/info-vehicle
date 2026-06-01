import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { variants, variantsText } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  variant?: "fill" | "outline" | "disabled";
}

export function Button({ text, variant = "fill", ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      style={
        variant === "fill"
          ? [variants.fill]
          : variant === "outline"
            ? [variants.outline]
            : [variants.disabled]
      }
      activeOpacity={0.75}
      {...props}
    >
      <Text
        style={
          variant === "fill"
            ? [variantsText.fill]
            : variant === "outline"
              ? [variantsText.outline]
              : [variantsText.disabled]
        }
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
