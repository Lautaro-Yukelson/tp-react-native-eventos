import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "./src/AuthContext";
import { TouchableOpacity, Image } from "react-native";

import Home from "./src/screens/Home";
import DetallesEventos from "./src/screens/DetallesEventos";
import Login from "./src/screens/Login";
import Profile from "./src/screens/Profile";

const Stack = createNativeStackNavigator();

const HeaderRight = ({ navigation, profilePicture }) => (
  <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
    <Image
      source={
        profilePicture
          ? { uri: profilePicture }
          : require("./src/assets/profile-icon.png")
      }
      style={{
        width: 25,
        height: 25,
        marginRight: 10,
        borderRadius: 100,
      }}
    />
  </TouchableOpacity>
);

const AppNavigator = () => {
  const { user } = useAuth();
  const profilePicture = user?.profilePicture;

  const screens = [
    { name: "Login", component: Login, options: { title: "Login" } },
    {
      name: "Home",
      component: Home,
      options: ({ navigation }) => ({
        title: "Eventos",
        headerRight: () => (
          <HeaderRight
            navigation={navigation}
            profilePicture={profilePicture}
          />
        ),
      }),
    },
    {
      name: "DetallesEvento",
      component: DetallesEventos,
      options: ({ navigation }) => ({
        title: "Detalle del Evento",
        headerRight: () => (
          <HeaderRight
            navigation={navigation}
            profilePicture={profilePicture}
          />
        ),
      }),
    },
    {
      name: "Perfil",
      component: Profile,
      options: ({ navigation }) => ({
        title: "Perfil",
        headerRight: () => (
          <HeaderRight
            navigation={navigation}
            profilePicture={profilePicture}
          />
        ),
      }),
    },
  ];

  return (
    <Stack.Navigator>
      {screens.map(({ name, component, options }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={options}
        />
      ))}
    </Stack.Navigator>
  );
};

const App = () => (
  <AuthProvider>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  </AuthProvider>
);

export default App;
