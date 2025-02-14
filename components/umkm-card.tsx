"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/lib/favorites-context"

interface UMKMCardProps {
  id: string
  name: string
  description: string
  image: string
  location: string
  category: string
  openingTime: string
  closingTime: string
}

export default function UMKMCard({
  id,
  name,
  description,
  image,
  location,
  category,
  openingTime,
  closingTime,
}: UMKMCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const favorite = isFavorite(id)

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFavorite(id)
    } else {
      addFavorite({ id, name, description, image, location, category, openingTime, closingTime })
    }
  }

  return (
    <motion.div
      className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-lg"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={name} layout="fill" objectFit="cover" />
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm font-semibold">
          {category}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-semibold">{name}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteToggle}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-5 w-5 ${favorite ? "fill-primary text-primary" : "text-muted-foreground"}`} />
          </Button>
        </div>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{location}</span>
          </div>
        </div>
        <div className="flex items-center text-muted-foreground mb-4">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-sm">
            {openingTime} - {closingTime}
          </span>
        </div>
        <Link href={`/umkm/${id}`}>
          <Button className="w-full">View Details</Button>
        </Link>
      </div>
    </motion.div>
  )
}

