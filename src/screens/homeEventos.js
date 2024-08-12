import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import EventosService from "../../src/services/eventosService.js";

const EventoItem = ({ evento, onPress }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <Image source={evento.img} style={styles.imagen} />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{evento.name}</Text>
      <Text style={styles.description}>{evento.description}</Text>
      <Text style={styles.start_date}>{evento.start_date}</Text>
    </View>
  </TouchableOpacity>
);

const EventosHome = ({ navigation }) => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const eventosService = new EventosService();
    const fetchEventos = eventosService.getAll();
    setEventos(fetchEventos);
  }, []);


  return (
    <View style={styles.container}>
      <FlatList
        data={eventos}
        renderItem={({ item }) => (
          <EventoItem
            evento={item}
            onPress={() => navigation.navigate('Detalle', { evento: item })}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  flatListContent: {
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  imagen: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  start_date: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
});

export default EventosHome;
