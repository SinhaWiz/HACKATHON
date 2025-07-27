"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Mail, Phone, Code, BarChart3, Award, Database, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const societies = [
  {
    id: "iutcs",
    name: "IUT Computer Society",
    acronym: "IUTCS",
    description:
      "The IUT Computer Society is dedicated to fostering innovation and excellence in computer science and technology among IUT students. We organize workshops, coding competitions, tech talks, and networking events to help students stay updated with the latest technological trends.",
    icon: Code,
    color: "bg-blue-500",
    founded: "2015",
    members: 150,
    contact: {
      email: "iutcs@iut-dhaka.edu",
      phone: "+880-1234-567890",
    },
    executives: [
      {
        name: "Sarah Ahmed",
        position: "President",
        image: "/placeholder.svg?height=120&width=120",
        bio: "Final year CSE student passionate about AI and machine learning.",
      },
      {
        name: "Rafiq Hassan",
        position: "Vice President",
        image: "/placeholder.svg?height=120&width=120",
        bio: "Software engineering enthusiast with expertise in web development.",
      },
      {
        name: "Fatima Khatun",
        position: "General Secretary",
        image: "/placeholder.svg?height=120&width=120",
        bio: "Organizing events and managing society communications.",
      },
      {
        name: "Mahmud Rahman",
        position: "Treasurer",
        image: "/placeholder.svg?height=120&width=120",
        bio: "Managing finances and budget planning for society activities.",
      },
    ],
    upcomingEvents: [
      { title: "AI Workshop Series", date: "2024-02-15", type: "Workshop" },
      { title: "Coding Competition 2024", date: "2024-02-28", type: "Competition" },
    ],
    pastEvents: [
      { title: "Tech Talk: Future of Web Development", date: "2024-01-20", participants: 80 },
      { title: "Hackathon 2024", date: "2024-01-10", participants: 120 },
    ],
  },
  {
    id: "iutcbs",
    name: "IUT Computer & Business Society",
    acronym: "IUTCBS",
    description:
      "IUTCBS bridges the gap between technology and business, preparing students for entrepreneurship and leadership roles. We focus on business development, startup culture, and the intersection of technology with business strategy.",
    icon: BarChart3,
    color: "bg-green-500",
    founded: "2016",
    members: 120,
    contact: {
      email: "iutcbs@iut-dhaka.edu",
      phone: "+880-1234-567891",
    },
    executives: [
      {
        name: "Fatima Khan",
        position: "President",
        image: "/placeholder.svg?height=120&width=120",
        bio: "Business administration student with startup experience.",
      },
      {
        name: "Omar Ali",
        position: "Vice President",
        image: "/placeholder.svg?height=120&width=120",
        bio: "Technology entrepreneur and business strategy expert.",
      },
      {
        name: "Rashida Begum",
        position: "General Secretary",
        image: "/placeholder.svg?height=120&width=120",
        bio: "Event coordination and member engagement specialist.",
      },
    ],
    upcomingEvents: [{ title: "Startup Pitch Competition", date: "2024-03-05", type: "Competition" }],
    pastEvents: [
      { title: "Business Plan Workshop", date: "2024-01-25", participants: 60 },
      { title: "Entrepreneurship Seminar", date: "2024-01-15", participants: 90 },
    ],
  },
  {
    id: "iutds",
    name: "IUT Debating Society",
    acronym: "IUTDS",
    description:
      "The IUT Debating Society develops critical thinking and public speaking skills through competitive debating. We participate in national and international debate competitions while fostering intellectual discourse on campus.",
    icon: Users,
    color: "bg-purple-500",
    founded: "2014",
    members: 80,
    contact: {
      email: "iutds@iut-dhaka.edu",
      phone: "+880-1234-567892",
    },
    executives: [
      {
        name: "Nadia Rahman",
        position: "President",
        image: "/placeholder.svg?height=120&width=120",
        bio: "Champion debater with multiple national awards.",
      },
      {
        name: "Karim Uddin",
        position: "Vice President",
        image: "/placeholder.svg?height=120&width=120",
        bio: "Experienced in parliamentary and Asian debate formats.",
      },
      {
        name: "Sabina Yasmin",
        position: "Training Coordinator",
        image: "/placeholder.svg?height=120&width=120",
        bio: "Specializes in training new debaters and public speaking.",
      },
    ],
    upcomingEvents: [
      { title: "Inter-University Debate Championship", date: "2024-02-20", type: "Competition" },
      { title: "Public Speaking Workshop", date: "2024-03-01", type: "Workshop" },
      { title: "Parliamentary Debate Training", date: "2024-03-10", type: "Training" },
    ],
    pastEvents: [
      { title: "National Debate Competition", date: "2024-01-18", participants: 40 },
      { title: "Freshers' Debate Tournament", date: "2024-01-08", participants: 50 },
    ],
  },
  {
    id: "iutsiks",
    name: "IUT Society for Islamic Knowledge seekers",
    acronym: "IUTSIKS",
    description:
      "IUT SIKS aims to promote Islamic knowledge and values among students. We organize lectures, discussions, and community service activities to foster a deeper understanding of Islam and its teachings.",
    icon: Award,
    color: "bg-orange-500",
    founded: "2017",
    members: 100,
    contact: {
      email: "iutsiks@iut-dhaka.edu",
      phone: "+880-1234-567893",
    },
    executives: [
      {
        name: "Dr. Aminul Islam",
        position: "Faculty Advisor",
        image: "/placeholder.svg?height=120&width=120",
        bio: "Professor of Electrical Engineering, research in renewable energy.",
      },
      {
        name: "Rashida Begum",
        position: "President",
        image: "/placeholder.svg?height=120&width=120",
        bio: "PhD candidate in materials science and nanotechnology.",
      },
      {
        name: "Tanvir Ahmed",
        position: "Research Coordinator",
        image: "/placeholder.svg?height=120&width=120",
        bio: "Coordinating research projects and innovation initiatives.",
      },
    ],
    upcomingEvents: [{ title: "Research Symposium 2024", date: "2024-03-15", type: "Symposium" }],
    pastEvents: [
      { title: "Innovation Challenge", date: "2024-01-22", participants: 70 },
      { title: "Science Fair", date: "2024-01-12", participants: 100 },
    ],
  },
  {
    id: "iutps",
    name: "IUT Photographic Society",
    acronym: "IUTPS",
    description:
      "IUTPS is dedicated to promoting photography as an art form and a means of expression. We organize photo walks, exhibitions, and workshops to enhance the skills of our members and showcase their work.",
    icon: Database,
    color: "bg-red-500",
    founded: "2013",
    members: 200,
    contact: {
      email: "iutps@iut-dhaka.edu",
      phone: "+880-1234-567894",
    },
    executives: [
      {
        name: "Tanvir Hasan",
        position: "President",
        image: "/placeholder.svg?height=120&width=120",
        bio: "ACM ICPC World Finalist, competitive programming expert.",
      },
      {
        name: "Sabrina Akter",
        position: "Vice President",
        image: "/placeholder.svg?height=120&width=120",
        bio: "Algorithm specialist and contest organizer.",
      },
      {
        name: "Rafiul Islam",
        position: "Training Head",
        image: "/placeholder.svg?height=120&width=120",
        bio: "Conducts algorithm training sessions and workshops.",
      },
      {
        name: "Nasir Uddin",
        position: "Contest Coordinator",
        image: "/placeholder.svg?height=120&width=120",
        bio: "Organizes programming contests and manages platforms.",
      },
    ],
    upcomingEvents: [
      { title: "Weekly Programming Contest", date: "2024-02-18", type: "Contest" },
      { title: "Algorithm Workshop: Dynamic Programming", date: "2024-02-25", type: "Workshop" },
    ],
    pastEvents: [
      { title: "IUT Programming Contest 2024", date: "2024-01-28", participants: 150 },
      { title: "Data Structures Workshop", date: "2024-01-14", participants: 80 },
    ],
  },
]

export default function SocietiesPage() {
  const [activeTab, setActiveTab] = useState("iutcs")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">IUT Societies</span>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
              <Link href="/societies" className="text-blue-600 font-medium">
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

      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Societies</h1>
          <p className="text-xl text-gray-600">Explore our vibrant student communities and their activities</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            {societies.map((society) => (
              <TabsTrigger key={society.id} value={society.id} className="flex items-center space-x-2">
                <society.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{society.acronym}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {societies.map((society) => (
            <TabsContent key={society.id} value={society.id}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Society Info */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className={`p-4 rounded-lg ${society.color}`}>
                          <society.icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{society.name}</CardTitle>
                          <CardDescription className="text-lg">{society.acronym}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-6">{society.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{society.members}</div>
                          <div className="text-sm text-gray-600">Members</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{society.founded}</div>
                          <div className="text-sm text-gray-600">Founded</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{society.upcomingEvents.length}</div>
                          <div className="text-sm text-gray-600">Upcoming Events</div>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600">{society.contact.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600">{society.contact.phone}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Executive Panel */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Executive Panel</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {society.executives.map((exec, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                            <Image
                              src={exec.image || "/placeholder.svg"}
                              alt={exec.name}
                              width={60}
                              height={60}
                              className="rounded-full"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{exec.name}</h4>
                              <p className="text-sm text-blue-600 mb-1">{exec.position}</p>
                              <p className="text-xs text-gray-600">{exec.bio}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Events Section */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Upcoming Events</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {society.upcomingEvents.map((event, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                          <h4 className="font-semibold text-gray-900">{event.title}</h4>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-sm text-gray-600">{event.date}</p>
                            <Badge variant="outline">{event.type}</Badge>
                          </div>
                          <Button size="sm" className="mt-2">
                            Register
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Past Events */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="h-5 w-5" />
                      <span>Past Events</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {society.pastEvents.map((event, index) => (
                        <div key={index} className="border-l-4 border-gray-300 pl-4 py-2">
                          <h4 className="font-semibold text-gray-900">{event.title}</h4>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-sm text-gray-600">{event.date}</p>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{event.participants}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
  {/* ...existing content... */}
  <div className="border-t pt-6">
    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
    {/* ...contact info... */}
    <div className="mt-6">
      <Button
        className="w-full bg-blue-600 text-white"
        onClick={() => {/* open registration modal or redirect to registration page */}}
      >
        Register for {society.name}
      </Button>
    </div>
  </div>
</CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
