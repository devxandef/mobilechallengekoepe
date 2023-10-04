import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const RenderItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => onPress(item)}
    >
      <View style={styles.card}>
        <Text style={styles.text}>{item}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 10,
  },
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#6666",
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});

export default React.memo(RenderItem);
