import { Button } from "@/components/ui/button";
import { getHomePage } from "@/lib/strapi";


export default async function Home() {

  const strapiData = await getHomePage();
  // console.log(strapiData);
  const { title, description, sections } = strapiData
  const hero = sections.find((s: { __component: string; }) => s.__component === 'layout.hero-section');
  console.log(hero.link);


  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <header className="fixed top-0 w-full py-12 bg-slate-400 flex flex-col justify-center items-center">
        <h1 className="text-3xl">{title}</h1>
        <p>{description}</p>
      </header>
      <section >
        <main className="flex flex-1 flex-col items-center justify-center px-20 text-center">
          <h2 className="text-2xl mt-32 uppercase">{hero.heading}</h2>
          <img className="h-30" src={`http://localhost:1337${hero.image.url}`} alt="asdadsa" />
          <p className="mt-4 text-lg">
            {hero.subHeading}
          </p>
          <Button>
            <a href={hero.link.href}>{hero.link.label}</a>
          </Button>
        </main>
      </section>
    </div>
  );
}
