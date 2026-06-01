import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Button } from "../Button";
import { StorageFipe } from "../../storage/fipe";
import { BookmarkOff, Calendar, Fuel } from "lucide-react-native";

interface Props {
  data: StorageFipe;
  onSeeMoreDatails: (data: StorageFipe) => void;
  onRemoveStorageDetails: (data: StorageFipe) => void;
}

export function SaveCard({
  data,
  onSeeMoreDatails,
  onRemoveStorageDetails,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerView}>
          <Text style={styles.headerBrand}>{data.brand}</Text>
          <Text style={styles.headerModel}>{data.model}</Text>
        </View>

        <TouchableOpacity onPress={() => onRemoveStorageDetails(data)}>
          <BookmarkOff color="#3980F4" />
        </TouchableOpacity>
      </View>

      <View style={styles.viewDetails}>
        <View style={styles.viewDetailsContainer}>
          <Calendar color="#45464D" size={20} />
          <Text style={styles.viewDetailsText}>{data.modelYear}</Text>
        </View>

        <View style={styles.viewDetailsContainer}>
          <Fuel color="#45464D" size={20} />
          <Text style={styles.viewDetailsText}>{data.fuel}</Text>
        </View>
      </View>

      <View style={styles.line} />

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerValue}>VALOR FIPE</Text>
          <Text style={styles.footerPrice}>{data.price}</Text>
        </View>

        <Button
          text="Ver Ficha"
          variant="fill"
          onPress={() => onSeeMoreDatails(data)}
        />
      </View>
    </View>
  );
}
