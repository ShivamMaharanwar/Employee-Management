
import { useState } from "react";
import { Upload, File, Download, Eye, Trash2, Filter, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const DocumentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const documents = [
    {
      id: "DOC001",
      name: "Employee Handbook 2024",
      type: "Policy Document",
      category: "HR Policies",
      uploadDate: "2024-01-10",
      size: "2.5 MB",
      uploadedBy: "HR Team",
      status: "Active"
    },
    {
      id: "DOC002",
      name: "John Doe - Resume",
      type: "Resume",
      category: "Employee Documents",
      uploadDate: "2024-01-08",
      size: "450 KB",
      uploadedBy: "John Doe",
      status: "Active"
    },
    {
      id: "DOC003",
      name: "Q4 Performance Review Template",
      type: "Template",
      category: "Performance",
      uploadDate: "2024-01-05",
      size: "1.2 MB",
      uploadedBy: "HR Team",
      status: "Active"
    },
    {
      id: "DOC004",
      name: "Safety Protocols 2024",
      type: "Policy Document",
      category: "Safety",
      uploadDate: "2024-01-03",
      size: "3.1 MB",
      uploadedBy: "Safety Officer",
      status: "Active"
    },
    {
      id: "DOC005",
      name: "Sarah Wilson - ID Proof",
      type: "ID Document",
      category: "Employee Documents",
      uploadDate: "2024-01-02",
      size: "800 KB",
      uploadedBy: "Sarah Wilson",
      status: "Active"
    }
  ];

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "HR Policies": return "bg-blue-100 text-blue-800";
      case "Employee Documents": return "bg-green-100 text-green-800";
      case "Performance": return "bg-purple-100 text-purple-800";
      case "Safety": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
          <p className="text-gray-600">Store and manage company and employee documents</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Upload Section */}
      <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
        <CardContent className="p-8">
          <div className="text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Documents</h3>
            <p className="text-gray-600 mb-4">Drag and drop files here or click to browse</p>
            <Button variant="outline">Choose Files</Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <CardTitle>Document Library ({filteredDocuments.length})</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search documents..."
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
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Document</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Size</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Upload Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Uploaded By</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((document) => (
                  <tr key={document.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <File className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">{document.name}</p>
                          <p className="text-sm text-gray-500">{document.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getCategoryColor(document.category)}>
                        {document.category}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{document.type}</td>
                    <td className="py-4 px-4 text-gray-900">{document.size}</td>
                    <td className="py-4 px-4 text-gray-900">{document.uploadDate}</td>
                    <td className="py-4 px-4 text-gray-900">{document.uploadedBy}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
