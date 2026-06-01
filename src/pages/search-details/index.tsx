import { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TextStyle, View } from "react-native";
import { styles } from "./styles";
import { styles as styleCard } from "../../components/Card/styles";
import { useNavigation, type StaticScreenProps } from "@react-navigation/native";
import { useQuery } from "react-query";
import { Card, CardMoreDetails } from "../../components/Card";
import { Button } from "../../components/Button";
import { BarChart } from "react-native-gifted-charts";
import { getFipeInformationHistory } from "../../services/fipe";
import { Fipe } from "../../services/fipe-dto";
import { checkStorageDetail, removeOneStorageDetail, setStorageDetails } from "../../storage/fipe";
import { VehicleType } from "../../types/search";
import { Loading } from "../../components/Loading";

type SearchDetailsProps = StaticScreenProps<{
  vehicleType: VehicleType;
  fipeCode: string;
  yearId: string;
  referenceMonth: string;
  price: string;
}>;

export default function SearchDetails({ route }: SearchDetailsProps) {
  const [isSave, setIsSave] = useState(false);
  const { vehicleType, fipeCode, yearId, price, referenceMonth } = route.params;
  const navigation = useNavigation();

  const { data: details, isLoading } = useQuery({
    queryKey: ["details", vehicleType, fipeCode, yearId],
    queryFn: () => getFipeInformationHistory(vehicleType, fipeCode, yearId)
  });

  const dataBarItem = useMemo(() => {
    if(!details) return [];

    const priceHistory = details.priceHistory.slice(0, 6).reverse();
    const totalPriceHistory = priceHistory.length;

    return priceHistory.map((history, i) => {
      const lastHistoryItem = totalPriceHistory - 1 === i;
      const formatValue = parseFloat(history.price.replace(/[R$\s.]/g, '').replace(',', '.'));
      const labelValue = formatValue >= 1000 ? `${(Math.floor(formatValue / 100) / 10).toFixed(1)}k` : formatValue;
      const monthLabel = history.month.split(' ')[0].slice(0, 3);
      const labelConfig = {
        color: lastHistoryItem ? "#3980F4" : "#45464D",
        fontFamily: "Manrope_700Bold",
        fontSize: 11,
        textAlign: "center"
      } as TextStyle;

      return { 
        value: formatValue,
        label: monthLabel,
        frontColor: lastHistoryItem ? "#3980F4" : "#D5E3FD",
        topLabelComponent: () => <Text style={{ marginBottom: 9, ...labelConfig }}>{labelValue}</Text>,
        labelComponent: () => <Text style={{ textTransform: "uppercase", ...labelConfig }}>{monthLabel}</Text>
      }
    });
  }, [details]);

  function handleToggleSaveDetail(fipe: Fipe){
    if(isSave){
      removeOneStorageDetail({ ...fipe, yearId, price, referenceMonth });
    } else {
      setStorageDetails({ ...fipe, yearId, price, referenceMonth });
    }
    setIsSave(!isSave);
  }

  useEffect(() => {
    if(!details) return;
    setIsSave(checkStorageDetail({ ...details, yearId, price, referenceMonth }));
  }, [details]);

  if (isLoading) return <Loading />;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.flexContent}>
          <CardMoreDetails
            title="Valor Atual"
            textBody={price}
            textReference={referenceMonth}
            style={{ flex: 0 }}
          />

          <View style={styles.flexContainerColumn}>
            <Card title="Modelo" textBody={details?.model} style={{ flex: 0 }} />

            <View style={styles.flexContainerRow}>
              <Card title="Marca" textBody={details?.brand} />
              <Card title="ANO" textBody={String(details?.modelYear)} />
            </View>

            <View style={styles.flexContainerRow}>
              <Card title="CÓDIGO FIPE" textBody={details?.codeFipe} />
              <Card title="COMBUSTÍVEL" textBody={details?.fuel} />
            </View>
          </View>

          <View style={styleCard.card}>
            <View style={styles.headerBarChart}>
              <Text style={styles.headerBarChartTitle}>Histórico de {"\n"}Preços</Text>
              <Text style={styles.headerBarChartText}>Últimos 6 meses</Text>
            </View>

            <BarChart 
              data={dataBarItem} 
              adjustToWidth
              disableScroll
              disablePress
              isAnimated 
              barBorderTopLeftRadius={8}
              barBorderTopRightRadius={8}
              overflowTop={35}          // Garante espaço no contêiner para que o extraHeight respire sem cortar o fundo
              height={120} 
              hideRules                 // Esconde todas as linhas horizontais de grade de fundo
              hideYAxisText             // Esconde completamente os números do eixo Y da esquerda
              yAxisThickness={0}        // Remove a linha vertical do eixo Y
              xAxisThickness={1}        // Mantém apenas a linha horizontal inferior do eixo X
              xAxisColor="transparent"
              spacing={8}               // Um valor baixo (entre 6 e 10) cria o vão fino da imagem
              // 2. REMOVE AS BORDAS LATERAIS: Garante que a primeira e a última barra encostem nas laterais
              initialSpacing={0}
              endSpacing={0}
              // 3. REMOVE O ESPAÇO RESERVADO DO EIXO Y
              yAxisLabelWidth={0}       
            />
          </View>
        </View>

        <View style={styles.flexContainerRow}>
          <Button 
            text={isSave ? "Salvo" : "Salvar"} 
            variant="outline" 
            onPress={() => handleToggleSaveDetail(details!)} 
          />

          <Button
            text="Nova Consulta"
            onPress={() => navigation.navigate("Home", { screen: "SearchTab" })}
          />
        </View>
      </View>
    </ScrollView>
  );
}