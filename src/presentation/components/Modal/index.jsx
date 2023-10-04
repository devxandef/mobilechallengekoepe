import React, { useState, useEffect, memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Button,
} from "react-native";
import Slider from "@react-native-community/slider";
import * as Speech from "expo-speech";
import { MaterialIcons } from "@expo/vector-icons";
import { useWordDefinition } from "../../../data/api";
import { getInfoUser } from "../../../services/firebase/authService";
import { verificarPalavraExistente } from "../../../services/firebase/databaseService";

const WordModal = ({
  isVisible,
  word,
  onClose,
  onNext,
  onPrevious,
  isLike,
  setLike = () => {},
}) => {
  const { data, isLoading, isError } = useWordDefinition(word);

  const [text, setText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      Speech.speak(text, {
        onDone: () => setIsPlaying(false),
        onStopped: () => setIsPlaying(false),
        onStarted: (e) => {
          const duration = e.durationMillis;
          setProgress(0);
          setInterval(() => {
            setProgress((prev) => prev + 1000);
          }, 1000);

          setTimeout(() => {
            Speech.stop();
            setIsPlaying(false);
          }, duration);
        },
      });
    }

    return () => {
      setProgress(0);
      Speech.stop();
    };
  }, [isPlaying, text]);

  const handlePlayPause = () => {
    setText(data?.word);
    setIsPlaying(!isPlaying);
  };

  const handleLike = async () => {
    const infoUser = await getInfoUser();
    const check = await verificarPalavraExistente(
      infoUser.user.uid,
      word,
      "favorites"
    );
    setLike(check);
  };

  if (isLoading) return <ActivityIndicator size={"large"} />;

  if (isError && typeof data !== "object") {
    return <Text>Erro ao carregar os dados!</Text>;
  }

  return (
    <Modal visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.contentChildren}>
            <Text>{data?.word}</Text>
            <Text>{data?.pronunciation?.all}</Text>
          </View>
          <View
            style={{
              alignItems: "flex-end",
              padding: 5,
            }}
          >
            <TouchableOpacity onPress={handleLike}>
              <MaterialIcons
                name={!isLike ? "favorite-border" : "favorite"}
                size={32}
                color="red"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Texto para reprodução:</Text>
            <Slider
              style={{ width: "80%", marginBottom: 20 }}
              minimumValue={0}
              maximumValue={text.length * 100}
              value={progress}
              disabled
            />
            <Button
              disabled={!Boolean(data?.word)}
              title={isPlaying ? "Pausar" : "Reproduzir"}
              onPress={handlePlayPause}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={onPrevious} style={styles.footerButton}>
            <Text style={styles.footerButtonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNext} style={styles.footerButton}>
            <Text style={styles.footerButtonText}>Próximo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    alignItems: "center",
  },
  content: {
    flex: 1,
    borderColor: "#d1d1d1",
    borderWidth: 1,
    backgroundColor: "#eee",
  },
  contentChildren: {
    backgroundColor: "#fff",
    margin: 10,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  footerButton: {
    paddingVertical: 10,
  },
  footerButtonText: {
    color: "blue",
    fontSize: 18,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  closeButtonText: {
    color: "black",
    fontSize: 25,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  wordText: {
    fontSize: 24,
    textAlign: "center",
  },
});

export { WordModal };
