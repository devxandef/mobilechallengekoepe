import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { words as w } from "../../../data/database/words";
import { WordModal } from "../../components/Modal";
import {
  criarItem,
  verificarPalavraExistente,
  excludByWord,
} from "../../../services/firebase/databaseService";
import RenderItem from "../../components/renderItem/renderItem";
import { getInfoUser } from "../../../services/firebase/authService";

const PAGE_SIZE = 20;

const words: string[] = w;

const Home: React.FC = () => {
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [dataWords, setData] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [word, setWord] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isLike, setLike] = useState<boolean>(false);

  const onClose = () => setOpenModal(false);
  const onOpenModal = () => setOpenModal(true);

  const loadMoreData = useCallback(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = currentPage * PAGE_SIZE;
    const newData = words.slice(start, end);
    setData([...dataWords, ...newData]);
    setIsLoadingData(false);
  }, [currentPage, dataWords]);

  useEffect(() => {
    loadMoreData();
  }, [currentPage]);

  const handleEndReached = () => {
    setIsLoadingData(true);
    setCurrentPage(currentPage + 1);
  };

  const handleOpen = useCallback(async (item: string) => {
    const infoUser = await getInfoUser();
    criarItem(infoUser.user.uid, { word: item }, "history");
    setWord(item);
    const check = await verificarPalavraExistente(
      infoUser.user.uid,
      item,
      "favorites"
    );
    setLike(check);
    onOpenModal();
  }, []);

  const handleChangeLike = async () => {
    const infoUser = await getInfoUser();
    if (isLike) {
      await excludByWord(infoUser.user.uid, word, "favorites");
      setLike(false);
      Toast.show({
        type: "info",
        text1: "Palavra removida dos favoritos!",
        position: "bottom",
      });
    } else {
      criarItem(infoUser.user.uid, { word: word }, "favorites");
      setLike(true);
      Toast.show({
        type: "info",
        text1: "Palavra adicionada aos favoritos!",
        position: "bottom",
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dataWords}
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
        isVisible={openModal}
        word={word}
        isLike={isLike}
        setLike={handleChangeLike}
      />
      {isLoadingData && <ActivityIndicator size="large" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Home;
