import Image from "next/image";
import Hero from "./components/Hero";
import Newest from "./components/Newest";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
// revalidatePath('/')

export default function Home() {
  return (
   <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <Hero />
      <Newest />
   </div>
  );
}
