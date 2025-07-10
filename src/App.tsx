import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import UserTable from "./components/UserTable";

function App() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    };

    return (
        <div className="h-screen w-full flex flex-col">
            <Header onSearch={handleSearch} />
            <main className="w-full flex-1 bg-gray-50 p-4 overflow-auto">
                <UserTable searchTerm={searchTerm} />
            </main>
        </div>
    );
}

export default App;
