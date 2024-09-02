// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/AuthContext';

import Home from './src/screens/Home.js';
import DetallesEventos from './src/screens/DetallesEventos.js';
import Login from './src/screens/Login.js';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
			<Stack.Screen name="Home" component={Home} options={{ title: 'Eventos' }} />
			<Stack.Screen
				name="DetallesEvento"
				component={DetallesEventos}
				options={{ title: 'Detalle del Evento' }}
			/>
		</Stack.Navigator>
	);
};

const App = () => {
	return (
		<AuthProvider>
			<NavigationContainer>
				<AppNavigator />
			</NavigationContainer>
		</AuthProvider>
	);
};

export default App;
