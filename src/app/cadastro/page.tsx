import { LeadForm } from "@/components/forms/LeadForm";
import { CadastroSection } from "@/components/sections/Cadastro";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default function CadastroPage() {
  return (
    <>

      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#F4F4F4]">
        <div className="w-full max-w-7xl flex items-start mb-6">
          <Link href="/" className="flex items-center gap-2 text-[#1d491d] hover:text-[var(--color-primary)] text-base font-semibold transition ml-2 mb-4">
            <IoArrowBack className="w-6 h-6" />
            Voltar para a Home
          </Link>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-7xl">
          <CadastroSection />
          <LeadForm />
        </div>
      </main>

      <footer className="w-full py-5 bg-black text-center rounded-t-[50px]">
        <div className="flex justify-end mr-10">
          <p className="text-[#F4F4F4]">&copy; {new Date().getFullYear()} Green Energy. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
