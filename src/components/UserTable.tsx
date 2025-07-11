/**
 * Componente UserTable - Tabela de exibição dos usuários
 *
 * Responsável por:
 * - Carregar e exibir lista de usuários
 * - Filtrar usuários baseado no termo de busca
 * - Gerenciar estados de loading e erro
 * - Permitir seleção de usuários para visualização detalhada
 */
import { useState, useEffect } from "react";
import { getUsers } from "../service/user.service";
import type { User } from "../types/User";
import "./UserTable.css";

// Interface que define as props esperadas pelo componente
interface UserTableProps {
    searchTerm?: string; // Termo de busca para filtrar usuários
    onUserSelect?: (user: User) => void; // Callback para quando um usuário é selecionado
}

export default function UserTable({
    searchTerm = "",
    onUserSelect,
}: UserTableProps) {
    // Estado para armazenar todos os usuários carregados
    const [users, setUsers] = useState<User[]>([]);

    // Estado para controlar o carregamento dos dados
    const [loading, setLoading] = useState(true);

    // Estado para armazenar usuários filtrados pela busca
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    /**
     * Effect para carregar usuários na inicialização do componente
     * Executa apenas uma vez quando o componente é montado
     */
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                // Chama o serviço para buscar dados dos usuários
                const userData = await getUsers();
                setUsers(userData);
                setFilteredUsers(userData); // Inicialmente, usuários filtrados = todos os usuários
            } catch (error) {
                console.error("Erro ao carregar usuários:", error);
            } finally {
                setLoading(false); // Para o loading independente de sucesso ou erro
            }
        };

        fetchUsers();
    }, []);

    /**
     * Effect para filtrar usuários baseado no termo de busca
     * Executa sempre que searchTerm ou users mudarem
     */
    useEffect(() => {
        if (searchTerm) {
            // Filtra usuários que contenham o termo de busca em qualquer um dos campos
            const filtered = users.filter(
                (user) =>
                    user.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    user.email
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    user.company.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    user.address.city
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            // Se não há termo de busca, mostra todos os usuários
            setFilteredUsers(users);
        }
    }, [searchTerm, users]);

    /**
     * Função para lidar com clique em uma linha da tabela
     * Chama a função callback do componente pai para abrir o modal
     */
    const handleUserClick = (user: User) => {
        onUserSelect?.(user); // Chama a função se ela existir
    };

    // Renderização condicional para estado de carregamento
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
                {/* Cabeçalho da tabela com contador de usuários */}
                <div className="table-header">
                    <h2 className="table-title">
                        Lista de Usuários ({filteredUsers.length})
                    </h2>
                </div>

                {/* Container com scroll para a tabela */}
                <div className="table-wrapper">
                    <table className="user-table">
                        {/* Cabeçalho da tabela */}
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Cidade</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        {/* Corpo da tabela */}
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                // Mapeia e renderiza cada usuário filtrado
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
                                            {/* Botão para abrir o modal com detalhes do usuário */}
                                            <button
                                                className="view-details-btn"
                                                onClick={() =>
                                                    handleUserClick(user)
                                                }
                                            >
                                                Ver Detalhes
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                // Linha exibida quando não há usuários para mostrar
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
