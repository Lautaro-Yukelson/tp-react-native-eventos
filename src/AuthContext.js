import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import useAxios from './hooks/useAxios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const { makeRequest } = useAxios();

	useEffect(() => {
		const checkAuth = async () => {
			const token = await SecureStore.getItemAsync('token');
			if (token) {
				const decodedUser = jwtDecode(token);
				decodedUser.profilePicture = `https://eu.ui-avatars.com/api?name=${decodedUser.first_name}+${decodedUser.last_name}&background=000&color=fff`;
				setUser(decodedUser);
			}
		};
		checkAuth();
	}, [isAuthenticated]);

	const login = async (username, password) => {
		try {
			const response = await makeRequest('post', '/user/login', {
				username,
				password,
			});
			if (response.success) {
				await SecureStore.setItemAsync('token', response.token);
				const decodedUser = jwtDecode(response.token);
				decodedUser.profilePicture = `https://eu.ui-avatars.com/api?name=${decodedUser.first_name}+${decodedUser.last_name}&background=000&color=fff`;
				setUser(decodedUser);
				setIsAuthenticated(true);
				return response;
			}
		} catch (error) {
			console.error('Fetch API Error');
			console.error(error);
			return error;
		}
	};

	const register = async (first_name, last_name, username, password) => {
		try {
			const response = await makeRequest('post', '/user/register', {
				first_name,
				last_name,
				username,
				password,
			});
			if (response.success) {
				return response;
			}
		} catch (error) {
			console.error('Fetch API Error');
			console.error(error);
			return error;
		}
	};

	const logout = async () => {
		await SecureStore.deleteItemAsync('token');
		setUser(null);
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				user,
				login,
				register,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
