"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { client } from "../lib/sanity";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

// Define the expected type of the product data
type Product = {
    _id: string;
    imageUrl: string;
    price: number | null; // Allow price to be null
    slug: string;
    categoryName: string;
    name: string;
}

// Initial GROQ query to fetch data
const query = "*[_type == 'product'][0...4]{ _id, price, name, 'slug': slug.current, 'categoryName': category->name, 'imageUrl': images[0].asset->url }";

export default function Newest() {
    const [data, setData] = useState<Product[] | null>(null); // State to hold an array of products

    // Fetch the data initially and listen for real-time updates
    useEffect(() => {
        // Fetch the initial data
        client.fetch(query).then((fetchedData) => {
            setData(fetchedData);
        });

        // Listen for real-time updates to the data
        const subscription = client.listen(query).subscribe((update) => {
            if (update.result && Array.isArray(update.result)) {
                setData(update.result as Product[]); // Ensure we're dealing with an array of Product type
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
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Newest Products</h2>
                    <Link className="text-primary flex items-center gap-x-1" href="/all">See All{" "}<span><ArrowRight /></span></Link>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {data.map((product) => (
                        <div key={product._id} className="group relative">
                            <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                                <Image src={product.imageUrl} alt="Product image" className="w-full h-full object-cover object-center lg:h-full lg:w-full" width={300} height={300} />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <Link href={`/product/${product.slug}`}>{product.name.split(' ').slice(0, 6).join(' ') + (product.name.split(' ').length > 6 ? '...' : '')}</Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.categoryName}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">${product.price !== null ? product.price : "N/A"}</p> {/* Display N/A if price is null */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
