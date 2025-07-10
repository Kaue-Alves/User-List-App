import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface HeaderProps {
    onSearch?: (searchTerm: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => { 
        e.preventDefault();
        onSearch?.(searchTerm);
    }

    return (
        <header
            className="w-full bg-blue-500 text-white flex flex-col sm:flex-row items-center justify-around"
            style={{ padding: "20px 20px" }}
        >
            <h1 className="text-xl sm:text-3xl font-bold">User List App</h1>
            <div
                className="h-10 flex items-center bg-white"
                style={{ padding: "0 0 0 16px" }}
            >
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Buscar usuários..."
                    className="h-full bg-white rounded-sm text-gray-800 focus:outline-none"
                />
                <div className="h-full w-10 flex items-center justify-center border-l border-gray-900 cursor-pointer hover:bg-gray-200" onClick={handleSearchSubmit}>
                    <FaSearch className="text-black" />
                </div>
            </div>
        </header>
    );
}
