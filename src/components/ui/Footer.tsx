import Link from "next/link";
import {
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#061121] text-white pt-12 pb-6 rounded-t-4xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col items-start">
            <div className="mb-4">
              <img src="/Logo-Solstice-Power.svg" alt="Logo Green Energy" style={{ width: '100%', height: '100%' }} />
            </div>
          </div>

          <div className="text-sm flex flex-col justify-between">
            <div>
              <h4 className="font-bold mb-2">CONTATO</h4>
              <p>contato@greenenergy.com.br</p>
              <Link href="https://wa.me/5515974066886">
                WhatsApp: +55 XX X XXXX-XXXX
              </Link>
            </div>
            <div className="mt-6">
              <h4 className="font-bold mb-2">ENDEREÇOS</h4>
              <p className="mb-2">
                São Paulo - SP
                <br />
                Av. Paulista - Bela Vista
              </p>
            </div>
          </div>

          <div className="text-sm break-words">
            <h4 className="font-bold mb-2">ATENDIMENTO</h4>
            <p>Seg. a Sex. | 9h às 20h</p>
            <p>Sábado | 9h às 20h</p>
            <p>Domingo | Fechado</p>
          </div>

          <div className="text-sm">
            <h4 className="font-bold mb-2">REDES SOCIAIS</h4>
            <div className="flex gap-4 mb-4">
              <FaInstagram className="w-5 h-5 hover:text-[#1d491dff]" />
              <FaWhatsapp className="w-5 h-5 hover:text-[#1d491dff]" />
              <FaYoutube className="w-5 h-5 hover:text-[#1d491dff]" />
              <FaLinkedinIn className="w-5 h-5 hover:text-[#1d491dff]" />
              <FaFacebookF className="w-5 h-5 hover:text-[#1d491dff]" />
            </div>

            {/*<h4 className="font-bold mb-2">PARCEIROS</h4>
            <div className="flex gap-4 items-center flex-wrap mb-2">
              <Image src="/concessionarias/Light.png" alt="Light" width={50} height={30} />
              <Image src="/concessionarias/Cemig.svg" alt="CEMIG" width={50} height={30} />
              <Image src="/concessionarias/NeoenergiaElektro.png" alt="Neoenergia Elektro" width={50} height={30} />
              <Image src="/concessionarias/Energisa.png" alt="Energisa" width={50} height={40} />
              <Image src="/concessionarias/Copel.png" alt="Copel" width={50} height={30} />
              <Image src="/concessionarias/CPFLPaulista.png" alt="CPFL Paulista" width={50} height={30} />
              <Image src="/concessionarias/CPFLPiratininga.png" alt="CPFL Piratininga" width={50} height={30} />
              <Image src="/concessionarias/Enel.png" alt="Enel" width={50} height={30} />
            </div>
            */}
          </div>
        </div>

        <div className="border-t border-[#1d491dff] my-6"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-2">
          <p>CNPJ: xx.xxx.xxx/xxxx-xx</p>
          <p>
            &copy; {new Date().getFullYear()} Green Energy. Todos os direitos
            reservados.
          </p>
          <p> Desenvolvido por <a href="https://verronebruna.vercel.app/" className="text-[#94C68A]">Bruna Verrone</a></p>
          <div className="flex gap-4">
            <a href="/politica-de-privacidade" className="text-[#94C68A]">
              Política de privacidade
            </a>
            |{" "}
            <a href="/politica-de-cookies" className="text-[#94C68A]">
              Política de Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
