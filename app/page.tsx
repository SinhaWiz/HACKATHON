import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Award, Code, BarChart3, Database, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const societies = [
  {
    id: "iutcs",
    name: "IUT Computer Society",
    acronym: "IUTCS",
    description: "Fostering innovation and excellence in computer science and technology among IUT students.",
    icon: Code,
    color: "bg-blue-500",
    upcomingEvents: 2,
    members: 150,
    executives: [
      { name: "Sarah Ahmed", position: "President", image: "/placeholder.svg?height=80&width=80" },
      { name: "Rafiq Hassan", position: "Vice President", image: "/placeholder.svg?height=80&width=80" },
    ],
  },
  {
    id: "iutcbs",
    name: "IUT Computer & Business Society",
    acronym: "IUTCBS",
    description: "Bridging the gap between technology and business for future entrepreneurs and leaders.",
    icon: BarChart3,
    color: "bg-green-500",
    upcomingEvents: 1,
    members: 120,
    executives: [
      { name: "Fatima Khan", position: "President", image: "/placeholder.svg?height=80&width=80" },
      { name: "Omar Ali", position: "Vice President", image: "/placeholder.svg?height=80&width=80" },
    ],
  },
  {
    id: "iutds",
    name: "IUT Debating Society",
    acronym: "IUTDS",
    description: "Developing critical thinking and public speaking skills through competitive debating.",
    icon: Users,
    color: "bg-purple-500",
    upcomingEvents: 3,
    members: 80,
    executives: [
      { name: "Nadia Rahman", position: "President", image: "/placeholder.svg?height=80&width=80" },
      { name: "Karim Uddin", position: "Vice President", image: "/placeholder.svg?height=80&width=80" },
    ],
  },
  {
    id: "iutsiks",
    name: "IUT Science & Innovation Knowledge Society",
    acronym: "IUTSIKS",
    description: "Promoting scientific research and innovation across all engineering disciplines.",
    icon: Award,
    color: "bg-orange-500",
    upcomingEvents: 1,
    members: 100,
    executives: [
      { name: "Dr. Aminul Islam", position: "Faculty Advisor", image: "/placeholder.svg?height=80&width=80" },
      { name: "Rashida Begum", position: "President", image: "/placeholder.svg?height=80&width=80" },
    ],
  },
  {
    id: "iutps",
    name: "IUT Programming Society",
    acronym: "IUTPS",
    description: "Enhancing programming skills and competitive coding abilities of IUT students.",
    icon: Database,
    color: "bg-red-500",
    upcomingEvents: 2,
    members: 200,
    executives: [
      { name: "Tanvir Hasan", position: "President", image: "/placeholder.svg?height=80&width=80" },
      { name: "Sabrina Akter", position: "Vice President", image: "/placeholder.svg?height=80&width=80" },
    ],
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">IUT Societies</span>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-blue-600 font-medium">
                Home
              </Link>
              <Link href="/societies" className="text-gray-600 hover:text-blue-600">
                Societies
              </Link>
              <Link href="/events" className="text-gray-600 hover:text-blue-600">
                Events
              </Link>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">IUT Student Societies</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join vibrant communities of like-minded students, participate in exciting events, and develop your skills
            across various disciplines at Islamic University of Technology.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/societies">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Explore Societies
              </Button>
            </Link>
            <Link href="/events">
              <Button size="lg" variant="outline">
                View Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Societies Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Societies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {societies.map((society) => (
              <Card key={society.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${society.color}`}>
                      <society.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{society.acronym}</CardTitle>
                      <CardDescription className="text-sm">{society.name}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{society.description}</p>

                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-gray-600">{society.upcomingEvents} events</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">{society.members} members</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-900 mb-2">Executive Panel</h4>
                    <div className="flex space-x-2">
                      {society.executives.slice(0, 2).map((exec, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Image
                            src={exec.image || "/placeholder.svg"}
                            alt={exec.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div>
                            <p className="text-xs font-medium">{exec.name}</p>
                            <p className="text-xs text-gray-500">{exec.position}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href={`/societies#${society.id}`}>
                    <Button className="w-full bg-transparent" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
              <div className="text-gray-600">Active Societies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">650+</div>
              <div className="text-gray-600">Total Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Events This Year</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">25+</div>
              <div className="text-gray-600">Awards Won</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-blue-400" />
            <span className="ml-2 text-xl font-bold">IUT Societies</span>
          </div>
          <p className="text-gray-400 mb-4">
            Islamic University of Technology - Fostering Excellence in Student Activities
          </p>
          <p className="text-gray-500 text-sm">© 2024 IUT Student Societies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
