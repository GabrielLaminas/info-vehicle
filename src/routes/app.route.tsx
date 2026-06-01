import { Text } from "react-native";
import { createStaticNavigation, type StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Search from "../pages/search";
import SearchDetails from "../pages/search-details";
import Save from "../pages/save";

import { Search as Busca, Bookmark } from "lucide-react-native";

const SearchStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Search: {
      screen: Search
    }
  }
});

const SaveStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Save: {
      screen: Save
    }
  }
});

const HomeTabs = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
    animation: "shift"
  },
  screens: {
    SearchTab: {
      screen: SearchStack,
      options: {
        tabBarLabel: ({focused}) => <Text style={{ color: focused ? "#3980F4" : "#94A3B8" }}>Buscar</Text>,
        tabBarIcon: ({focused}) => <Busca color={focused ? "#3980F4" : "#94A3B8"} />,
      },
    },
    SaveTab: {
      screen: SaveStack,
      options: {
        tabBarLabel: ({focused}) => <Text style={{ color: focused ? "#3980F4" : "#94A3B8" }}>Salvos</Text>,
        tabBarIcon: ({focused}) => <Bookmark color={focused ? "#3980F4" : "#94A3B8"} />
      }
    }
  }
});

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Home: {
      screen: HomeTabs
    },
    Details: {
      screen: SearchDetails
    }
  }
});

export const NavigationContainer = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}