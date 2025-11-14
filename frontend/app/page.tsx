import { HeroSection } from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { getHomePage } from "@/lib/strapi";

export async function generateMetadata() {
  const strapiData = await getHomePage();
  return {
    title: strapiData?.title || 'Default Title',
    description: strapiData?.description || 'Default description',
  };
}

export default async function Home() {

  const strapiData = await getHomePage();
  console.log(strapiData);
  const { title, description, sections } = strapiData
  const hero = sections.find((s: { __component: string; }) => s.__component === 'layout.hero-section');
  // console.log(hero.link);


  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <header className="fixed top-0 w-full py-12 bg-slate-400 flex flex-col justify-center items-center">
        <h1 className="text-3xl">{title}</h1>
        <p>{description}</p>
      </header>
      <HeroSection data={hero}/>
    
    </div>
  );
}
