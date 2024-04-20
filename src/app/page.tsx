import { ModeToggle } from "@/components/themeToggle";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <header className=" w-full  flex justify-end items-center py-2  px-24 space-x-16 ">
      <ModeToggle />
      <h1>Delay Setting</h1>
    </header>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
    </main>
    </>
  );
}
