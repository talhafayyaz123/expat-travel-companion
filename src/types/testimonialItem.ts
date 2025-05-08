import { StaticImageData } from "next/image"

export interface testimonialItem {
    id: number
    name: string
    occupation: string
    details: string[]
    location: string
    date: string
    rating: number
    image: StaticImageData
    quote: string
  }