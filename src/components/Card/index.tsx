import { Text, View, ViewProps } from "react-native";
import { styles } from "./styles";

interface CardText {
  title: string | undefined;
}

export function CardTitle({ title }: CardText){
  return (
    <Text style={styles.textTitle}>{title}</Text>
  )
}

export function CardTextBody({ title }: CardText){
  return (
    <Text style={styles.textBody}>{title}</Text>
  )
}

interface CardProps extends ViewProps {
  title: string | undefined;
  textBody: string | undefined;
}

export function Card({ title, textBody, ...props }: CardProps){
  return (
    <View style={[styles.card, props.style]}>
      <CardTitle title={title} />
      <CardTextBody title={textBody} />
    </View>
  )
}

interface CardMoreDetailsProps extends CardProps {
  title: string | undefined;
  textBody: string | undefined;
  textReference: string | undefined;
}

export function CardMoreDetails({ title, textBody, textReference, ...props }: CardMoreDetailsProps){
  return (
    <View style={[styles.cardMoreDetails, props.style]}>
      <View style={styles.cardMoreDetailsContainer}>
        <CardTitle title={title} />

        <Text style={styles.textBodyMoreDetails}>
          {textBody}
        </Text>
      </View>
      
      <Text style={styles.textBodyReference}>
        Referência: {textReference}
      </Text>
    </View>
  )
}