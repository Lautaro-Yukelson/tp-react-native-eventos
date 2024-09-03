import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import moment from "moment";
import "moment/locale/es";

const DetallesEvento = ({ route }) => {
  const { evento } = route.params;
  const formattedDate = moment(evento.start_date).format(
    "D [de] MMMM [de] YYYY"
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: evento.img || "https://via.placeholder.com/300" }}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imagen: {
    width: "100%",
    height: 300,
    borderRadius: 15,
    resizeMode: "cover",
    borderColor: "#e9ecef",
    borderWidth: 1,
  },
  detailsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#495057",
    marginBottom: 20,
    lineHeight: 24,
    textAlign: "justify",
  },
  infoContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    paddingTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#495057",
    marginBottom: 5,
  },
  start_date: {
    fontSize: 16,
    color: "#868e96",
  },
});

export default DetallesEvento;
