/**
 * Componente Footer - Rodapé da aplicação
 * 
 * Responsável por:
 * - Exibir informações de crédito do desenvolvedor
 * - Fornecer link para o GitHub do autor
 * - Manter consistência visual na parte inferior da página
 */
import "./Footer.css"
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
          <span>
              <p className="text-footer">
                Feito por <a href="https://github.com/Kaue-Alves" className="github-link" target="_blank">
                  Kauê Alves S. <FaGithub />
                </a>
              </p>
          </span>
    </footer>
  )
}
