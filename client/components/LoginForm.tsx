"use client"

import { useRouter } from "next/navigation"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type FormValues = z.infer<typeof formSchema>

export default function LoginForm() {
    const [role, setRole] = useState<"customer" | "seller">("customer")
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
    const router = useRouter()
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        email: "",
        password: "",
        },
    })

    async function onSubmit(data: FormValues) {
        try {
            const response = await axios.post(`${baseURL}/api/user/login`, data)
            if (response.data.payload.user.role === role) {
                router.push("/customer")
            } else {
                router.push("/seller")
            }
        } catch (error) {
            const errorMessage = axios.isAxiosError(error) ? error.response?.data?.error : (error as Error).message
            console.error("Login error:", errorMessage)
        }
    }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Sign in to your dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="customer"
          className="mb-6"
          onValueChange={(value) => setRole(value as "customer" | "seller")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="seller">Seller</TabsTrigger>
          </TabsList>
        </Tabs>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="customer@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
              Sign in as {role === "customer" ? "Customer" : "Seller"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center text-center text-sm text-gray-600">
          <div>
            Demo credentials for <strong>{role}</strong>
            {role === "customer" ? (
              <div>Email: tahia@example.com | Password: tahia4747</div>
            ) : (
              <div>Email: seller@example.com | Password: seller123</div>
            )}
          </div>
      </CardFooter>
    </Card>
  )
}
