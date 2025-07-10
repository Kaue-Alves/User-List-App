import axios from "axios";
import type { User } from "../types/User";

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        console.log(response.data);
        
        return response.data as User[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

