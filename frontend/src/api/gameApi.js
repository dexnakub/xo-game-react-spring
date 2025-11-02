import axios from "axios";

const BASE_URL = "http://localhost:8080/api/game-history";

export const saveGame = async (game) => axios.post(BASE_URL, game);
export const getAllGames = async () => axios.get(BASE_URL);
export const getGameById = async (id) => axios.get(`${BASE_URL}/${id}`);
