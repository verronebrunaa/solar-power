import Link from "next/link";
import Image from "next/image";

interface ActionButtonProps {
  label: string;
}

export default function ActionButton({ label }: Readonly<ActionButtonProps>) {
  return (
    <div className="flex flex-col md:flex-row gap-4 text-center">
      <Link href="/cadastro">
        <button className="mt-3 px-6 py-3 bg-[var(--color-primary)] text-black font-semibold rounded-full transition-all">
          {label}
          <Image src="/ArrowCircle.svg" alt="Seta para direita" width={30} height={20} className="inline ml-2" />
        </button>
      </Link>
    </div>
  );
}
