/**
 * Componente principal da aplicação User List App
 *
 * Gerencia o estado global da aplicação incluindo:
 * - Termo de busca para filtrar usuários
 * - Usuário selecionado para exibição no modal
 * - Coordena a comunicação entre Header, UserTable e UserModal
 */
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import UserTable from "./components/UserTable";
import UserModal from "./components/UserModal";
import type { User } from "./types/User";
import Footer from "./components/Footer";

function App() {
    // Estado para controlar o termo de busca digitado no Header
    const [searchTerm, setSearchTerm] = useState("");

    // Estado para controlar qual usuário está selecionado (null = modal fechado)
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    /**
     * Função callback para atualizar o termo de busca
     * Chamada pelo componente Header quando o usuário digita no campo de busca
     */
    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    };

    /**
     * Função callback para selecionar um usuário
     * Chamada pelo componente UserTable quando o usuário clica em uma linha
     */
    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
    };

    /**
     * Função callback para fechar o modal
     * Chamada pelo componente UserModal quando o usuário clica em fechar
     */
    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    return (
        <div className="app">
            {/* Componente de cabeçalho com campo de busca */}
            <Header onSearch={handleSearch} />

            {/* Área principal contendo a tabela de usuários */}
            <main className="main-content">
                <UserTable
                    searchTerm={searchTerm}
                    onUserSelect={handleUserSelect}
                />
            </main>

            {/* Modal condicional - só aparece quando há um usuário selecionado */}
            {selectedUser && (
                <UserModal user={selectedUser} onClose={handleCloseModal} />
            )}

            {/* Componente de rodapé */}
            <Footer />
        </div>
    );
}

export default App;
