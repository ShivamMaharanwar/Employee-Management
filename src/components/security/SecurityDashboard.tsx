
import { Shield, AlertTriangle, CheckCircle, Users, Lock, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

export const SecurityDashboard = () => {
  const { hasPermission } = useAuth();

  if (!hasPermission('security:read')) {
    return (
      <div className="text-center py-8">
        <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">You don't have permission to view security information.</p>
      </div>
    );
  }

  const securityMetrics = [
    { title: "Active Sessions", value: "23", status: "normal", icon: Users },
    { title: "Failed Login Attempts", value: "2", status: "warning", icon: AlertTriangle },
    { title: "Security Violations", value: "0", status: "good", icon: CheckCircle },
    { title: "Data Access Requests", value: "15", status: "normal", icon: Eye }
  ];

  const recentSecurityEvents = [
    { event: "Successful admin login", user: "admin@company.com", time: "2 minutes ago", severity: "info" },
    { event: "Failed login attempt", user: "unknown@test.com", time: "15 minutes ago", severity: "warning" },
    { event: "Password changed", user: "john.doe@company.com", time: "1 hour ago", severity: "info" },
    { event: "Document accessed", user: "sarah.wilson@company.com", time: "2 hours ago", severity: "info" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-600 bg-green-50";
      case "warning": return "text-orange-600 bg-orange-50";
      case "danger": return "text-red-600 bg-red-50";
      default: return "text-blue-600 bg-blue-50";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "warning": return "bg-orange-100 text-orange-800";
      case "danger": return "bg-red-100 text-red-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security Dashboard</h1>
          <p className="text-gray-600">Monitor system security and access controls</p>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-green-600" />
          <span className="text-sm font-medium text-green-600">System Secure</span>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${getStatusColor(metric.status)}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Security Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5" />
            <span>Recent Security Events</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSecurityEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{event.event}</p>
                  <p className="text-sm text-gray-600">{event.user}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getSeverityColor(event.severity)}>
                    {event.severity}
                  </Badge>
                  <p className="text-sm text-gray-500">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
