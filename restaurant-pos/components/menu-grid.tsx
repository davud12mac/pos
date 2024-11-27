import Image from "next/image"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { MenuItem } from "@/types/pos-types"
import { supabase, checkSupabaseConnection } from "@/lib/supabase"
import { toast } from "@/components/ui/use-toast"

interface MenuGridProps {
  onAddToCart: (item: MenuItem) => void;
}

export function MenuGrid({ onAddToCart }: MenuGridProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    if (!checkSupabaseConnection()) {
      toast({
        title: "Warning",
        description: "Supabase connection not available. Please check your environment variables.",
        variant: "destructive",
      })
      return
    }
    console.log("Fetching products for menu grid...");
    const { data, error } = await supabase
      .from('products')
      .select('*')
    if (error) {
      console.error("Error fetching products for menu grid:", error);
      toast({
        title: "Error",
        description: "Failed to fetch products: " + error.message,
        variant: "destructive",
      })
    } else {
      console.log("Products fetched successfully for menu grid:", data);
      setMenuItems(data || [])
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {menuItems.map((item) => (
        <Card 
          key={item.id} 
          className="overflow-hidden cursor-pointer transition-transform hover:scale-105"
          onClick={() => onAddToCart(item)}
        >
          <div className="aspect-[4/3] relative">
            <Image
              src={item.image || '/placeholder.svg'}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-3">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-orange-500">$ {item.price.toFixed(2)}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}

