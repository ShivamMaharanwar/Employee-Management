
import { useState } from "react";
import { Calendar, Clock, Plus, Filter, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const LeaveManagement = () => {
  const leaveStats = [
    { title: "Total Leave Balance", value: "25 days", icon: Calendar, color: "text-blue-600" },
    { title: "Used This Year", value: "12 days", icon: Clock, color: "text-orange-600" },
    { title: "Pending Requests", value: "3", icon: AlertCircle, color: "text-yellow-600" },
    { title: "Approved Requests", value: "8", icon: CheckCircle, color: "text-green-600" },
  ];

  const leaveRequests = [
    {
      id: "LR001",
      employee: "John Doe",
      type: "Annual Leave",
      startDate: "2024-01-15",
      endDate: "2024-01-18",
      days: 4,
      status: "Pending",
      reason: "Family vacation",
      appliedOn: "2024-01-10"
    },
    {
      id: "LR002", 
      employee: "Sarah Wilson",
      type: "Sick Leave",
      startDate: "2024-01-12",
      endDate: "2024-01-12",
      days: 1,
      status: "Approved",
      reason: "Medical appointment",
      appliedOn: "2024-01-11"
    },
    {
      id: "LR003",
      employee: "Mike Johnson",
      type: "Personal Leave",
      startDate: "2024-01-20",
      endDate: "2024-01-22",
      days: 3,
      status: "Pending",
      reason: "Personal work",
      appliedOn: "2024-01-08"
    },
    {
      id: "LR004",
      employee: "Emily Davis",
      type: "Maternity Leave",
      startDate: "2024-02-01",
      endDate: "2024-04-30",
      days: 89,
      status: "Approved",
      reason: "Maternity leave",
      appliedOn: "2024-01-05"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": return <CheckCircle className="h-4 w-4" />;
      case "Pending": return <AlertCircle className="h-4 w-4" />;
      case "Rejected": return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-600">Manage leave requests and track balances</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Request Leave
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {leaveStats.map((stat, index) => {
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

      {/* Leave Requests */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Leave Requests</CardTitle>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Request ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Employee</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Duration</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Days</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Applied On</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{request.id}</td>
                    <td className="py-4 px-4 text-gray-900">{request.employee}</td>
                    <td className="py-4 px-4 text-gray-900">{request.type}</td>
                    <td className="py-4 px-4 text-gray-900">
                      {request.startDate} to {request.endDate}
                    </td>
                    <td className="py-4 px-4 text-gray-900">{request.days} days</td>
                    <td className="py-4 px-4">
                      <Badge className={`${getStatusColor(request.status)} flex items-center space-x-1 w-fit`}>
                        {getStatusIcon(request.status)}
                        <span>{request.status}</span>
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{request.appliedOn}</td>
                    <td className="py-4 px-4 text-right">
                      {request.status === "Pending" && (
                        <div className="flex space-x-2 justify-end">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive">
                            Reject
                          </Button>
                        </div>
                      )}
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
