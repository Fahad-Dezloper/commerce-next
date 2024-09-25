import Image from "next/image";
import Link from "next/link";
import { sanityFetch, urlFor } from "../lib/sanity"; // Import the helper

// Define the query for the hero image (this can vary depending on your Sanity schema)
const heroImageQuery = "*[_type == 'heroImage'][0]";

async function getData() {
  // Use sanityFetch to get the data with cache control
  const data = await sanityFetch({
    query: heroImageQuery,
    tags: ["heroImage"], // Add relevant tags for caching
  });

  return data;
}

export const dynamic = "force-dynamic"; // Use force-dynamic for non-cached builds

export default async function Hero() {
  const data = await getData();

  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between md:mb-16">
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
            Top Fashion for a top price!
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
            We sell only the most exclusive and high-quality products for you. Come and shop with us.
          </p>
        </div>

        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg h-[40vw] w-[30vw] bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
            <Image
              src={urlFor(data.image1).url()} // Fetch image1 from Sanity
              alt="GreatPhoto"
              className="h-full w-full object-cover object-center"
              width={500}
              height={300}
              priority
            />
          </div>
          <div className="overflow-hidden h-[40vw] w-[30vw] rounded-lg bg-gray-100 shadow-lg">
            <Image
              src={urlFor(data.image2).url()} // Fetch image2 from Sanity
              alt="GreatPhoto"
              className="h-full w-full object-cover object-center"
              width={500}
              height={300}
              priority
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex h-12 w-64 divide-x overflow-hidden rounded-lg border">
          <Link href="/Men" className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200">
            Men
          </Link>
          <Link href="/Women" className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200">
            Women
          </Link>
          <Link href="/Teens" className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200">
            Teens
          </Link>
        </div>
      </div>
    </section>
  );
}
