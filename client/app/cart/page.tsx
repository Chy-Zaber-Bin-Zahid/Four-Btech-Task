import { Cart } from "@/components/customer/Cart"
import Navbar from "@/components/Navbar"

export default function CartPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
                <Cart />
            </div>
        </div>
  )
}
