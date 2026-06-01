import { useState } from "react";
import { Text, View } from "react-native";
import { styles, pickerSelectStylesActive, pickerSelectStylesInactive } from "./styles";
import PickerSelect from "react-native-picker-select";
import { ItemsData, Phases } from "../../types/search";
import { ChevronDown, LockKeyhole } from "lucide-react-native";

interface PickerInputProps {
  items: ItemsData[];
  label: string;
  placeholder?: string;
  isValidInput?: boolean;
  phaseId: Phases;
  onSelectedData: (phase: Phases, value: string | null) => void;
}

export default function PickerInput({ 
  items,
  label,
  placeholder,
  isValidInput = false,
  phaseId, 
  onSelectedData
}: PickerInputProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  function handleSelectedValue(value: string | null){
    onSelectedData(phaseId, value);
    setSelectedValue(value);
  }

  return (
    <View style={styles.container}>
      <Text style={isValidInput ? [styles.label, styles.labelValid] : styles.label}>
        {label}
      </Text>

      <View>
        <PickerSelect
          useNativeAndroidPickerStyle={false}
          fixAndroidTouchableBug
          style={isValidInput ? pickerSelectStylesActive : pickerSelectStylesInactive}
          value={selectedValue}
          disabled={isValidInput ? false : true}
          onValueChange={
            isValidInput ? (value) => handleSelectedValue(value) : () => {}
          }
          placeholder={{
            label: placeholder || "Selecione uma categoria",
            value: null,
          }}
          items={items}
          Icon={() => {
            return (
              isValidInput 
              ? <ChevronDown size={24} style={{ position: "absolute" }} color="#515F74" /> 
              : <LockKeyhole size={20} style={{ position: "absolute" }} color="#C6C6CD" />
            );
          }}
        />
      </View> 
    </View>
  );
}