import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { BASE_URL_WORDSAPI, API_TOKEN } from "@env";

interface WordDefinition {
  word: string;
  definition: string;
}

const fetchWordDefinition = async (word: string): Promise<WordDefinition> => {
  try {
    const response = await axios.get<WordDefinition>(
      `${BASE_URL_WORDSAPI}/words/${word}`,
      {
        headers: {
          "X-RapidAPI-Key": API_TOKEN,
          "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
        },
      }
    );
    return response.data;
  } catch (err) {
    const arr: any = [];
    return arr;
  }
};

export const useWordDefinition = (
  word: string
): UseQueryResult<WordDefinition> => {
  return useQuery(["wordDefinition", word], () => fetchWordDefinition(word), {
    enabled: !!word,
  });
};
