import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import UserTable from "./components/UserTable";
import UserModal from "./components/UserModal";
import type { User } from "./types/User";

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    };

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    return (
        <div className="app">
            <Header onSearch={handleSearch} />
            <main className="main-content">
                <UserTable 
                    searchTerm={searchTerm} 
                    onUserSelect={handleUserSelect}
                />
            </main>
            {selectedUser && (
                <UserModal 
                    user={selectedUser} 
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default App;
