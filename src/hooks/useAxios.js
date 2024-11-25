import { useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const apiBaseUrl = 'yuke.ddns.net';
const apiPort = '4000';

const axiosInstance = axios.create({
	baseURL: `http://${apiBaseUrl}:${apiPort}/api/dai`,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

const useAxios = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const makeRequest = async (method, url, body = null) => {
		setLoading(true);
		setError(null);
		const token = await SecureStore.getItemAsync('token');
		try {
			const response = await axiosInstance({
				method,
				url,
				data: body,
				headers: {
					...axiosInstance.defaults.headers,
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (e) {
			setError(error ? error : 'Error deconocido');
			throw e;
		} finally {
			setLoading(false);
		}
	};

	return { makeRequest, loading, error };
};

export default useAxios;
