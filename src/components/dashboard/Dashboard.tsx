
import { Users, Clock, Calendar, CheckSquare, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Dashboard = () => {
  const stats = [
    { title: "Total Employees", value: "248", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Present Today", value: "234", icon: Clock, color: "text-green-600", bg: "bg-green-50" },
    { title: "On Leave", value: "12", icon: Calendar, color: "text-orange-600", bg: "bg-orange-50" },
    { title: "Pending Tasks", value: "47", icon: CheckSquare, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const recentActivities = [
    { type: "New Employee", message: "John Doe joined as Software Engineer", time: "2 hours ago" },
    { type: "Leave Request", message: "Sarah Wilson requested 3 days leave", time: "4 hours ago" },
    { type: "Task Completed", message: "Project Alpha milestone completed", time: "6 hours ago" },
    { type: "Attendance Alert", message: "5 employees marked late today", time: "8 hours ago" },
  ];

  const quickActions = [
    { title: "Add New Employee", description: "Register a new team member" },
    { title: "Mark Attendance", description: "Clock in/out for today" },
    { title: "Create Announcement", description: "Share company updates" },
    { title: "Generate Report", description: "Download analytics reports" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening at your company.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-semibold">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bg}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Recent Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.type}</p>
                    <p className="text-sm text-gray-600">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action, index) => (
                <Button key={index} variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <p className="font-medium">{action.title}</p>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
