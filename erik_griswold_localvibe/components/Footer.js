import React, { useContext } from "react";
import Settings from "../screens/Settings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import Home from "../screens/Home";

const Tab = createBottomTabNavigator();

export default function Footer() {
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: activeColors.secondary,
        },
        headerShown: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={24} color={color} />;
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
            return <Ionicons name={iconName} size={24} color={color} />;
          } 

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: activeColors.accent,
        tabBarInactiveTintColor: activeColors.tertiary,
        headerTitleAlign: "left",
        headerTitleStyle: {
          paddingLeft: 10,
          fontSize: 24,
        },
        headerStyle: {
          backgroundColor: activeColors.secondary,
        },
        headerTintColor: activeColors.tint,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
