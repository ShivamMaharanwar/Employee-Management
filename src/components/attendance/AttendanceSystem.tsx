
import { useState } from "react";
import { Clock, Calendar, Users, TrendingUp, LogIn, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const AttendanceSystem = () => {
  const [isClocked, setIsClocked] = useState(false);
  const [clockTime, setClockTime] = useState<string | null>(null);

  const attendanceStats = [
    { title: "Present Today", value: "234", icon: Users, color: "text-green-600" },
    { title: "Late Arrivals", value: "12", icon: Clock, color: "text-orange-600" },
    { title: "Early Departures", value: "5", icon: TrendingUp, color: "text-red-600" },
    { title: "On Time", value: "217", icon: Calendar, color: "text-blue-600" },
  ];

  const todayAttendance = [
    { name: "John Doe", clockIn: "09:00 AM", clockOut: "06:00 PM", status: "Present", hours: "9h 0m" },
    { name: "Sarah Wilson", clockIn: "09:15 AM", clockOut: "-", status: "Present", hours: "6h 45m" },
    { name: "Mike Johnson", clockIn: "09:30 AM", clockOut: "05:30 PM", status: "Early Leave", hours: "8h 0m" },
    { name: "Emily Davis", clockIn: "08:45 AM", clockOut: "06:15 PM", status: "Present", hours: "9h 30m" },
  ];

  const handleClockInOut = () => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setClockTime(currentTime);
    setIsClocked(!isClocked);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present": return "bg-green-100 text-green-800";
      case "Late": return "bg-orange-100 text-orange-800";
      case "Early Leave": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance System</h1>
          <p className="text-gray-600">Track and manage employee attendance</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Current Time</p>
          <p className="text-lg font-semibold">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Clock In/Out Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Quick Clock In/Out</h3>
              <p className="text-gray-600 mt-1">Mark your attendance for today</p>
              {clockTime && (
                <p className="text-sm text-gray-600 mt-2">
                  Last action: {isClocked ? 'Clocked In' : 'Clocked Out'} at {clockTime}
                </p>
              )}
            </div>
            <Button 
              onClick={handleClockInOut}
              className={`px-8 py-3 text-lg ${
                isClocked 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isClocked ? (
                <>
                  <LogOut className="h-5 w-5 mr-2" />
                  Clock Out
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5 mr-2" />
                  Clock In
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {attendanceStats.map((stat, index) => {
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

      {/* Today's Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Employee</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Clock In</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Clock Out</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Total Hours</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {todayAttendance.map((record, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{record.name}</td>
                    <td className="py-4 px-4 text-gray-900">{record.clockIn}</td>
                    <td className="py-4 px-4 text-gray-900">{record.clockOut}</td>
                    <td className="py-4 px-4 text-gray-900">{record.hours}</td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(record.status)}>
                        {record.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
