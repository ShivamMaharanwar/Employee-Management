
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { EmployeeDirectory } from "@/components/employees/EmployeeDirectory";
import { AttendanceSystem } from "@/components/attendance/AttendanceSystem";
import { LeaveManagement } from "@/components/leave/LeaveManagement";
import { TaskManagement } from "@/components/tasks/TaskManagement";
import { DocumentManagement } from "@/components/documents/DocumentManagement";
import { Communication } from "@/components/communication/Communication";
import { Reports } from "@/components/reports/Reports";
import { SecurityDashboard } from "@/components/security/SecurityDashboard";

const Index = () => {
  const [activeModule, setActiveModule] = useState("dashboard");

  const renderActiveModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <Dashboard />;
      case "employees":
        return <EmployeeDirectory />;
      case "attendance":
        return <AttendanceSystem />;
      case "leave":
        return <LeaveManagement />;
      case "tasks":
        return <TaskManagement />;
      case "documents":
        return <DocumentManagement />;
      case "communication":
        return <Communication />;
      case "reports":
        return <Reports />;
      case "security":
        return <SecurityDashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <main className="flex-1 ml-64 p-6">
        {renderActiveModule()}
      </main>
    </div>
  );
};

export default Index;
