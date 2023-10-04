import React, { useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import {
  listarItensDoUsuario,
  verificarPalavraExistente,
} from "../../../services/firebase/databaseService";
import RenderItem from "../../components/renderItem/renderItem";
import { useFocusEffect } from "@react-navigation/native";
import { getInfoUser } from "../../../services/firebase/authService";
import { WordModal } from "../../components/Modal";

const Favorites: React.FC = () => {
  const [data, setData] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setFetching] = useState(false);
  const [isLike, setLike] = useState(false);
  const [open, setOpen] = useState(false);
  const [word, setWord] = useState("");

  const fetchItems = async () => {
    const userInfo = await getInfoUser();
    const item = await listarItensDoUsuario(userInfo.user.uid, "favorites");
    if (item) setData(item);
    setFetching(false);
  };
  useFocusEffect(
    React.useCallback(() => {
      setFetching(true);
      fetchItems();
    }, [])
  );

  const openModal = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleEndReached = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleOpen = async (item: string) => {
    setWord(item);
    const infoUser = await getInfoUser();
    const check = await verificarPalavraExistente(
      infoUser.user.uid,
      item,
      "favorites"
    );
    setLike(check);
    openModal();
  };

  return (
    <View style={styles.container}>
      {isFetching && <ActivityIndicator size={"large"} />}

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <RenderItem item={item} onPress={handleOpen} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
      <WordModal
        onClose={onClose}
        isVisible={open}
        word={word}
        onNext={() => true}
        onPrevious={() => true}
        isLike={isLike}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Favorites;
