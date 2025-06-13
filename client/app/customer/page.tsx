import { CustomerDashboard } from "@/components/customer/CustomerOverview"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/SideBar"

export default function CustomerDashboardPage() {
  return ( 
    <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex">
            <Sidebar />
            <CustomerDashboard />
        </div>
    </div>
  )
}
