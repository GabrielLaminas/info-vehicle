import { Text, View } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../Button";
import { VehicleType } from "../../types/search";
import { Car, Motorbike, Truck } from "lucide-react-native";

interface Props {
  activeTab: VehicleType;
}

export function EmptyList({ activeTab }: Props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {activeTab === "cars" ? (
          <Car size={36} color="#B5BBC5" />
        ) : activeTab === "motorcycles" ? (
          <Motorbike size={36} color="#B5BBC5" />
        ) : (
          <Truck size={36} color="#B5BBC5" />
        )}
      </View>

      <Text style={styles.textBody}>
        Explore mais veículos para salvar em sua lista e acompanhar os preços.
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          text="Explorar mais veículos"
          variant="fill"
          onPress={() => navigation.navigate("Home", { screen: "SearchTab" })}
        />
      </View>
    </View>
  );
}
