import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Header.css";

interface HeaderProps {
    onSearch?: (searchTerm: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch?.(value); // Busca em tempo real
    };

    const handleSearchSubmit = (e: React.FormEvent) => { 
        e.preventDefault();
        onSearch?.(searchTerm);
    }

    return (
        <header className="header">
            <h1 className="header-title">User List App</h1>
            <form className="search-form" onSubmit={handleSearchSubmit}>
                <div className="search-container">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Buscar usuários..."
                        className="search-input"
                    />
                    <button type="submit" className="search-button">
                        <FaSearch />
                    </button>
                </div>
            </form>
        </header>
    );
}