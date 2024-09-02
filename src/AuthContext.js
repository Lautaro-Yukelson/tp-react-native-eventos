import React, { createContext, useState, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import useAxios from './hooks/useAxios.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const { makeRequest, loading, error } = useAxios();

	const login = async (username, password) => {
		try {
			const response = await makeRequest('post', '/user/login', {
				username,
				password,
			});
			if (response.success) {
				await SecureStore.setItemAsync('token', response.token);
				setIsAuthenticated(true);
				return response;
			}
		} catch (err) {
			console.log('Fetch API Error:', err);
			return error;
		}
	};
	const logout = () => {
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
