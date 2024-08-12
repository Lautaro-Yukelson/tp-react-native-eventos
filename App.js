import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import EventosHome    from './src/screens/homeEventos.js';
import EventosDetalle from './src/screens/detalleEvento.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={EventosHome} options={{ title: 'Eventos' }} />
        <Stack.Screen name="Detalle" component={EventosDetalle} options={{ title: 'Detalle del Evento' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;