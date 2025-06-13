"use client";

import { Bell, ChevronDown, Globe, HelpCircle, Heart, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-red-500 font-bold text-2xl">Logo</h1>

          <div className="hidden md:flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">EN</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>

          <div className="hidden md:flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">Help</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="h-5 w-5 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              1
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Alex Johnson</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="relative flex-1">
          <div className="flex">
            <Button variant="outline" className="rounded-r-none border-r-0 px-3 flex gap-1">
              <span className="text-sm">Categories</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by product, brand, or keyword"
                className="pl-8 rounded-l-none h-10"
              />
            </div>
          </div>
        </div>
        <Button className="bg-red-500 hover:bg-red-600">Search</Button>

        <div className="flex items-center gap-4 ml-2">
          <Button variant="ghost" className="flex items-center gap-1">
            <Heart className="h-5 w-5" />
            <span className="hidden md:inline">Wishlist</span>
          </Button>

            <Link href="/cart" className="hidden md:inline text-inherit">
              <Button variant="ghost" className="flex items-center gap-1 hover:cursor-pointer">
                <ShoppingBag className="h-5 w-5" />
                <span>Cart</span>
              </Button>
            </Link>
        </div>
      </div>
    </header>
  );
}
