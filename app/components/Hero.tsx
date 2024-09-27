"use client"; // Client-side rendering for real-time updates

import { useEffect, useState } from "react";
import Image from "next/image";
import { client, urlFor } from "../lib/sanity";
import Link from "next/link";

// Define the expected type of the hero image data
type ImageRef = {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
};

type HeroImage = {
  _id: string;
  image1: ImageRef;
  image2: ImageRef;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: string;
};

// Initial GROQ query to fetch data
const query = "*[_type == 'heroImage'][0]";

export default function Hero() {
  const [data, setData] = useState<HeroImage | null>(null); // State to hold the hero image data

  // Fetch the data initially and listen for real-time updates
  useEffect(() => {
    // Fetch the initial data
    client.fetch(query).then((fetchedData) => {
      setData(fetchedData);
    });

    // Listen for real-time updates to the data
    const subscription = client.listen(query).subscribe((update) => {
      if (update.result) {
        setData(update.result as HeroImage); // Cast to HeroImage type
      }
    });

    // Clean up the subscription when the component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!data) {
    return <p>Loading...</p>; // Display loading state while data is being fetched
  }

  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between md:mb-16">
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
            Top Fashion for a top price!
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
            We sell only the most exclusive and high-quality products for you. We are the best so come and shop with us.
          </p>
        </div>

        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg h-[40vw] w-[30vw] bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
            <Image
              src={urlFor(data.image1).url()}
              alt="GreatPhoto"
              className="h-full w-full object-cover object-center"
              width={500}
              height={300}
              priority
            />
          </div>
          <div className="overflow-hidden h-[40vw] w-[30vw] rounded-lg bg-gray-100 shadow-lg">
            <Image
              src={urlFor(data.image2).url()}
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
          <Link href="/Men" className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200">Men</Link>
          <Link href="/Women" className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200">Women</Link>
          <Link href="/Teens" className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200">Teens</Link>
        </div>
      </div>
    </section>
  );
}
