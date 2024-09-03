import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import useAxios from "../hooks/useAxios";
import moment from "moment";
import "moment/locale/es";

const EventoItem = React.memo(({ evento, onPress }) => {
  const formattedDate = moment(evento.start_date).format(
    "D [de] MMMM [de] YYYY"
  );

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: evento.imageUrl || "https://via.placeholder.com/80" }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{evento.name}</Text>
        <Text style={styles.description}>{evento.description}</Text>
        <Text style={styles.startDate}>{formattedDate}</Text>
      </View>
    </TouchableOpacity>
  );
});

const Home = ({ navigation }) => {
  const [eventos, setEventos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { makeRequest } = useAxios();

  const fetchData = useCallback(
    async (pageNumber) => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await makeRequest("get", `/event?page=${pageNumber}`);
        if (response.success) {
          setEventos((prevEventos) => {
            const newEventos = response.response;
            const eventosMap = new Map();

            prevEventos.forEach((evento) => eventosMap.set(evento.id, evento));
            newEventos.forEach((evento) => eventosMap.set(evento.id, evento));

            return Array.from(eventosMap.values());
          });
        }
      } catch (err) {
        console.error("Fetch API Error:", err);
      } finally {
        setLoading(false);
      }
    },
    [loading, makeRequest]
  );

  useEffect(() => {
    fetchData(page);
  }, [fetchData, page]);

  const loadMore = useCallback(() => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  const renderEventoItem = useCallback(
    ({ item }) => (
      <EventoItem
        evento={item}
        onPress={() => navigation.navigate("DetallesEvento", { evento: item })}
      />
    ),
    [navigation]
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <View style={styles.container}>
      <FlatList
        data={eventos}
        renderItem={renderEventoItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.flatListContent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f9fa",
  },
  flatListContent: {
    width: "100%",
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
  },
  imageContainer: {
    marginRight: 15,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#343a40",
  },
  description: {
    fontSize: 14,
    color: "#495057",
    marginTop: 4,
  },
  startDate: {
    fontSize: 12,
    color: "#868e96",
    marginTop: 8,
  },
});

export default Home;
