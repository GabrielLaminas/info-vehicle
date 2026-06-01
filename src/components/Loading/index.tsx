import { useEffect, useRef } from "react";
import { Text, View, Animated, Easing } from "react-native";
import { styles } from "./styles";
import { LoaderCircleIcon } from "lucide-react-native";

export function Loading(){
  const spinValue = useRef(new Animated.Value(0)).current;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }, [spinValue]);
  
  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <LoaderCircleIcon 
          size={40} 
          color="#3980F4"
        />
      </Animated.View>      
      <Text style={styles.text}>
        Carregando...
      </Text>
    </View>
  )
}