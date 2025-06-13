"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Store, Trash2 } from "lucide-react"
import { useState } from "react"

// Types
interface CartItem {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  image: string
  store: string
}

interface StoreGroup {
  store: string
  items: CartItem[]
}

export function Cart() {
  // Initial cart data
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Wireless Noise-Cancelling Headphones",
      description: "Black | Premium Edition",
      price: 249.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      store: "Tech Gadget Store",
    },
    {
      id: "2",
      name: "Wireless Noise-Cancelling Headphones",
      description: "Black | Premium Edition",
      price: 249.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      store: "Tech Gadget Store",
    },
    {
      id: "3",
      name: "Wireless Noise-Cancelling Headphones",
      description: "Black | Premium Edition",
      price: 249.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      store: "Super Gadgets",
    },
    {
      id: "4",
      name: "Wireless Noise-Cancelling Headphones",
      description: "Black | Premium Edition",
      price: 249.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      store: "Super Gadgets",
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  // Group items by store
  const storeGroups: StoreGroup[] = cartItems.reduce((groups: StoreGroup[], item) => {
    const existingGroup = groups.find((group) => group.store === item.store)
    if (existingGroup) {
      existingGroup.items.push(item)
    } else {
      groups.push({ store: item.store, items: [item] })
    }
    return groups
  }, [])

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0
  const tax = 0
  const total = subtotal + shipping + tax

  // Handle quantity change
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Handle item removal
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
    setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
  }

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(cartItems.map((item) => item.id))
    } else {
      setSelectedItems([])
    }
  }

  // Handle individual selection
  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id])
    } else {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
    }
  }

  // Handle delete selected
  const deleteSelected = () => {
    setCartItems(cartItems.filter((item) => !selectedItems.includes(item.id)))
    setSelectedItems([])
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-1">Shopping Cart</h1>
      <p className="text-gray-500 mb-6">You have {cartItems.length} items in your cart.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Select All and Delete */}
          <div className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-md mb-4">
            <div className="flex items-center">
              <Checkbox
                id="select-all"
                checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                onCheckedChange={(checked: boolean) => handleSelectAll(!!checked)}
              />
              <label htmlFor="select-all" className="ml-2 text-sm">
                Select All ({cartItems.length} items)
              </label>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={deleteSelected}
              disabled={selectedItems.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>

          {/* Cart Items */}
          {storeGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-4 bg-white border border-gray-200 rounded-md overflow-hidden">
              {/* Store Header */}
              <div className="p-4 border-b border-gray-200 flex items-center">
                <Checkbox
                  id={`store-${groupIndex}`}
                  checked={group.items.every((item) => selectedItems.includes(item.id))}
                  onCheckedChange={(checked: boolean) => {
                    const itemIds = group.items.map((item) => item.id)
                    if (checked) {
                      setSelectedItems([...new Set([...selectedItems, ...itemIds])])
                    } else {
                      setSelectedItems(selectedItems.filter((id) => !itemIds.includes(id)))
                    }
                  }}
                />
                <label htmlFor={`store-${groupIndex}`} className="ml-2 flex items-center">
                  <Store className="h-4 w-4 mr-1" />
                  <span className="font-medium">{group.store}</span>
                </label>
              </div>

              {/* Store Items */}
              {group.items.map((item) => (
                <div key={item.id} className="p-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-start">
                    <Checkbox
                      id={`item-${item.id}`}
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked: boolean) => handleSelectItem(item.id, !!checked)}
                      className="mt-2"
                    />
                    <div className="ml-2 flex-1 flex">
                      <div className="bg-gray-100 rounded w-20 h-20 flex-shrink-0">
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="font-bold">${item.price.toFixed(2)}</div>
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-md"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                              className="w-12 h-8 mx-1 text-center p-0"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-md"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Enter a promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button className="bg-red-500 hover:bg-red-600">Apply</Button>
              </div>

              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Button className="w-full bg-red-500 hover:bg-red-600">Proceed to Checkout</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
