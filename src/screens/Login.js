import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../AuthContext';

const Login = ({ navigation }) => {
	const [username, setUsername] = useState('pablo.ulman@ort.edu.ar');
	const [password, setPassword] = useState('pabulm101');
	const { login } = useAuth();

	const handleLogin = async () => {
		const response = await login(username, password);
		if (response.success) {
			navigation.navigate('Home');
		} else {
			alert(response.message);
		}
	};

	return (
		<View style={styles.container}>
			<Text>Login Screen</Text>
			<Button title="Login" onPress={handleLogin} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Login;
