
import { useState, useEffect } from 'react';

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  phone: string;
  status: string;
  joinDate: string;
}

const defaultEmployees: Employee[] = [
  {
    id: "EMP001",
    name: "John Doe",
    email: "john.doe@company.com",
    department: "Engineering",
    designation: "Senior Software Engineer",
    phone: "+1 234 567 8900",
    status: "Active",
    joinDate: "2023-01-15"
  },
  {
    id: "EMP002", 
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    department: "Marketing",
    designation: "Marketing Manager",
    phone: "+1 234 567 8901",
    status: "Active",
    joinDate: "2023-03-20"
  },
  {
    id: "EMP003",
    name: "Mike Johnson", 
    email: "mike.johnson@company.com",
    department: "Sales",
    designation: "Sales Executive",
    phone: "+1 234 567 8902",
    status: "On Leave",
    joinDate: "2023-02-10"
  },
  {
    id: "EMP004",
    name: "Emily Davis",
    email: "emily.davis@company.com", 
    department: "HR",
    designation: "HR Specialist",
    phone: "+1 234 567 8903",
    status: "Active",
    joinDate: "2023-04-05"
  }
];

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    } else {
      setEmployees(defaultEmployees);
      localStorage.setItem('employees', JSON.stringify(defaultEmployees));
    }
  }, []);

  const saveToStorage = (updatedEmployees: Employee[]) => {
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
  };

  const addEmployee = (employee: Employee) => {
    const updatedEmployees = [...employees, employee];
    saveToStorage(updatedEmployees);
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    const updatedEmployees = employees.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    saveToStorage(updatedEmployees);
  };

  const deleteEmployee = (employeeId: string) => {
    const updatedEmployees = employees.filter(emp => emp.id !== employeeId);
    saveToStorage(updatedEmployees);
  };

  const getEmployee = (employeeId: string) => {
    return employees.find(emp => emp.id === employeeId);
  };

  return {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
  };
};
