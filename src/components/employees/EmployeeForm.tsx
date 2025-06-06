
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  phone: string;
  status: string;
  joinDate: string;
}

interface EmployeeFormProps {
  isOpen: boolean;
  onClose: () => void;
  employee?: Employee | null;
  onSave: (employee: Employee) => void;
}

export const EmployeeForm = ({ isOpen, onClose, employee, onSave }: EmployeeFormProps) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<Employee>({
    defaultValues: employee || {
      name: "",
      email: "",
      department: "",
      designation: "",
      phone: "",
      status: "Active",
      joinDate: new Date().toISOString().split('T')[0]
    }
  });

  const isEditing = !!employee;

  const onSubmit = (data: Employee) => {
    const employeeData = {
      ...data,
      id: isEditing ? employee.id : `EMP${String(Date.now()).slice(-3).padStart(3, '0')}`
    };

    onSave(employeeData);
    
    toast({
      title: isEditing ? "Employee Updated" : "Employee Added",
      description: `${data.name} has been ${isEditing ? 'updated' : 'added'} successfully.`
    });

    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>
              {isEditing ? 'Edit Employee' : 'Add New Employee'}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select 
                value={watch("department")} 
                onValueChange={(value) => setValue("department", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="HR">Human Resources</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                </SelectContent>
              </Select>
              {errors.department && (
                <p className="text-sm text-red-600">{errors.department.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="designation">Designation *</Label>
              <Input
                id="designation"
                {...register("designation", { required: "Designation is required" })}
                placeholder="Enter job title"
              />
              {errors.designation && (
                <p className="text-sm text-red-600">{errors.designation.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={watch("status")} 
                onValueChange={(value) => setValue("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Resigned">Resigned</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="joinDate">Join Date</Label>
              <Input
                id="joinDate"
                type="date"
                {...register("joinDate")}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {isEditing ? 'Update Employee' : 'Add Employee'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
