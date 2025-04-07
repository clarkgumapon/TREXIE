"use client"

import { useState, useEffect } from "react"
import { Check, User, X } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "Maria Santos",
    email: "maria@example.com",
    role: "Customer",
    orders: 5,
    isVerified: true,
    lastActive: "2023-06-15T14:30:00",
    status: "active"
  },
  {
    id: 2,
    name: "Juan Cruz",
    email: "juan@example.com",
    role: "Customer",
    orders: 12,
    isVerified: true,
    lastActive: "2023-06-14T11:20:00",
    status: "active"
  },
  {
    id: 3,
    name: "Ana Reyes",
    email: "ana@example.com",
    role: "Admin",
    orders: 0,
    isVerified: true,
    lastActive: "2023-06-15T09:45:00",
    status: "active"
  },
  {
    id: 4,
    name: "Mike Tan",
    email: "mike@example.com",
    role: "Customer",
    orders: 3,
    isVerified: false,
    lastActive: "2023-05-30T16:10:00",
    status: "inactive"
  },
  {
    id: 5,
    name: "Sofia Mendoza",
    email: "sofia@example.com",
    role: "Customer",
    orders: 8,
    isVerified: true,
    lastActive: "2023-06-12T13:25:00",
    status: "active"
  }
];

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center text-muted-foreground">Loading users...</div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Manage user accounts and permissions.
          </p>
        </div>
        <Button>
          <User className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.role === "Admin" ? (
                    <Badge variant="default">{user.role}</Badge>
                  ) : (
                    <span>{user.role}</span>
                  )}
                </TableCell>
                <TableCell>{user.orders}</TableCell>
                <TableCell>
                  {user.isVerified ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </TableCell>
                <TableCell>{formatDate(user.lastActive)}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === "active" ? "outline" : "secondary"}
                    className={
                      user.status === "active"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 