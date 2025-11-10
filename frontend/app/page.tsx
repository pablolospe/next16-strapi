import { getStrapiData } from "@/lib/strapi";
import Image from "next/image";

export default async function Home() {

  const strapiData = await getStrapiData('/api/home-page');
  const { title, description } = strapiData?.data
  

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <h1>{title}</h1>
    <p>{description}</p>
    </div>
  );
}
