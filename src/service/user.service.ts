import axios from "axios";
import type { User } from "../types/User";

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data as User[];
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return [];
    }
}