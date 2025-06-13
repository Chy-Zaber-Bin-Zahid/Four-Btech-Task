'use client'

import { useState, ReactNode } from "react"
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  User,
  LifeBuoy,
  Settings,
} from "lucide-react"

type MenuItem = {
  label: string
  icon: ReactNode
}

type SidebarItemProps = {
  icon: ReactNode
  label: string
  active?: boolean
  onClick: () => void
}

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("overview")

  const menuItems: MenuItem[] = [
    { label: "Overview", icon: <LayoutDashboard size={18} /> },
    { label: "My Orders", icon: <ShoppingBag size={18} /> },
    { label: "Wishlist", icon: <Heart size={18} /> },
    { label: "Profile", icon: <User size={18} /> },
    { label: "Support", icon: <LifeBuoy size={18} /> },
    { label: "Settings", icon: <Settings size={18} /> },
  ]

  return (
    <aside className="w-[180px] bg-white border-r border-gray-200 h-[calc(100vh-132px)] p-4">
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={activeTab === item.label.toLowerCase()}
            onClick={() => setActiveTab(item.label.toLowerCase())}
          />
        ))}
      </nav>
    </aside>
  )
}

function SidebarItem({ icon, label, active = false, onClick }: SidebarItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer ${
        active ? "bg-red-50 text-red-500" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  )
}
