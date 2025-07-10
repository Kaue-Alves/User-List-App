import { useState, useEffect } from "react";
import { getUsers } from "../service/user.service";
import type { User } from "../types/User";
import "./UserTable.css";

interface UserTableProps {
    searchTerm?: string;
    onUserSelect?: (user: User) => void;
}

export default function UserTable({ searchTerm = "", onUserSelect }: UserTableProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const userData = await getUsers();
                setUsers(userData);
                setFilteredUsers(userData);
            } catch (error) {
                console.error("Erro ao carregar usuários:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = users.filter(
                (user) =>
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.address.city.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    }, [searchTerm, users]);

    const handleUserClick = (user: User) => {
        onUserSelect?.(user);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Carregando usuários...</p>
            </div>
        );
    }

    return (
        <div className="user-table-container">
            <div className="table-card">
                <div className="table-header">
                    <h2 className="table-title">
                        Lista de Usuários ({filteredUsers.length})
                    </h2>
                </div>

                <div className="table-wrapper">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Cidade</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="user-row">
                                        <td>
                                            <div className="user-name">
                                                {user.name}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-email">
                                                {user.email}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-city">
                                                {user.address.city}
                                            </div>
                                        </td>
                                        <td>
                                            <button
                                                className="view-details-btn"
                                                onClick={() => handleUserClick(user)}
                                            >
                                                Ver Detalhes
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="no-users">
                                        {searchTerm
                                            ? `Nenhum usuário encontrado para "${searchTerm}"`
                                            : "Nenhum usuário encontrado"}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}