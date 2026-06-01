import { Text, View, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";
import { LucideIcon } from "lucide-react-native";

interface VehicleTypeCardProps extends TouchableOpacityProps{
  icon: LucideIcon;
  label: string;
  selectedCard?: boolean;
}

export function VehicleTypeCard({
  icon: Icon,
  label,
  selectedCard = false,
  ...props
}: VehicleTypeCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={selectedCard}
      style={
        selectedCard
          ? [styles.container, styles.containerSelected]
          : styles.container
      }
      {...props}
    >
      <View
        style={selectedCard ? [styles.box, styles.boxSelected] : styles.box}
      >
        <Icon
          size={22}
          color={selectedCard ? styles.iconSelected.color : styles.icon.color}
        />
      </View>

      <Text
        style={
          selectedCard
            ? [styles.textlabel, styles.textSelected]
            : styles.textlabel
        }
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
