import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
	TouchableOpacity,
	Alert,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/es';
import { useAuth } from '../AuthContext.js';
import useAxios from '../hooks/useAxios.js';

const DetallesEvento = ({ route }) => {
	const { user } = useAuth();
	const { makeRequest } = useAxios();
	const [sub, setSub] = useState(false);
	const [participants, setParticipants] = useState([]);
	const { evento } = route.params;

	const formattedDate = moment(evento.start_date).format(
		'D [de] MMMM [de] YYYY',
	);

	const isPastEvent = moment(evento.start_date).isBefore(moment());

	const fetchData = async () => {
		try {
			const response = await makeRequest('get', `/event/${evento.id}/enrollment`);
			const data = response.response;
			if (isPastEvent) {
				setParticipants(data);
			} else {
				data.forEach((enrollment) => {
					if (enrollment.username == user.username) {
						setSub(true);
					}
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSub = async () => {
		try {
			const response = await makeRequest(
				'post',
				`/event/${evento.id}/enrollment`,
				{},
			);
			if (response.success) {
				Alert.alert('Te suscribiste con éxito');
				setSub(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUnSub = async () => {
		try {
			const response = await makeRequest(
				'delete',
				`/event/${evento.id}/enrollment`,
				{},
			);
			if (response.success) {
				Alert.alert('Te desuscribiste con éxito');
				setSub(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.imageContainer}>
				<Image
					source={{ uri: evento.img || 'https://via.placeholder.com/300' }}
					style={styles.imagen}
				/>
			</View>
			<View style={styles.detailsContainer}>
				<Text style={styles.name}>{evento.name}</Text>
				<Text style={styles.description}>{evento.description}</Text>
				<View style={styles.infoContainer}>
					<Text style={styles.label}>Fecha:</Text>
					<Text style={styles.start_date}>{formattedDate}</Text>
				</View>
			</View>
			{isPastEvent ? (
				<View style={styles.participantsContainer}>
					<Text style={styles.participantsTitle}>Participantes:</Text>
					{participants.map((participant, index) => (
						<View key={index} style={styles.participantRow}>
							<Text style={styles.participantText}>
								{participant.first_name} {participant.last_name}
							</Text>
							<Text style={styles.participantStatus}>
								{participant.attended == 1 ? '✔️' : '❌'}
							</Text>
						</View>
					))}
				</View>
			) : sub ? (
				<TouchableOpacity style={styles.unSubButton} onPress={handleUnSub}>
					<Text style={styles.subButtonText}>Desuscribirse</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity style={styles.subButton} onPress={handleSub}>
					<Text style={styles.subButtonText}>Suscribirse</Text>
				</TouchableOpacity>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 20,
		backgroundColor: '#f8f9fa',
	},
	imageContainer: {
		alignItems: 'center',
		marginBottom: 20,
	},
	imagen: {
		width: '100%',
		height: 300,
		borderRadius: 15,
		resizeMode: 'cover',
		borderColor: '#e9ecef',
		borderWidth: 1,
	},
	detailsContainer: {
		backgroundColor: '#ffffff',
		borderRadius: 10,
		padding: 20,
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 5,
	},
	name: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#343a40',
		marginBottom: 10,
	},
	description: {
		fontSize: 16,
		color: '#495057',
		marginBottom: 20,
		lineHeight: 24,
		textAlign: 'justify',
	},
	infoContainer: {
		marginTop: 20,
		borderTopWidth: 1,
		borderTopColor: '#e9ecef',
		paddingTop: 10,
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#495057',
		marginBottom: 5,
	},
	start_date: {
		fontSize: 16,
		color: '#868e96',
	},
	subButton: {
		color: '#fff',
		backgroundColor: '#3E4684',
		padding: 15,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 20,
	},
	unSubButton: {
		color: '#fff',
		backgroundColor: 'red',
		padding: 15,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 20,
	},
	subButtonText: {
		color: '#fff',
		fontSize: 18,
	},
	participantsContainer: {
		marginTop: 20,
	},
	participantsTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#343a40',
		marginBottom: 10,
	},
	participantRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 5,
	},
	participantText: {
		fontSize: 16,
		color: '#495057',
	},
	participantStatus: {
		fontSize: 18,
		marginRight: 10,
	},
});

export default DetallesEvento;
