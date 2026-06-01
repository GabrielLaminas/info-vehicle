import { useMemo, useState } from "react";
import { 
  View, Text, ScrollView, FlatList, TouchableOpacity, TextInput 
} from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { SaveCard } from "../../components/SaveCard";
import { EmptyList } from "../../components/EmptyList";
import { useMMKVObject } from "react-native-mmkv";
import { 
  getStorageDetails, removeOneStorageDetail, STORAGE_KEY_FIPE_DETAILS, 
  storageDetails, StorageFipe, StorageFipeDetails 
} from "../../storage/fipe";
import { VehicleType } from "../../types/search";

export default function Save(){
  const [activeTab, setActiveTab] = useState<VehicleType>("cars");
  const [dataStorage, setDataStorage] = useMMKVObject<StorageFipeDetails>(STORAGE_KEY_FIPE_DETAILS, storageDetails);
  const [textValue, setTextValue] = useState("");

  const navigation = useNavigation();

  const dataStorageTab = useMemo(() => {
    if(!dataStorage) return [] as StorageFipe[];
    
    const value = textValue.toLocaleLowerCase();

    if(activeTab === "cars"){
      if(!value) return dataStorage[1];

      return dataStorage[1].filter((data) => 
        data.brand.toLocaleLowerCase().includes(value) || 
        data.model.toLocaleLowerCase().includes(value) || 
        String(data.modelYear).includes(value));
    } if (activeTab === "motorcycles") {
      if(!value) return dataStorage[2];

      return dataStorage[2].filter((data) => 
        data.brand.toLocaleLowerCase().includes(value) || 
        data.model.toLocaleLowerCase().includes(value) || 
        String(data.modelYear).includes(value));
    } else {
      if(!value) return dataStorage[3];

      return dataStorage[3].filter((data) => 
        data.brand.toLocaleLowerCase().includes(value) || 
        data.model.toLocaleLowerCase().includes(value) || 
        String(data.modelYear).includes(value));
    }
  }, [activeTab, dataStorage, textValue]);

  const renderHeaderComponent = useMemo(() => {
    return (
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <TextInput 
            value={textValue}
            onChangeText={(text) => setTextValue(text)}
            placeholder="Buscar veiculo"
            style={{ flex: 1, fontFamily: "Manrope_400Regular" }}
          />
        </View>
        <Text style={styles.headerText}>
          Total: <Text style={styles.strong}>{dataStorageTab.length}</Text>
        </Text>
      </View>
    )
  }, [dataStorageTab.length, textValue]);

  function handleSeeMoreDatails(item: StorageFipe){
    const type = item.vehicleType === 1 
                  ? "cars" 
                  : item.vehicleType === 2 
                    ? "motorcycles" 
                    : "trucks";
          
    navigation.navigate("Details", { 
      vehicleType: type,
      fipeCode: item.codeFipe,
      yearId: item.yearId,
      price: item.price,
      referenceMonth: item.referenceMonth
    });
  }

  function handleRemoveStorageDetails(item: StorageFipe){
    removeOneStorageDetail(item);
    const storage = getStorageDetails();
    setDataStorage(storage ? storage : {} as StorageFipeDetails);
  }

  function renderItem({ item }: { item: StorageFipe }){
    return (
      <SaveCard 
        data={item}
        onSeeMoreDatails={handleSeeMoreDatails}
        onRemoveStorageDetails={handleRemoveStorageDetails}
      /> 
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ position: "relative" }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flex: 1, gap: 12 }}
        >
          <TouchableOpacity
            style={
              activeTab === "cars" 
                ? [styles.tab, styles.tabActive] 
                : [styles.tab, styles.tabInactive]
            }
            disabled={activeTab === "cars"}
            onPress={() => setActiveTab("cars")}
          >
            <Text style={activeTab === "cars" ? styles.tabActiveText : styles.tabInactiveText}>
              Carro
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              activeTab === "motorcycles" 
                ? [styles.tab, styles.tabActive] 
                : [styles.tab, styles.tabInactive]
            }
            disabled={activeTab === "motorcycles"}
            onPress={() => setActiveTab("motorcycles")}
          >
            <Text style={activeTab === "motorcycles" ? styles.tabActiveText : styles.tabInactiveText}>
              Moto
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              activeTab === "trucks" 
                ? [styles.tab, styles.tabActive] 
                : [styles.tab, styles.tabInactive]
            }
            disabled={activeTab === "trucks"}
            onPress={() => setActiveTab("trucks")}
          >
            <Text style={activeTab === "trucks" ? styles.tabActiveText : styles.tabInactiveText}>
              Caminhão
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={{
          width: "100%", height: 1.5, position: "absolute", left: 0, bottom: 0, backgroundColor: "#E0E3E5"
        }} />
      </View>

      <FlatList 
        data={dataStorageTab}
        renderItem={renderItem}
        keyExtractor={item => item.codeFipe}
        contentContainerStyle={{ rowGap: 16, flexGrow: 1, paddingBottom: 24, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <EmptyList activeTab={activeTab} />}
        ListHeaderComponent={renderHeaderComponent}
        stickyHeaderIndices={[0]}
      />
    </View>
  )
}