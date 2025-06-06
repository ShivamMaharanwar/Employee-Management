
import { useState } from "react";
import { Plus, Filter, Calendar, User, Flag, CheckSquare, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const TaskManagement = () => {
  const taskStats = [
    { title: "Total Tasks", value: "47", icon: CheckSquare, color: "text-blue-600" },
    { title: "In Progress", value: "23", icon: Clock, color: "text-orange-600" },
    { title: "Completed", value: "18", icon: CheckSquare, color: "text-green-600" },
    { title: "Overdue", value: "6", icon: AlertTriangle, color: "text-red-600" },
  ];

  const tasks = [
    {
      id: "TSK001",
      title: "Implement User Authentication",
      description: "Set up secure login system with JWT tokens",
      assignee: "John Doe",
      project: "Web Portal",
      priority: "High",
      status: "In Progress",
      dueDate: "2024-01-20",
      progress: 75
    },
    {
      id: "TSK002",
      title: "Design Database Schema",
      description: "Create normalized database structure for the application",
      assignee: "Sarah Wilson",
      project: "Backend API",
      priority: "Medium",
      status: "Completed",
      dueDate: "2024-01-15",
      progress: 100
    },
    {
      id: "TSK003",
      title: "Create Marketing Campaign",
      description: "Develop social media marketing strategy for Q1",
      assignee: "Mike Johnson",
      project: "Marketing",
      priority: "Low",
      status: "Pending",
      dueDate: "2024-01-25",
      progress: 0
    },
    {
      id: "TSK004",
      title: "Setup CI/CD Pipeline",
      description: "Configure automated deployment pipeline",
      assignee: "Emily Davis",
      project: "DevOps",
      priority: "High",
      status: "In Progress",
      dueDate: "2024-01-18",
      progress: 60
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-gray-100 text-gray-800";
      case "Overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-600">Assign and track project tasks</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {taskStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Tasks</CardTitle>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      <Badge className={getPriorityColor(task.priority)}>
                        <Flag className="h-3 w-3 mr-1" />
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {task.dueDate}</span>
                      </div>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">{task.project}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
