import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

import { Plus, MoreVertical, UserX, Shield, Mail } from "lucide-react";
import { format } from "date-fns";

interface User {
  id: string;
  name: string;
  email: string;
  role:
    | "Admin"
    | "Principal Investigator"
    | "Research Coordinator"
    | "Data Manager"
    | "Viewer";
  createdAt: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@clinicaltrial.com",
    role: "Admin",
    createdAt: "2024-01-15T09:00:00",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    email: "michael.chen@clinicaltrial.com",
    role: "Principal Investigator",
    createdAt: "2024-02-20T14:30:00",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@clinicaltrial.com",
    role: "Research Coordinator",
    createdAt: "2024-03-10T10:15:00",
  },
  {
    id: "4",
    name: "James Patterson",
    email: "james.patterson@clinicaltrial.com",
    role: "Data Manager",
    createdAt: "2024-03-25T11:45:00",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa.anderson@clinicaltrial.com",
    role: "Research Coordinator",
    createdAt: "2024-04-05T13:20:00",
  },
  {
    id: "6",
    name: "Dr. Robert Taylor",
    email: "robert.taylor@clinicaltrial.com",
    role: "Principal Investigator",
    createdAt: "2024-05-12T08:30:00",
  },
  {
    id: "7",
    name: "Maria Garcia",
    email: "maria.garcia@clinicaltrial.com",
    role: "Viewer",
    createdAt: "2024-06-18T16:00:00",
  },
  {
    id: "8",
    name: "David Kim",
    email: "david.kim@clinicaltrial.com",
    role: "Data Manager",
    createdAt: "2024-07-22T09:45:00",
  },
];

const roles = [
  "Admin",
  "Principal Investigator",
  "Research Coordinator",
  "Data Manager",
  "Viewer",
];

export default function Admin() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isChangeRoleModalOpen, setIsChangeRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roleFilter, setRoleFilter] = useState<string>("all");

  // Invite form states
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<string>("Viewer");

  // Change role state
  const [newRole, setNewRole] = useState<string>("");

  // Filter users by role
  const filteredUsers = users.filter((user) => {
    if (roleFilter === "all") return true;
    return user.role === roleFilter;
  });

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800";
      case "Principal Investigator":
        return "bg-blue-100 text-blue-800";
      case "Research Coordinator":
        return "bg-green-100 text-green-800";
      case "Data Manager":
        return "bg-purple-100 text-purple-800";
      case "Viewer":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleInviteUser = () => {
    if (!inviteName || !inviteEmail || !inviteRole) return;

    const newUser: User = {
      id: Date.now().toString(),
      name: inviteName,
      email: inviteEmail,
      role: inviteRole as User["role"],
      createdAt: new Date().toISOString(),
    };

    setUsers([...users, newUser]);
    setIsInviteModalOpen(false);
    setInviteName("");
    setInviteEmail("");
    setInviteRole("Viewer");
  };

  const handleChangeRole = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsChangeRoleModalOpen(true);
  };

  const handleSaveRoleChange = () => {
    if (!selectedUser || !newRole) return;

    setUsers(
      users.map((user) =>
        user.id === selectedUser.id
          ? { ...user, role: newRole as User["role"] }
          : user
      )
    );

    setIsChangeRoleModalOpen(false);
    setSelectedUser(null);
    setNewRole("");
  };

  const handleRemoveUser = (userId: string) => {
    if (confirm("Are you sure you want to remove this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2">Admin</h2>
        <p className="text-gray-600">
          Manage users, roles, and system settings
        </p>
      </div>

      {/* Filters and Actions */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div>
                <Label className="text-xs mb-2 block">Filter by Role</Label>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="text-sm text-gray-600 self-end pb-2">
                Showing {filteredUsers.length} of {users.length} users
              </div>
            </div>

            <div className="self-end">
              <Button onClick={() => setIsInviteModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Invite User
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-gray-500"
                  >
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="text-sm text-gray-900">{user.name}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-700">
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRoleBadgeVariant(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-900">
                          {format(new Date(user.createdAt), "MMM dd, yyyy")}
                        </div>
                        <div className="text-xs text-gray-500">
                          {format(new Date(user.createdAt), "HH:mm")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleChangeRole(user)}
                            >
                              <Shield className="h-4 w-4 mr-2" />
                              Change Role
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleRemoveUser(user.id)}
                              className="text-red-600"
                            >
                              <UserX className="h-4 w-4 mr-2" />
                              Remove User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Information Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Role Descriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <Badge className="bg-red-100 text-red-800 mb-2">Admin</Badge>
              <p className="text-xs text-gray-600">
                Full system access including user management, settings, and all
                trial data.
              </p>
            </div>
            <div>
              <Badge className="bg-blue-100 text-blue-800 mb-2">
                Principal Investigator
              </Badge>
              <p className="text-xs text-gray-600">
                Lead researcher with access to trial oversight, data analysis,
                and reporting.
              </p>
            </div>
            <div>
              <Badge className="bg-green-100 text-green-800 mb-2">
                Research Coordinator
              </Badge>
              <p className="text-xs text-gray-600">
                Manage recruitment, data entry, and day-to-day trial
                operations.
              </p>
            </div>
            <div>
              <Badge className="bg-purple-100 text-purple-800 mb-2">
                Data Manager
              </Badge>
              <p className="text-xs text-gray-600">
                Responsible for data quality, validation, and database
                management.
              </p>
            </div>
            <div>
              <Badge className="bg-gray-100 text-gray-800 mb-2">Viewer</Badge>
              <p className="text-xs text-gray-600">
                Read-only access to view trial data and reports without editing
                privileges.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invite User Modal */}
      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite New User</DialogTitle>
            <DialogDescription>
              Send an invitation to join the clinical trial system.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                placeholder="Enter user's full name"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="user@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Select the appropriate role based on the user's
                responsibilities.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-xs text-blue-900">
                  An invitation email will be sent to{" "}
                  <strong>{inviteEmail || "the user"}</strong> with instructions
                  to set up their account.
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteUser}>
              <Mail className="h-4 w-4 mr-2" />
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Role Modal */}
      <Dialog open={isChangeRoleModalOpen} onOpenChange={setIsChangeRoleModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>
              Update the role for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Current Role</Label>
              <div className="p-3 bg-gray-50 rounded-md">
                <Badge className={getRoleBadgeVariant(selectedUser?.role || "")}>
                  {selectedUser?.role}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label>New Role</Label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div className="text-xs text-yellow-900">
                  Changing a user's role will immediately update their access
                  permissions.
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsChangeRoleModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveRoleChange}>
              <Shield className="h-4 w-4 mr-2" />
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
