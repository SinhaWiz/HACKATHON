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

interface PanelMember {
  id: number
  name: string
  email: string
  role: string
  department: string
  honorsYear: string
  phone: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [Events, setEvents] = useState<Event[]>([])
  const [panelMembers, setPanelMembers] = useState<PanelMember[]>([])
  const [isPanelMembersOpen, setIsPanelMembersOpen] = useState(false)
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

    // Load mock Events for the user's society
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

    // Load mock panel members for the society
    const mockPanelMembers: PanelMember[] = [
      // Faculty Advisor
      {
        id: 1,
        name: "Dr. Sarah Ahmed",
        email: "sarah.ahmed@iut-dhaka.edu",
        role: "Faculty Advisor",
        department: "Central",
        honorsYear: "Faculty",
        phone: "+880-1711-123456",
      },
      
      // 4th Year - Central Leadership
      {
        id: 2,
        name: "Mohammad Rahman",
        email: "m.rahman@iut-dhaka.edu",
        role: "President",
        department: "Central",
        honorsYear: "4th Year",
        phone: "+880-1712-234567",
      },
      {
        id: 3,
        name: "Aisha Khan",
        email: "aisha.khan@iut-dhaka.edu",
        role: "Vice President",
        department: "Central",
        honorsYear: "4th Year",
        phone: "+880-1713-345678",
      },

      // 3rd Year - Marketing Executive
      {
        id: 4,
        name: "Ahmed Hasan",
        email: "ahmed.hasan@iut-dhaka.edu",
        role: "Marketing Executive",
        department: "Marketing",
        honorsYear: "3rd Year",
        phone: "+880-1716-123456",
      },

      // 2nd Year - Marketing Sub-Executive
      {
        id: 5,
        name: "Fatima Khatun",
        email: "fatima.khatun@iut-dhaka.edu",
        role: "Marketing Sub-Executive",
        department: "Marketing",
        honorsYear: "2nd Year",
        phone: "+880-1717-234567",
      },

      // 3rd Year - Logistics Executive
      {
        id: 6,
        name: "Imran Hossain",
        email: "imran.hossain@iut-dhaka.edu",
        role: "Logistics Executive",
        department: "Logistics",
        honorsYear: "3rd Year",
        phone: "+880-1728-345678",
      },
    ]
    setPanelMembers(mockPanelMembers)
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
    setEvents([...Events, event])
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

    const updatedEvents = Events.map((event) => (event.id === editingEvent.id ? { ...event, ...newEvent } : event))
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
    setEvents(Events.filter((event) => event.id !== eventId))
  }

  if (!user) {
    return <div>Loading...</div>
  }

  const upcomingEvents = Events.filter((event) => new Date(event.date) > new Date()).length

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
          <p className="text-gray-600">Manage your {user.society} society Events and registrations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Events</p>
                  <p className="text-2xl font-bold text-gray-900">{Events.length}</p>
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

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => setIsPanelMembersOpen(true)}
          >
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-indigo-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Panel Members</p>
                  <p className="text-2xl font-bold text-gray-900">{panelMembers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel Members Dialog */}
        <Dialog open={isPanelMembersOpen} onOpenChange={setIsPanelMembersOpen}>
          <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Panel Members - {user?.society}</DialogTitle>
              <DialogDescription>
                Current panel members organized by department and role hierarchy
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {/* Central Leadership */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">Central Leadership</h3>
                <div className="grid gap-3">
                  {panelMembers.filter(member => member.department === "Central").map((member) => (
                    <Card key={member.id} className="p-4 bg-blue-50 border-blue-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{member.name}</h4>
                              <Badge variant="default" className="text-xs bg-blue-600">
                                {member.role}
                              </Badge>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 ml-15">
                            <div>
                              <p><strong>Email:</strong> {member.email}</p>
                              <p><strong>Phone:</strong> {member.phone}</p>
                            </div>
                            <div>
                              <p><strong>Honors Year:</strong> {member.honorsYear}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Department-wise Members */}
              {["Marketing", "Logistics"].map((dept) => {
                const deptMembers = panelMembers.filter(member => member.department === dept);
                if (deptMembers.length === 0) return null;
                
                return (
                  <div key={dept} className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">{dept} Department</h3>
                    <div className="grid gap-3">
                      {deptMembers.map((member) => (
                        <Card key={member.id} className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  member.role.includes('Executive') && !member.role.includes('Sub') 
                                    ? 'bg-green-100' 
                                    : 'bg-orange-100'
                                }`}>
                                  <span className={`font-semibold text-sm ${
                                    member.role.includes('Executive') && !member.role.includes('Sub')
                                      ? 'text-green-600'
                                      : 'text-orange-600'
                                  }`}>
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">{member.name}</h4>
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${
                                      member.role.includes('Executive') && !member.role.includes('Sub')
                                        ? 'border-green-300 text-green-700'
                                        : 'border-orange-300 text-orange-700'
                                    }`}
                                  >
                                    {member.role}
                                  </Badge>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 ml-13">
                                <div>
                                  <p><strong>Email:</strong> {member.email}</p>
                                  <p><strong>Phone:</strong> {member.phone}</p>
                                </div>
                                <div>
                                  <p><strong>Honors Year:</strong> {member.honorsYear}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-sm text-gray-600">
                Total Members: {panelMembers.length}
              </div>
              <Button variant="outline" onClick={() => setIsPanelMembersOpen(false)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Tabs defaultValue="Events" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="Events">Event Management</TabsTrigger>
            <TabsTrigger value="registrations">Student Registrations</TabsTrigger>
          </TabsList>

          <TabsContent value="Events" className="space-y-6">
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
              {Events.map((event) => (
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

            {Events.map((event) => (
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
