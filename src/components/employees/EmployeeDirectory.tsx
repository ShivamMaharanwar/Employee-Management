
import { useState } from "react";
import { Search, Plus, Filter, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EmployeeForm } from "./EmployeeForm";
import { useEmployees, Employee } from "@/hooks/useEmployees";
import { useToast } from "@/hooks/use-toast";

export const EmployeeDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const { toast } = useToast();

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "On Leave": return "bg-orange-100 text-orange-800";
      case "Resigned": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsFormOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleDeleteEmployee = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      deleteEmployee(employeeToDelete.id);
      toast({
        title: "Employee Deleted",
        description: `${employeeToDelete.name} has been removed from the system.`,
        variant: "destructive"
      });
      setEmployeeToDelete(null);
      setDeleteConfirmOpen(false);
    }
  };

  const handleSaveEmployee = (employee: Employee) => {
    if (editingEmployee) {
      updateEmployee(employee);
    } else {
      addEmployee(employee);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Directory</h1>
          <p className="text-gray-600">Manage and view all employee information</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={handleAddEmployee}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <CardTitle>All Employees ({filteredEmployees.length})</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Employee</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Department</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Designation</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Join Date</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{employee.name}</p>
                          <p className="text-sm text-gray-500">{employee.email}</p>
                          <p className="text-sm text-gray-500">{employee.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900">{employee.department}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900">{employee.designation}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(employee.status)}>
                        {employee.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900">{employee.joinDate}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white">
                          <DropdownMenuItem onClick={() => handleEditEmployee(employee)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditEmployee(employee)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Employee
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteEmployee(employee)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove Employee
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <EmployeeForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        employee={editingEmployee}
        onSave={handleSaveEmployee}
      />

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the employee
              "{employeeToDelete?.name}" from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
