"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate authentication
    setTimeout(() => {
      // Mock authentication logic
      const validCredentials = [
        { email: "sarah.ahmed@iut-dhaka.edu", password: "password123", society: "IUTCS", role: "President" },
        { email: "fatima.khan@iut-dhaka.edu", password: "password123", society: "IUTCBS", role: "President" },
        { email: "nadia.rahman@iut-dhaka.edu", password: "password123", society: "IUTDS", role: "President" },
        { email: "rashida.begum@iut-dhaka.edu", password: "password123", society: "IUTSIKS", role: "President" },
        { email: "tanvir.hasan@iut-dhaka.edu", password: "password123", society: "IUTPS", role: "President" },
        { email: "admin@iut-dhaka.edu", password: "admin123", society: "ALL", role: "Admin" },
      ]

      const user = validCredentials.find((cred) => cred.email === email && cred.password === password)

      if (user) {
        // Store user info in localStorage (in real app, use proper auth)
        localStorage.setItem("user", JSON.stringify(user))
        router.push("/dashboard")
      } else {
        setError("Invalid email or password. Please check your credentials.")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Shield className="h-10 w-10 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">IUT Societies</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Executive Login</h2>
          <p className="text-gray-600">Sign in to manage your society</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to access the executive dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@iut-dhaka.edu"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Demo Credentials:</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p>
                  <strong>IUTCS President:</strong> sarah.ahmed@iut-dhaka.edu / password123
                </p>
                <p>
                  <strong>IUTCBS President:</strong> fatima.khan@iut-dhaka.edu / password123
                </p>
                <p>
                  <strong>IUTDS President:</strong> nadia.rahman@iut-dhaka.edu / password123
                </p>
                <p>
                  <strong>Admin:</strong> admin@iut-dhaka.edu / admin123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Not an executive member?{" "}
            <Link href="/" className="text-blue-600 hover:text-blue-500">
              Return to homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
