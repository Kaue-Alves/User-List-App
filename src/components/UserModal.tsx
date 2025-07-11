/**
 * Componente UserModal - Modal para exibição detalhada dos dados do usuário
 *
 * Responsável por:
 * - Exibir informações completas de um usuário selecionado
 * - Fornecer opções para fechar o modal (botão X, clique no backdrop, botão Fechar)
 * - Apresentar os dados de forma organizada e visualmente atrativa
 */
import {
    FaTimes,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaBuilding,
    FaMapMarkerAlt,
    FaGlobe,
} from "react-icons/fa";
import type { User } from "../types/User";
import "./UserModal.css";

// Interface que define as props esperadas pelo componente
interface UserModalProps {
    user: User; // Dados do usuário a serem exibidos
    onClose: () => void; // Função callback para fechar o modal
}

export default function UserModal({ user, onClose }: UserModalProps) {
    /**
     * Função para lidar com clique no backdrop (fundo escuro)
     * Fecha o modal apenas se o clique foi no backdrop, não no conteúdo
     */
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose(); // Chama a função de fechar apenas se clicou no backdrop
        }
    };

    return (
        // Backdrop com overlay escuro
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            {/* Conteúdo principal do modal */}
            <div className="modal-content">
                {/* Cabeçalho do modal com título e botão de fechar */}
                <div className="modal-header">
                    <h2 className="modal-title">Detalhes do Usuário</h2>
                    <button className="close-button" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Corpo do modal com todas as informações do usuário */}
                <div className="modal-body">
                    {/* Seção principal com informações pessoais */}
                    <div className="user-info-section">
                        {/* Item de informação: Nome completo */}
                        <div className="info-item">
                            <div className="info-icon">
                                <FaUser />
                            </div>
                            <div className="info-content">
                                <label>Nome Completo</label>
                                <span>{user.name}</span>
                            </div>
                        </div>

                        {/* Item de informação: Nome de usuário */}
                        <div className="info-item">
                            <div className="info-icon">
                                <FaUser />
                            </div>
                            <div className="info-content">
                                <label>Nome de Usuário</label>
                                <span>{user.username}</span>
                            </div>
                        </div>

                        {/* Item de informação: Email */}
                        <div className="info-item">
                            <div className="info-icon">
                                <FaEnvelope />
                            </div>
                            <div className="info-content">
                                <label>Email</label>
                                <span>{user.email}</span>
                            </div>
                        </div>

                        {/* Item de informação: Telefone */}
                        <div className="info-item">
                            <div className="info-icon">
                                <FaPhone />
                            </div>
                            <div className="info-content">
                                <label>Telefone</label>
                                <span>{user.phone}</span>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <FaGlobe />
                            </div>
                            <div className="info-content">
                                <label>Website</label>
                                <a
                                    href={`https://${user.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="website-link"
                                >
                                    {user.website}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="section-divider"></div>

                    <div className="address-section">
                        <h3 className="section-title">
                            <FaMapMarkerAlt />
                            Endereço
                        </h3>
                        <div className="address-content">
                            <p>
                                <strong>Rua:</strong> {user.address.street},{" "}
                                {user.address.suite}
                            </p>
                            <p>
                                <strong>Cidade:</strong> {user.address.city}
                            </p>
                            <p>
                                <strong>CEP:</strong> {user.address.zipcode}
                            </p>
                            <p>
                                <strong>Coordenadas:</strong>{" "}
                                {user.address.geo.lat}, {user.address.geo.lng}
                            </p>
                        </div>
                    </div>

                    <div className="section-divider"></div>

                    <div className="company-section">
                        <h3 className="section-title">
                            <FaBuilding />
                            Empresa
                        </h3>
                        <div className="company-content">
                            <p>
                                <strong>Nome:</strong> {user.company.name}
                            </p>
                            <p>
                                <strong>Slogan:</strong>{" "}
                                {user.company.catchPhrase}
                            </p>
                            <p>
                                <strong>Área de Atuação:</strong>{" "}
                                {user.company.bs}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="close-modal-btn" onClick={onClose}>
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}
