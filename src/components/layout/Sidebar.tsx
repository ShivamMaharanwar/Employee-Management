
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  Calendar, 
  CheckSquare, 
  FileText, 
  MessageSquare, 
  BarChart3,
  Settings,
  Building2
} from "lucide-react";

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

export const Sidebar = ({ activeModule, setActiveModule }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "employees", label: "Employee Directory", icon: Users },
    { id: "attendance", label: "Attendance", icon: Clock },
    { id: "leave", label: "Leave Management", icon: Calendar },
    { id: "tasks", label: "Task Management", icon: CheckSquare },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "communication", label: "Communication", icon: MessageSquare },
    { id: "reports", label: "Reports", icon: BarChart3 },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">OfficeHub</h1>
            <p className="text-sm text-gray-500">Employee Management</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 mb-1 rounded-lg text-left transition-colors ${
                isActive 
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700" 
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-blue-700" : "text-gray-500"}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-4 left-3 right-3">
        <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
          <Settings className="h-5 w-5 text-gray-500" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};
