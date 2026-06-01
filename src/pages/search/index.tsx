import { useCallback, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { VehicleTypeCard } from "../../components/VehicleTypeCard";
import PickerInput from "../../components/PickerInput";
import { Button } from "../../components/Button";
import { useQuery } from "react-query";
import { Datas, ItemsData, Phases, VehicleType } from "../../types/search";
import { getFipeBrand, getFipeInformation, getFipeModels, getFipeModelsYears, URL_API } from "../../services/fipe";
import { Car, Motorbike, Truck } from "lucide-react-native";

export default function Search() {
  const [datas, setDatas] = useState<Datas[]>([]);
  const [vehicleType, setVehicleType] = useState<VehicleType | null>(null);

  const navigation = useNavigation();

  const brandValue = useMemo(() => {
    if(datas.length === 0) return;
    return datas.find((d) => d.phase === "brand")?.value;
  }, [datas]);

  const modelValue = useMemo(() => {
    if(datas.length === 0) return;
    return datas.find((d) => d.phase === "model")?.value;
  }, [datas]);

  const { data: brands } = useQuery({
    queryKey: ["brands", vehicleType],
    queryFn: () => getFipeBrand(vehicleType!), 
    enabled: !!vehicleType, //Só roda se tiver tipo de veículo
  });

  const { data: models } = useQuery({
    queryKey: ["models", vehicleType, brandValue],
    queryFn: async () => {
      if(vehicleType && brandValue){
        const data = await getFipeModels(vehicleType, brandValue);
        return data || [] as ItemsData[];
      } else {
        return [] as ItemsData[];
      }
    },
    enabled: !!vehicleType && !!brandValue
  });
  
  const { data: years } = useQuery({
    queryKey: ["years", vehicleType, brandValue, modelValue],
    queryFn: async () => {
      if(vehicleType && brandValue && modelValue){
        const data = await getFipeModelsYears(vehicleType, brandValue, modelValue);
        return data || [] as ItemsData[];
      } else {
        return [] as ItemsData[];
      }
    },
    enabled: !!vehicleType && !!brandValue && !!modelValue,
  });

  function handleUpdateVehicleType(type: VehicleType) {
    const vehicleType: Datas = { phase: "type", value: type };
    setDatas([vehicleType]);
    setVehicleType(type);
  }

  function handleUpdateDataInput(phase: Phases, value: string | null) {
    if(!value){
      setDatas((prev) => prev.filter(p => p.phase !== phase))
      return;
    };

    const dataPhase: Datas = { phase, value };
    const verifyDataPhase = datas.find((d) => d.phase === phase);

    if(phase === "brand"){
      setDatas((prev) => prev.filter(p => p.phase !== "model" && p.phase !== "year"))
    }
    if(phase === "model"){
      setDatas((prev) => prev.filter(p => p.phase !== "year"))
    }
    
    if (!verifyDataPhase) {
      setDatas((prev) => [...prev, dataPhase]);
    } else {
      const filterDataPhase = datas.filter((d) => d.phase !== phase);
      setDatas([...filterDataPhase, dataPhase]);
    }
  }

  async function handleGetFipeInformation() {
    const params = datas.map((d) => {
      let param = "";
      if (d.phase === "type") {
        param += `${d.value}`;
      }
      if (d.phase === "brand") {
        param += `/brands/${d.value}`;
      }
      if (d.phase === "model") {
        param += `/models/${d.value}`;
      }
      if (d.phase === "year") {
        param += `/years/${d.value}`;
      }
      return param;
    });

    try {
      const url = `${URL_API}/${params.join("")}`;
      const yearId = params[params.length - 1].replace("/years/", "");
      const response = await getFipeInformation(url);

      if(response && vehicleType){
        navigation.navigate("Details", {
          vehicleType: vehicleType,
          fipeCode: response.codeFipe,
          yearId: yearId,
          price: response.price,
          referenceMonth: response.referenceMonth
        });
      }
    } catch (error) {
      console.log(error);
    }    
  }

  const validateInputField = useCallback((phase: Phases) => {
    const verifyPhaseInDatas = datas.find((d) => d.phase === phase);
    const verifyValue = verifyPhaseInDatas && verifyPhaseInDatas.value ? true : false;
    return verifyValue;
  }, [datas]);

  return (
    <View style={styles.container}>      
      <View style={styles.sectionIntro}>
        <Text style={styles.heading}>Consultar Tabela FIPE</Text>
        <Text style={styles.bodyText}>
          Selecione os detalhes do veículo para obter o valor de mercado
          atualizado.
        </Text>
      </View>

      <View style={styles.sectionVehicleType}>
        <Text style={styles.sectionVehicleTypeHeading}>TIPO DE VEÍCULO</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flex: 1, gap: 12 }}
        >
          <VehicleTypeCard
            icon={Car}
            label="Carro"
            selectedCard={vehicleType === "cars"}
            onPress={() => handleUpdateVehicleType("cars")}
          />
          <VehicleTypeCard
            icon={Motorbike}
            label="Moto"
            selectedCard={vehicleType === "motorcycles"}
            onPress={() => handleUpdateVehicleType("motorcycles")}
          />
          <VehicleTypeCard
            icon={Truck}
            label="Caminhão"
            selectedCard={vehicleType === "trucks"}
            onPress={() => handleUpdateVehicleType("trucks")}
          />
        </ScrollView>
      </View>

      <View style={styles.sectionPicker}>
        <PickerInput
          items={brands ? brands : [] as ItemsData[]}
          phaseId="brand"
          label="Marca"
          placeholder="Selecione a marca"
          isValidInput={validateInputField("type")}
          onSelectedData={handleUpdateDataInput}
        />
        
        <PickerInput
          items={models ? models : [] as ItemsData[]}
          phaseId="model"
          label="Modelo"
          placeholder="Selecione o modelo"
          isValidInput={
            validateInputField("type") && validateInputField("brand")
          }
          onSelectedData={handleUpdateDataInput}
        />
        <PickerInput
          items={years ? years : [] as ItemsData[]}
          label="Ano do Modelo"
          phaseId="year"
          placeholder="Selecione o ano do modelo"
          isValidInput={
            validateInputField("type") &&
            validateInputField("brand") &&
            validateInputField("model")
          }
          onSelectedData={handleUpdateDataInput}
        />
      </View>
      
      <View>
        <Button 
          text="Consultar Preço"
          variant={
            (
              validateInputField("type") &&
              validateInputField("brand") &&
              validateInputField("model") &&
              validateInputField("year")
            ) ? "fill" : "disabled"
          }
          disabled={
            (
              validateInputField("type") &&
              validateInputField("brand") &&
              validateInputField("model") &&
              validateInputField("year")
            ) ? false : true
          }
          onPress={handleGetFipeInformation}
        />
      </View>
    </View>
  );
}
