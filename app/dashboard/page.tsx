"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Users, Plus, Edit, Trash2, Shield, LogOut, BarChart3, Clock, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

interface User {
  email: string
  society: string
  role: string
}

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  type: string
  description: string
  maxCapacity: number
  registeredStudents: Student[]
}

interface Student {
  id: number
  name: string
  email: string
  phone: string
  studentId: string
  registrationDate: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    type: "Workshop",
    description: "",
    maxCapacity: 50,
  })
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    // Load mock events for the user's society
    const mockEvents: Event[] = [
      {
        id: 1,
        title: "AI Workshop Series",
        date: "2024-02-15",
        time: "14:00",
        location: "Computer Lab 1",
        type: "Workshop",
        description: "Learn the fundamentals of artificial intelligence and machine learning with hands-on projects.",
        maxCapacity: 60,
        registeredStudents: [
          {
            id: 1,
            name: "Ahmed Hassan",
            email: "ahmed@iut-dhaka.edu",
            phone: "+880-1234-567890",
            studentId: "CSE-2021-001",
            registrationDate: "2024-01-15",
          },
          {
            id: 2,
            name: "Fatima Rahman",
            email: "fatima@iut-dhaka.edu",
            phone: "+880-1234-567891",
            studentId: "CSE-2021-002",
            registrationDate: "2024-01-16",
          },
          {
            id: 3,
            name: "Omar Ali",
            email: "omar@iut-dhaka.edu",
            phone: "+880-1234-567892",
            studentId: "CSE-2021-003",
            registrationDate: "2024-01-17",
          },
        ],
      },
      {
        id: 2,
        title: "Coding Competition 2024",
        date: "2024-02-28",
        time: "10:00",
        location: "Main Auditorium",
        type: "Competition",
        description: "Annual coding competition featuring algorithmic challenges and problem-solving.",
        maxCapacity: 100,
        registeredStudents: [
          {
            id: 4,
            name: "Rashida Begum",
            email: "rashida@iut-dhaka.edu",
            phone: "+880-1234-567893",
            studentId: "CSE-2020-001",
            registrationDate: "2024-01-20",
          },
          {
            id: 5,
            name: "Karim Uddin",
            email: "karim@iut-dhaka.edu",
            phone: "+880-1234-567894",
            studentId: "CSE-2020-002",
            registrationDate: "2024-01-21",
          },
        ],
      },
    ]
    setEvents(mockEvents)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  const handleAddEvent = () => {
    const event: Event = {
      id: Date.now(),
      ...newEvent,
      registeredStudents: [],
    }
    setEvents([...events, event])
    setNewEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      type: "Workshop",
      description: "",
      maxCapacity: 50,
    })
    setIsAddEventOpen(false)
  }

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event)
    setNewEvent({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      type: event.type,
      description: event.description,
      maxCapacity: event.maxCapacity,
    })
  }

  const handleUpdateEvent = () => {
    if (!editingEvent) return

    const updatedEvents = events.map((event) => (event.id === editingEvent.id ? { ...event, ...newEvent } : event))
    setEvents(updatedEvents)
    setEditingEvent(null)
    setNewEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      type: "Workshop",
      description: "",
      maxCapacity: 50,
    })
  }

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter((event) => event.id !== eventId))
  }

  if (!user) {
    return <div>Loading...</div>
  }

  const totalRegistrations = events.reduce((sum, event) => sum + event.registeredStudents.length, 0)
  const upcomingEvents = events.filter((event) => new Date(event.date) > new Date()).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Executive Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{user.role}</span> - {user.society}
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.role}!</h1>
          <p className="text-gray-600">Manage your {user.society} society events and registrations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Events</p>
                  <p className="text-2xl font-bold text-gray-900">{events.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                  <p className="text-2xl font-bold text-gray-900">{upcomingEvents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                  <p className="text-2xl font-bold text-gray-900">{totalRegistrations}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg. Attendance</p>
                  <p className="text-2xl font-bold text-gray-900">85%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="events">Event Management</TabsTrigger>
            <TabsTrigger value="registrations">Student Registrations</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Your Events</h2>
              <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                    <DialogDescription>Create a new event for your society</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Event Title</Label>
                        <Input
                          id="title"
                          value={newEvent.title}
                          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                          placeholder="Enter event title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="type">Event Type</Label>
                        <select
                          id="type"
                          value={newEvent.type}
                          onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Workshop">Workshop</option>
                          <option value="Competition">Competition</option>
                          <option value="Seminar">Seminar</option>
                          <option value="Training">Training</option>
                          <option value="Contest">Contest</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={newEvent.time}
                          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={newEvent.location}
                          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                          placeholder="Event location"
                        />
                      </div>
                      <div>
                        <Label htmlFor="capacity">Max Capacity</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={newEvent.maxCapacity}
                          onChange={(e) => setNewEvent({ ...newEvent, maxCapacity: Number.parseInt(e.target.value) })}
                          min="1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        placeholder="Event description"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddEvent}>Create Event</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <CardDescription className="flex items-center space-x-4 mt-2">
                          <Badge variant="outline">{event.type}</Badge>
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Event</DialogTitle>
                              <DialogDescription>Update event details</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-title">Event Title</Label>
                                  <Input
                                    id="edit-title"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-type">Event Type</Label>
                                  <select
                                    id="edit-type"
                                    value={newEvent.type}
                                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  >
                                    <option value="Workshop">Workshop</option>
                                    <option value="Competition">Competition</option>
                                    <option value="Seminar">Seminar</option>
                                    <option value="Training">Training</option>
                                    <option value="Contest">Contest</option>
                                  </select>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-date">Date</Label>
                                  <Input
                                    id="edit-date"
                                    type="date"
                                    value={newEvent.date}
                                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-time">Time</Label>
                                  <Input
                                    id="edit-time"
                                    type="time"
                                    value={newEvent.time}
                                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-location">Location</Label>
                                  <Input
                                    id="edit-location"
                                    value={newEvent.location}
                                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-capacity">Max Capacity</Label>
                                  <Input
                                    id="edit-capacity"
                                    type="number"
                                    value={newEvent.maxCapacity}
                                    onChange={(e) =>
                                      setNewEvent({ ...newEvent, maxCapacity: Number.parseInt(e.target.value) })
                                    }
                                    min="1"
                                  />
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                  id="edit-description"
                                  value={newEvent.description}
                                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                  rows={3}
                                />
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" onClick={() => setEditingEvent(null)}>
                                Cancel
                              </Button>
                              <Button onClick={handleUpdateEvent}>Update Event</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-gray-600">
                            {event.registeredStudents.length}/{event.maxCapacity} registered
                          </span>
                        </span>
                      </div>
                      <div className="w-32">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(event.registeredStudents.length / event.maxCapacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="registrations" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Student Registrations</h2>

            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{event.title}</span>
                    <Badge variant="outline">{event.registeredStudents.length} registered</Badge>
                  </CardTitle>
                  <CardDescription>
                    {event.date} • {event.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {event.registeredStudents.length === 0 ? (
                    <Alert>
                      <AlertDescription>No students have registered for this event yet.</AlertDescription>
                    </Alert>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Name</th>
                            <th className="text-left py-2">Student ID</th>
                            <th className="text-left py-2">Email</th>
                            <th className="text-left py-2">Phone</th>
                            <th className="text-left py-2">Registration Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {event.registeredStudents.map((student) => (
                            <tr key={student.id} className="border-b">
                              <td className="py-2 font-medium">{student.name}</td>
                              <td className="py-2">{student.studentId}</td>
                              <td className="py-2">
                                <a href={`mailto:${student.email}`} className="text-blue-600 hover:underline">
                                  {student.email}
                                </a>
                              </td>
                              <td className="py-2">{student.phone}</td>
                              <td className="py-2">{student.registrationDate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
