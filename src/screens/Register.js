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

const Register = ({ navigation }) => {
	const [isPasswordVisible, setPasswordVisible] = useState(false);
	const [name, setName] = useState('Pepe');
	const [surname, setSurname] = useState('Velez');
	const [username, setUsername] = useState('pepe.velez@ort.edu.ar');
	const [password, setPassword] = useState('pepe12345$');
	const [loading, setLoading] = useState(false);
	const { setIsAuthenticated, login, register } = useAuth();

	useEffect(() => {
		const checkToken = async () => {
			const token = await SecureStore.getItemAsync('token');
			if (token) {
				setIsAuthenticated(true);
			}
		};
		checkToken();
	}, [navigation]);

	const handleRegister = async () => {
		setLoading(true);
		try {
			const response = await register(name, surname, username, password);
			if (response.success) {
				const response2 = await login(username, password);
				if (response2.success) {
					setIsAuthenticated(true);
				} else {
					Alert.alert('Error', response2.message);
				}
			} else {
				Alert.alert('Error', response.message);
			}
		} catch (error) {
			Alert.alert('UPS!', error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.form_container}>
				<View style={styles.logoAndTitleContainer}>
					<Image style={styles.tinyLogo} source={require('../assets/icon.png')} />
					<Text style={styles.title}>Register</Text>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Nombre</Text>
					<View style={styles.inputSection}>
						<Icon name="person-outline" size={24} color="#000" />
						<TextInput
							style={styles.input}
							placeholder="Nombre..."
							value={name}
							onChangeText={setName}
							autoCapitalize="words"
						/>
					</View>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Apellido</Text>
					<View style={styles.inputSection}>
						<Icon name="person-outline" size={24} color="#000" />
						<TextInput
							style={styles.input}
							placeholder="Apellido..."
							value={surname}
							onChangeText={setSurname}
							autoCapitalize="words"
						/>
					</View>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Correo Electrónico</Text>
					<View style={styles.inputSection}>
						<Icon name="mail-outline" size={24} color="#000" />
						<TextInput
							style={styles.input}
							placeholder="Email..."
							value={username}
							onChangeText={setUsername}
							keyboardType="email-address"
							autoCapitalize="none"
						/>
					</View>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Password</Text>
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
					style={styles.registerButton}
					onPress={handleRegister}
					disabled={loading}>
					{loading ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text style={styles.registerButtonText}>Register</Text>
					)}
				</TouchableOpacity>

				<View style={styles.footer}>
					<TouchableOpacity>
						<Text style={styles.footerText}>Iniciar Sesion</Text>
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
	registerButton: {
		backgroundColor: '#3E4684',
		padding: 15,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 20,
	},
	registerButtonText: {
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

export default Register;
