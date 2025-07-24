"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Users, MapPin, Clock, Search, Shield } from "lucide-react"
import Link from "next/link"

const allEvents = [
  {
    id: 1,
    title: "AI Workshop Series",
    society: "IUTCS",
    societyColor: "bg-blue-500",
    date: "2024-02-15",
    time: "2:00 PM - 5:00 PM",
    location: "Computer Lab 1",
    type: "Workshop",
    status: "upcoming",
    description: "Learn the fundamentals of artificial intelligence and machine learning with hands-on projects.",
    registeredCount: 45,
    maxCapacity: 60,
    organizer: "Sarah Ahmed",
  },
  {
    id: 2,
    title: "Coding Competition 2024",
    society: "IUTCS",
    societyColor: "bg-blue-500",
    date: "2024-02-28",
    time: "10:00 AM - 4:00 PM",
    location: "Main Auditorium",
    type: "Competition",
    status: "upcoming",
    description: "Annual coding competition featuring algorithmic challenges and problem-solving.",
    registeredCount: 89,
    maxCapacity: 100,
    organizer: "Rafiq Hassan",
  },
  {
    id: 3,
    title: "Startup Pitch Competition",
    society: "IUTCBS",
    societyColor: "bg-green-500",
    date: "2024-03-05",
    time: "1:00 PM - 6:00 PM",
    location: "Business Hall",
    type: "Competition",
    status: "upcoming",
    description: "Present your startup ideas to industry experts and win exciting prizes.",
    registeredCount: 25,
    maxCapacity: 40,
    organizer: "Fatima Khan",
  },
  {
    id: 4,
    title: "Inter-University Debate Championship",
    society: "IUTDS",
    societyColor: "bg-purple-500",
    date: "2024-02-20",
    time: "9:00 AM - 6:00 PM",
    location: "Debate Hall",
    type: "Competition",
    status: "upcoming",
    description: "Prestigious debate competition featuring teams from top universities across the country.",
    registeredCount: 32,
    maxCapacity: 40,
    organizer: "Nadia Rahman",
  },
  {
    id: 5,
    title: "Research Symposium 2024",
    society: "IUTSIKS",
    societyColor: "bg-orange-500",
    date: "2024-03-15",
    time: "10:00 AM - 5:00 PM",
    location: "Research Center",
    type: "Symposium",
    status: "upcoming",
    description: "Showcase of cutting-edge research projects by students and faculty members.",
    registeredCount: 67,
    maxCapacity: 80,
    organizer: "Dr. Aminul Islam",
  },
  {
    id: 6,
    title: "Weekly Programming Contest",
    society: "IUTPS",
    societyColor: "bg-red-500",
    date: "2024-02-18",
    time: "3:00 PM - 6:00 PM",
    location: "Programming Lab",
    type: "Contest",
    status: "upcoming",
    description: "Regular programming contest to sharpen competitive coding skills.",
    registeredCount: 78,
    maxCapacity: 100,
    organizer: "Tanvir Hasan",
  },
  // Past Events
  {
    id: 7,
    title: "Tech Talk: Future of Web Development",
    society: "IUTCS",
    societyColor: "bg-blue-500",
    date: "2024-01-20",
    time: "2:00 PM - 4:00 PM",
    location: "Seminar Hall",
    type: "Seminar",
    status: "past",
    description: "Industry expert discussion on modern web development trends and technologies.",
    registeredCount: 80,
    maxCapacity: 80,
    organizer: "Sarah Ahmed",
  },
  {
    id: 8,
    title: "Business Plan Workshop",
    society: "IUTCBS",
    societyColor: "bg-green-500",
    date: "2024-01-25",
    time: "10:00 AM - 3:00 PM",
    location: "Workshop Room",
    type: "Workshop",
    status: "past",
    description: "Learn how to create effective business plans and pitch to investors.",
    registeredCount: 60,
    maxCapacity: 60,
    organizer: "Omar Ali",
  },
  {
    id: 9,
    title: "National Debate Competition",
    society: "IUTDS",
    societyColor: "bg-purple-500",
    date: "2024-01-18",
    time: "9:00 AM - 8:00 PM",
    location: "Main Auditorium",
    type: "Competition",
    status: "past",
    description: "National level debate competition with participants from across Bangladesh.",
    registeredCount: 40,
    maxCapacity: 40,
    organizer: "Karim Uddin",
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSociety, setSelectedSociety] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const societies = ["all", "IUTCS", "IUTCBS", "IUTDS", "IUTSIKS", "IUTPS"]
  const statuses = ["all", "upcoming", "past"]

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSociety = selectedSociety === "all" || event.society === selectedSociety
    const matchesStatus = selectedStatus === "all" || event.status === selectedStatus

    return matchesSearch && matchesSociety && matchesStatus
  })

  const upcomingEvents = filteredEvents.filter((event) => event.status === "upcoming")
  const pastEvents = filteredEvents.filter((event) => event.status === "past")

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
              <Link href="/societies" className="text-gray-600 hover:text-blue-600">
                Societies
              </Link>
              <Link href="/events" className="text-blue-600 font-medium">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Society Events</h1>
          <p className="text-xl text-gray-600">Discover and register for exciting events across all societies</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedSociety}
                onChange={(e) => setSelectedSociety(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {societies.map((society) => (
                  <option key={society} value={society}>
                    {society === "all" ? "All Societies" : society}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "all" ? "All Events" : status === "upcoming" ? "Upcoming" : "Past Events"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upcoming">Upcoming Events ({upcomingEvents.length})</TabsTrigger>
            <TabsTrigger value="past">Past Events ({pastEvents.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={`${event.societyColor} text-white`}>{event.society}</Badge>
                          <Badge variant="outline">{event.type}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{event.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>
                          {event.registeredCount}/{event.maxCapacity} registered
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(event.registeredCount / event.maxCapacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">by {event.organizer}</span>
                      <Button size="sm" disabled={event.registeredCount >= event.maxCapacity}>
                        {event.registeredCount >= event.maxCapacity ? "Full" : "Register"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <Card key={event.id} className="opacity-75">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={`${event.societyColor} text-white`}>{event.society}</Badge>
                          <Badge variant="outline">{event.type}</Badge>
                          <Badge variant="secondary">Completed</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{event.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{event.registeredCount} participants</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">by {event.organizer}</span>
                      <Button size="sm" variant="outline" disabled>
                        Event Ended
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
