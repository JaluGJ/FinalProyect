import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import WrapperNotifications from "./WrapperNotifications";
import WrapperFavorites from "./WrapperFavorites";
import WrapperCart from "./WrapperCart";
import UserDrawer from "./UserDrawer";
import useCountCart from "../screens/Main/customHooks/useCountCart";


const AppStack = () => {
const Tab = createBottomTabNavigator();
const [countProducts] = useCountCart()
  
  return (
    <Tab.Navigator
      initialRouteName="UserDrawer"
      screenOptions={{
        tabBarLabel: "",
        headerShown: false,
        tabBarStyle: {
          height: 55,
          paddingTop: 12,
          backgroundColor: "#000000",
          borderTopColor: "#000000",
        },
      }}
    >
      <Tab.Screen
        name="UserDrawer"
        component={UserDrawer}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon
                name="home"
                type="material-community"
                size={30}
                color="#DD8643"
              />
            ) : (
              <Icon
                name="home-outline"
                type="material-community"
                size={30}
                color="#DD8643"
              />
            ),
        }}
      />

      <Tab.Screen
        name="WrapperFavorites"
        component={WrapperFavorites}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon
                name="cards-heart"
                type="material-community"
                size={30}
                color="#DD8643"
              />
            ) : (
              <Icon
                name="cards-heart-outline"
                type="material-community"
                size={30}
                color="#DD8643"
              />
            ),
        }}
      />
      <Tab.Screen
        name="WrapperNotifications"
        component={WrapperNotifications}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon
                name="bell"
                type="material-community"
                size={30}
                color="#DD8643"
              />
            ) : (
              <Icon
                name="bell-outline"
                type="material-community"
                size={30}
                color="#DD8643"
              />
            ),
        }}
      />
      <Tab.Screen
        name="WrapperCart"
        component={WrapperCart}
        options={{
        tabBarBadge: countProducts ? countProducts : null,
        tabBarBadgeStyle: {
          backgroundColor: "#fff6e8",
          color: "#DD8643",
          marginTop: -7,
        },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon
                name="cart"
                type="material-community"
                size={30}
                color="#DD8643"
              />
            ) : (
              <Icon
                name="cart-outline"
                type="material-community"
                size={30}
                color="#DD8643"
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;

