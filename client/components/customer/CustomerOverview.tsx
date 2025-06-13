"use client"

import { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  ShoppingBag,
  Heart,
  Package,
  Ticket,
  Star,
  Tag,
} from "lucide-react"

export function CustomerDashboard() {
  return (
    <main className="w-full flex justify-center">
      <div className="flex-1 p-6 container">
          <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Hi, Alex <span className="text-2xl">👋</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">Last updated: Today, 10:30 AM</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Orders"
          value="24"
          icon={<Package className="h-5 w-5 text-blue-500" />}
          iconBg="bg-blue-100"
        />
        <StatsCard
          title="Wishlist Items"
          value="12"
          icon={<Heart className="h-5 w-5 text-rose-500" />}
          iconBg="bg-rose-100"
        />
        <StatsCard
          title="Pending Deliveries"
          value="3"
          icon={<ShoppingBag className="h-5 w-5 text-amber-500" />}
          iconBg="bg-amber-100"
        />
        <StatsCard
          title="Active Coupons"
          value="5"
          icon={<Ticket className="h-5 w-5 text-green-500" />}
          iconBg="bg-green-100"
        />
      </div>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

          <div className="space-y-4">
            <ActivityItem
              icon={<Package className="h-5 w-5 text-blue-500" />}
              iconBg="bg-blue-100"
              title="Order Delivered"
              description="Your order #ABC-1234 has been delivered"
              date="Today, 9:45 AM"
            />

            <ActivityItem
              icon={<Heart className="h-5 w-5 text-rose-500" />}
              iconBg="bg-rose-100"
              title="Added to Wishlist"
              description="You added Wireless Headphones to your wishlist"
              date="Yesterday, 4:30 PM"
            />

            <ActivityItem
              icon={<Package className="h-5 w-5 text-blue-500" />}
              iconBg="bg-blue-100"
              title="Order Shipped"
              description="Your order #ABC-7891 has been shipped"
              date="Yesterday, 11:20 AM"
            />

            <ActivityItem
              icon={<Star className="h-5 w-5 text-amber-500" />}
              iconBg="bg-amber-100"
              title="Review Posted"
              description="You posted a review for Smart Watch"
              date="May 20, 2023"
            />

            <ActivityItem
              icon={<Tag className="h-5 w-5 text-purple-500" />}
              iconBg="bg-purple-100"
              title="Coupon Applied"
              description="You used coupon 'SUMMER20' on your purchase"
              date="May 18, 2023"
            />
          </div>
        </CardContent>
      </Card>
      </div>
    </main>
  )
}

type StatsCardProps = {
  title: string
  value: string | number
  icon: ReactNode
  iconBg: string
}

function StatsCard({ title, value, icon, iconBg }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`${iconBg} p-2 rounded-md`}>{icon}</div>
      </CardContent>
    </Card>
  )
}

type ActivityItemProps = {
  icon: ReactNode
  iconBg: string
  title: string
  description: string
  date: string
}

function ActivityItem({ icon, iconBg, title, description, date }: ActivityItemProps) {
  return (
    <div className="flex gap-4">
      <div className={`${iconBg} p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{title}</h3>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  )
}
