import { useEffect, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
	ActivityIndicator,
	Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../AuthContext';

const Login = ({ navigation }) => {
	const [username, setUsername] = useState('pablo.ulman@ort.edu.ar');
	const [password, setPassword] = useState('pabulm101');
	const [isPasswordVisible, setPasswordVisible] = useState(false);
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
			<View style={styles.form_container}>
				<View style={styles.logoAndTitleContainer}>
					<Image style={styles.tinyLogo} source={require('../assets/icon.png')} />
					<Text style={styles.title}>Iniciar Sesión</Text>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Correo Electrónico</Text>
					<View style={styles.inputSection}>
						<Icon name="mail-outline" size={24} color="#000" />
						<TextInput
							style={styles.input}
							placeholder="Correo electrónico..."
							value={username}
							onChangeText={setUsername}
							autoCapitalize="none"
							keyboardType="email-address"
						/>
					</View>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Contraseña</Text>
					<View style={styles.inputSection}>
						<Icon name="lock-closed-outline" size={24} color="#000" />
						<TextInput
							style={styles.input}
							placeholder="Password..."
							value={password}
							onChangeText={setPassword}
							secureTextEntry={!isPasswordVisible}
						/>
						<TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
							<Icon
								name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
								size={24}
								color="#000"
							/>
						</TouchableOpacity>
					</View>
				</View>

				<TouchableOpacity
					style={styles.loginButton}
					onPress={handleLogin}
					disabled={loading}>
					{loading ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text style={styles.loginButtonText}>Iniciar Sesión</Text>
					)}
				</TouchableOpacity>

				<View style={styles.footer}>
					<TouchableOpacity onPress={() => navigation.navigate('Register')}>
						<Text style={styles.footerText}>Registrarse</Text>
					</TouchableOpacity>
					<TouchableOpacity>
						<Text style={styles.footerText}>¿Olvidaste tu contraseña?</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
		backgroundColor: '#dee5f4',
	},
	form_container: {
		paddingVertical: 50,
		paddingHorizontal: 20,
		backgroundColor: '#f1f7fe',
		borderRadius: 10,
	},
	logoAndTitleContainer: {
		alignItems: 'center',
		marginBottom: 20,
	},
	tinyLogo: {
		width: 100,
		height: 100,
		resizeMode: 'contain',
		marginBottom: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20,
		color: '#71746D',
	},
	inputContainer: {
		marginBottom: 20,
	},
	label: {
		fontSize: 16,
		marginBottom: 8,
		color: '#333',
	},
	inputSection: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		borderRadius: 8,
	},
	input: {
		flex: 1,
		marginLeft: 10,
		fontSize: 16,
	},
	loginButton: {
		backgroundColor: '#3E4684',
		padding: 15,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 20,
	},
	loginButtonText: {
		color: '#fff',
		fontSize: 18,
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
	},
	footerText: {
		color: '#71746D',
		fontSize: 16,
	},
});

export default Login;
