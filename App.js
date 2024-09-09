import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/AuthContext';
import { TouchableOpacity, Image } from 'react-native';

import Home from './src/screens/Home';
import DetallesEventos from './src/screens/DetallesEventos';
import Login from './src/screens/Login';
import Profile from './src/screens/Profile';

const Stack = createNativeStackNavigator();

const HeaderRight = ({ navigation, profilePicture }) => (
	<TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
		<Image
			source={
				profilePicture
					? { uri: profilePicture }
					: require('./src/assets/profile-icon.png')
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

const AuthStack = () => (
	<Stack.Navigator>
		<Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
	</Stack.Navigator>
);

const AppStack = () => {
	const { user } = useAuth();
	const profilePicture = user?.profilePicture;

	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				component={Home}
				options={({ navigation }) => ({
					title: 'Eventos',
					headerRight: () => (
						<HeaderRight navigation={navigation} profilePicture={profilePicture} />
					),
				})}
			/>
			<Stack.Screen
				name="DetallesEvento"
				component={DetallesEventos}
				options={({ navigation }) => ({
					title: 'Detalle del Evento',
					headerRight: () => (
						<HeaderRight navigation={navigation} profilePicture={profilePicture} />
					),
				})}
			/>
			<Stack.Screen
				name="Perfil"
				component={Profile}
				options={({ navigation }) => ({
					title: 'Perfil',
					headerRight: () => (
						<HeaderRight navigation={navigation} profilePicture={profilePicture} />
					),
				})}
			/>
		</Stack.Navigator>
	);
};

const AppNavigator = () => {
	const { user } = useAuth();
	return user ? <AppStack /> : <AuthStack />;
};

const App = () => (
	<AuthProvider>
		<NavigationContainer>
			<AppNavigator />
		</NavigationContainer>
	</AuthProvider>
);

export default App;
