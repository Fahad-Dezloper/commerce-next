import  imageUrlBuilder  from "@sanity/image-url"
import { createClient } from "next-sanity"

export const client = createClient({
    projectId: 'cus6brc3',
    dataset: 'production',
    apiVersion: '2022-03-25',
    useCdn: true,
})


const builder = imageUrlBuilder(client)

export function urlFor(source: any){
    return builder.image(source)
}