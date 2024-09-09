import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../AuthContext';

const Login = ({ navigation }) => {
	const [username, setUsername] = useState('pablo.ulman@ort.edu.ar');
	const [password, setPassword] = useState('pabulm101');
	const [loading, setLoading] = useState(false);
	const { setIsAuthenticated, login } = useAuth();

	useEffect(() => {
		const checkToken = async () => {
			const token = await SecureStore.getItemAsync('token');
			if (token) {
				setIsAuthenticated(true);
			}
		};

		checkToken();
	}, [navigation]);

	const handleLogin = async () => {
		setLoading(true);
		try {
			const response = await login(username, password);
			if (response.success) {
				setIsAuthenticated(true);
			} else {
				Alert.alert('Error', response.message);
			}
		} catch (error) {
			Alert.alert('Error', 'Hubo un problema al intentar iniciar sesión.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Iniciar Sesión</Text>
			<TextInput
				style={styles.input}
				placeholder="Correo electrónico"
				value={username}
				onChangeText={setUsername}
				autoCapitalize="none"
				keyboardType="email-address"
			/>
			<TextInput
				style={styles.input}
				placeholder="Contraseña"
				value={password}
				onChangeText={setPassword}
				secureTextEntry={true}
			/>
			<Button
				title={loading ? 'Cargando...' : 'Iniciar Sesión'}
				onPress={handleLogin}
				color="#841584"
				disabled={loading}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
		backgroundColor: '#f5f5f5',
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
	},
	input: {
		width: '100%',
		height: 40,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 15,
		backgroundColor: '#fff',
	},
});

export default Login;
