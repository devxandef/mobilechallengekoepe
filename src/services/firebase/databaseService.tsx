import { DB } from "./firebaseService";

export const criarItem = async (
  userId: string,
  item: { word: string },
  collection: string
) => {
  try {
    const colecaoDoUsuario = DB.collection(`${collection}/${userId}/itens`);
    const itemExistente = await colecaoDoUsuario
      .where("word", "==", item.word)
      .get();

    if (itemExistente.empty) {
      await colecaoDoUsuario.add(item);
    }
  } catch (error) {
    console.error("Erro ao criar o item:", error);
  }
};

export const listarItensDoUsuario = async (
  userId: string,
  collection: string
) => {
  try {
    const colecaoDoUsuario = DB.collection(`${collection}/${userId}/itens`);
    const querySnapshot = await colecaoDoUsuario.get();
    const itens: any = [];

    querySnapshot.forEach((doc) => {
      itens.push(doc.data().word);
    });

    return itens;
  } catch (error) {
    console.error("Erro ao listar os itens:", error);
    return [];
  }
};

export const removerItem = async (
  userId: string,
  itemId: string,
  collection: string
) => {
  try {
    const documentoDoItem = DB.doc(`${collection}/${userId}/itens/${itemId}`);

    await documentoDoItem.delete();
  } catch (error) {
    console.error("Erro ao remover o item:", error);
  }
};

export const verificarPalavraExistente = async (
  userId: string,
  palavra: string,
  collection: string
) => {
  try {
    const colecaoDoUsuario = DB.collection(`${collection}/${userId}/itens`);

    const querySnapshot = await colecaoDoUsuario
      .where("word", "==", palavra)
      .get();

    if (querySnapshot.empty) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Erro ao verificar a palavra:", error);
    throw error;
  }
};

export const excludByWord = async (
  userId: string,
  palavra: string,
  collection: string
) => {
  try {
    const colecaoDoUsuario = DB.collection(`${collection}/${userId}/itens`);

    const querySnapshot = await colecaoDoUsuario
      .where("word", "==", palavra)
      .get();

    querySnapshot.forEach(async (doc) => {
      await colecaoDoUsuario.doc(doc.id).delete();
    });
  } catch (error) {
    console.error("Erro ao excluir o item:", error);
    throw error;
  }
};
