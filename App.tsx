import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "./src/routes/app.route";
import { Loading } from "./src/components/Loading";
import { useFonts } from "expo-font";
import { 
  Manrope_400Regular,
  Manrope_600SemiBold, 
  Manrope_700Bold, 
  Manrope_800ExtraBold
} from "@expo-google-fonts/manrope";

const queryClient = new QueryClient();

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold
  });

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar 
        backgroundColor="transparent"
        style='dark'
        translucent
        animated
      />
      { fontsLoaded ? <NavigationContainer /> : <Loading /> }
    </QueryClientProvider>
  );
}
