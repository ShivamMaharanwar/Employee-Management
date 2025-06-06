
import { useState } from "react";
import { Send, Plus, Bell, MessageSquare, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Communication = () => {
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [announcementTitle, setAnnouncementTitle] = useState("");

  const announcements = [
    {
      id: "ANN001",
      title: "New Year Holiday Schedule",
      content: "The office will be closed from December 31st to January 2nd. Normal operations will resume on January 3rd.",
      author: "HR Team",
      date: "2024-01-10",
      priority: "High",
      department: "All"
    },
    {
      id: "ANN002",
      title: "Team Building Event",
      content: "Join us for our quarterly team building event this Friday at 3 PM in the main conference room.",
      author: "Management",
      date: "2024-01-08",
      priority: "Medium",
      department: "All"
    },
    {
      id: "ANN003",
      title: "IT System Maintenance",
      content: "IT systems will undergo maintenance this Saturday from 2 AM to 6 AM. Expect temporary service interruptions.",
      author: "IT Department",
      date: "2024-01-05",
      priority: "Medium",
      department: "All"
    }
  ];

  const meetings = [
    {
      id: "MTG001",
      title: "Weekly Standup",
      date: "2024-01-15",
      time: "10:00 AM",
      participants: ["John Doe", "Sarah Wilson", "Mike Johnson"],
      location: "Conference Room A"
    },
    {
      id: "MTG002",
      title: "Project Review",
      date: "2024-01-16", 
      time: "2:00 PM",
      participants: ["Emily Davis", "John Doe"],
      location: "Meeting Room B"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateAnnouncement = () => {
    if (announcementTitle.trim() && newAnnouncement.trim()) {
      // Here you would typically save to a backend
      console.log("Creating announcement:", { title: announcementTitle, content: newAnnouncement });
      setAnnouncementTitle("");
      setNewAnnouncement("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Communication Hub</h1>
          <p className="text-gray-600">Company announcements and team communication</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Announcement
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create Announcement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Create Announcement</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Announcement title..."
              value={announcementTitle}
              onChange={(e) => setAnnouncementTitle(e.target.value)}
            />
            <Textarea
              placeholder="Write your announcement here..."
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
              rows={4}
            />
            <Button onClick={handleCreateAnnouncement} className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Post Announcement
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Upcoming Meetings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900">{meeting.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {meeting.date} at {meeting.time}
                  </p>
                  <p className="text-sm text-gray-600">Location: {meeting.location}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {meeting.participants.length} participants
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Recent Announcements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                      <Badge className={getPriorityColor(announcement.priority)}>
                        {announcement.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{announcement.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {announcement.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>{announcement.author}</span>
                      </div>
                      <span>•</span>
                      <span>{announcement.date}</span>
                      <span>•</span>
                      <span>To: {announcement.department}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
