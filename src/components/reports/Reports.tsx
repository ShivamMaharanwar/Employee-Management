
import { useState } from "react";
import { Download, Calendar, Users, Clock, TrendingUp, FileText, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const reportTypes = [
    {
      title: "Employee Report",
      description: "Complete employee directory with details",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Attendance Report", 
      description: "Monthly attendance and time tracking data",
      icon: Clock,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      title: "Leave Report",
      description: "Leave requests and balance summary",
      icon: Calendar,
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      title: "Performance Report",
      description: "Employee performance and KPI metrics",
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      title: "Payroll Report",
      description: "Salary and deduction breakdown",
      icon: FileText,
      color: "text-red-600",
      bg: "bg-red-50"
    }
  ];

  const quickStats = [
    { label: "Total Reports Generated", value: "156", period: "This Month" },
    { label: "Most Downloaded", value: "Attendance Report", period: "Last 30 Days" },
    { label: "Latest Report", value: "Employee Directory", period: "2 Hours Ago" },
    { label: "Scheduled Reports", value: "8", period: "Next Week" }
  ];

  const recentReports = [
    {
      name: "Monthly Attendance Report - December 2023",
      type: "Attendance",
      generatedOn: "2024-01-01",
      size: "2.3 MB",
      format: "PDF"
    },
    {
      name: "Employee Directory - Complete",
      type: "Employee",
      generatedOn: "2023-12-30",
      size: "1.8 MB", 
      format: "Excel"
    },
    {
      name: "Leave Balance Report - Q4 2023",
      type: "Leave",
      generatedOn: "2023-12-28",
      size: "980 KB",
      format: "PDF"
    },
    {
      name: "Performance Review Summary",
      type: "Performance",
      generatedOn: "2023-12-25",
      size: "3.2 MB",
      format: "PDF"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate and download comprehensive business reports</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Custom Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600 mt-1">{stat.label}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.period}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">Apply Filters</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Types */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTypes.map((report, index) => {
              const Icon = report.icon;
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 ${report.bg} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`h-6 w-6 ${report.color}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{report.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-1" />
                      Excel
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Report Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Generated On</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Size</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Format</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{report.name}</td>
                    <td className="py-4 px-4 text-gray-900">{report.type}</td>
                    <td className="py-4 px-4 text-gray-900">{report.generatedOn}</td>
                    <td className="py-4 px-4 text-gray-900">{report.size}</td>
                    <td className="py-4 px-4 text-gray-900">{report.format}</td>
                    <td className="py-4 px-4 text-right">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
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
