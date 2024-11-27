"use client"

import { useState, useEffect } from 'react'
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MenuItem } from "@/types/pos-types"
import { supabase, checkSupabaseConnection } from "@/lib/supabase"
import { toast } from "@/components/ui/use-toast"

export default function InventoryPage() {
  const [products, setProducts] = useState<MenuItem[]>([])
  const [newProduct, setNewProduct] = useState<Partial<MenuItem>>({
    name: '',
    price: 0,
    category: '',
    inventory: 0,
    image: '/placeholder.svg'
  })

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
    console.log("Fetching products...");
    const { data, error } = await supabase
      .from('products')
      .select('*')
    if (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "Failed to fetch products: " + error.message,
        variant: "destructive",
      })
    } else {
      console.log("Products fetched successfully:", data);
      setProducts(data || [])
    }
  }

  async function addProduct() {
    if (!checkSupabaseConnection()) {
      toast({
        title: "Warning",
        description: "Supabase connection not available. Please check your environment variables.",
        variant: "destructive",
      })
      return
    }
    
    console.log("Attempting to add product:", newProduct);

    const { data, error } = await supabase
      .from('products')
      .insert([newProduct])
      .select()

    if (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description: `Failed to add product: ${error.message}`,
        variant: "destructive",
      })
    } else if (data) {
      console.log("Product added successfully:", data[0]);
      toast({
        title: "Success",
        description: "Product added successfully",
      })
      setProducts([...products, data[0]])
      setNewProduct({
        name: '',
        price: 0,
        category: '',
        inventory: 0,
        image: '/placeholder.svg'
      })
    } else {
      console.error("No data returned after insert");
      toast({
        title: "Error",
        description: "Failed to add product: No data returned",
        variant: "destructive",
      })
    }
  }

  async function updateProduct(id: string, updates: Partial<MenuItem>) {
    if (!checkSupabaseConnection()) {
      toast({
        title: "Error",
        description: "Supabase connection not available",
        variant: "destructive",
      })
      return
    }
    const { error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
    if (error) {
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Product updated successfully",
      })
      fetchProducts()
    }
  }

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-5 gap-4">
          <Input
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
          />
          <Input
            placeholder="Price"
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
          />
          <Input
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
          />
          <Input
            placeholder="Inventory"
            type="number"
            value={newProduct.inventory}
            onChange={(e) => setNewProduct({...newProduct, inventory: parseInt(e.target.value)})}
          />
          <Button onClick={(e) => { e.preventDefault(); addProduct(); }}>Add Product</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.inventory}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateProduct(product.id, { inventory: product.inventory - 1 })}
                    >
                      -
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateProduct(product.id, { inventory: product.inventory + 1 })}
                    >
                      +
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}

