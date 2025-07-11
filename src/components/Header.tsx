/**
 * Componente Header - Cabeçalho da aplicação
 *
 * Responsável por:
 * - Exibir o título da aplicação
 * - Fornecer campo de busca para filtrar usuários
 * - Comunicar mudanças de busca para o componente pai via callback
 */
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Header.css";

// Interface que define as props esperadas pelo componente
interface HeaderProps {
    onSearch?: (searchTerm: string) => void; // Função callback opcional para notificar mudanças na busca
}

export default function Header({ onSearch }: HeaderProps) {
    // Estado local para controlar o valor do campo de busca
    const [searchTerm, setSearchTerm] = useState("");

    /**
     * Manipula mudanças no campo de busca
     * Atualiza o estado local e notifica o componente pai em tempo real
     */
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch?.(value); // Chama a função callback se ela existir (busca em tempo real)
    };

    /**
     * Manipula o submit do formulário de busca
     * Previne o comportamento padrão e executa a busca
     */
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Previne o reload da página
        onSearch?.(searchTerm); // Executa a busca com o termo atual
    };

    return (
        <header className="header">
            {/* Título principal da aplicação */}
            <h1 className="header-title">User List App</h1>

            {/* Formulário de busca */}
            <form className="search-form" onSubmit={handleSearchSubmit}>
                <div className="search-container">
                    {/* Campo de input para digitação da busca */}
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Buscar usuários..."
                        className="search-input"
                    />
                    {/* Botão de submit com ícone de lupa */}
                    <button type="submit" className="search-button">
                        <FaSearch />
                    </button>
                </div>
            </form>
        </header>
    );
}
