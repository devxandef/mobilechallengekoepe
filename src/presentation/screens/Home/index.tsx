import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { words as w } from "../../../data/database/words";

const PAGE_SIZE = 20;

const words: string[] = w;

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const renderItem = ({ item }: { item: string }) => {
  const cardColor = getRandomColor();
  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={() => console.log("ok")}>
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={styles.text}>{item}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Home: React.FC = () => {
  const [data, setData] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const loadMoreData = useCallback(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = currentPage * PAGE_SIZE;
    const newData = words.slice(start, end);
    setData([...data, ...newData]);
  }, [currentPage, data]);

  useEffect(() => {
    loadMoreData();
  }, [currentPage]);

  const handleEndReached = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});

export default Home;
