/**
 * Arquivo principal de entrada da aplicação React
 *
 * Responsável por:
 * - Inicializar a aplicação React no DOM
 * - Envolver a aplicação em StrictMode para detecção de problemas
 * - Conectar o componente App ao elemento root do HTML
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Cria a raiz da aplicação React no elemento HTML com id 'root'
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        {/* Componente principal da aplicação */}
        <App />
    </StrictMode>
);
