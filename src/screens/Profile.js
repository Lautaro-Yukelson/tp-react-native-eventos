import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useAuth } from "../AuthContext";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    logout();
    navigation.replace("Login");
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          No hay información de usuario disponible.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profilePicture }} style={styles.imagen} />
      <Text style={styles.username}>
        {user.first_name} {user.last_name}
      </Text>
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: "#666",
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ff4d4d",
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    fontSize: 18,
    color: "#666",
  },
});

export default Profile;
