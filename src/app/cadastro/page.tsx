import { LeadForm } from "@/components/forms/LeadForm";
import { CadastroSection } from "@/components/sections/Cadastro";

export default function CadastroPage() {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center p-4 bg-[#F4F4F4]">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-7xl">
          <CadastroSection />
          <LeadForm />
        </div>
      </main>

      <footer className="w-full py-5 bg-black text-center rounded-t-[50px]">
        <div className="flex justify-end mr-10">
          <p className="text-[#ddd]">&copy; {new Date().getFullYear()} Green Energy. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
