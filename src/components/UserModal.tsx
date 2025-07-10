import { FaTimes, FaUser, FaEnvelope, FaPhone, FaBuilding, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import type { User } from "../types/User";
import "./UserModal.css";

interface UserModalProps {
    user: User;
    onClose: () => void;
}

export default function UserModal({ user, onClose }: UserModalProps) {
    
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Detalhes do Usuário</h2>
                    <button className="close-button" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="user-info-section">
                        <div className="info-item">
                            <div className="info-icon">
                                <FaUser />
                            </div>
                            <div className="info-content">
                                <label>Nome Completo</label>
                                <span>{user.name}</span>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <FaUser />
                            </div>
                            <div className="info-content">
                                <label>Nome de Usuário</label>
                                <span>{user.username}</span>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <FaEnvelope />
                            </div>
                            <div className="info-content">
                                <label>Email</label>
                                <span>{user.email}</span>
                            </div>
                        </div>

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
                            <p><strong>Rua:</strong> {user.address.street}, {user.address.suite}</p>
                            <p><strong>Cidade:</strong> {user.address.city}</p>
                            <p><strong>CEP:</strong> {user.address.zipcode}</p>
                            <p><strong>Coordenadas:</strong> {user.address.geo.lat}, {user.address.geo.lng}</p>
                        </div>
                    </div>

                    <div className="section-divider"></div>

                    <div className="company-section">
                        <h3 className="section-title">
                            <FaBuilding />
                            Empresa
                        </h3>
                        <div className="company-content">
                            <p><strong>Nome:</strong> {user.company.name}</p>
                            <p><strong>Slogan:</strong> {user.company.catchPhrase}</p>
                            <p><strong>Área de Atuação:</strong> {user.company.bs}</p>
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