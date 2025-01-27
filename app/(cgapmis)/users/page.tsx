'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Mail, 
  Tag, 
  UserCircle, 
  Settings 
} from 'lucide-react';
import { Label } from "@/components/ui/label";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  address: string | null;
  roles: string[];
  status: 'active' | 'inactive' | 'pending';
  last_login: string | null;
}

const sampleUsers: UserProfile[] = [
  {
    id: 1,
    username: 'masego.molefe',
    email: 'masego.molefe@peepa.bw',
    first_name: 'Masego',
    last_name: 'Molefe',
    phone: '+267 72 345 6789',
    address: 'Plot 50, Government Enclave, Gaborone',
    roles: ['admin', 'analyst'],
    status: 'active',
    last_login: '2024-03-15T10:30:00Z'
  },
  {
    id: 2,
    username: 'thabo.ntate',
    email: 'thabo.ntate@peepa.bw',
    first_name: 'Thabo',
    last_name: 'Ntate',
    phone: '+267 74 567 8901',
    address: 'Block 7, Gaborone',
    roles: ['viewer'],
    status: 'pending',
    last_login: null
  },
  {
    id: 3,
    username: 'lesedi.ramotswa',
    email: 'lesedi.ramotswa@peepa.bw',
    first_name: 'Lesedi',
    last_name: 'Ramotswa',
    phone: '+267 73 456 7890',
    address: 'Broadhurst, Gaborone',
    roles: ['editor', 'manager'],
    status: 'inactive',
    last_login: '2024-02-20T15:45:00Z'
  }
];

export default function UsersPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [users, setUsers] = useState<UserProfile[]>(sampleUsers);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage and view user accounts</p>
        </div>
        <Button>Add New User</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {user.roles.map((role) => (
                        <Badge key={role} variant="secondary">{role}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        user.status === 'active' ? 'default' :
                        user.status === 'pending' ? 'outline' :
                        'destructive'
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedUser(user)}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      {selectedUser && (
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>User Details</DialogTitle>
                          </DialogHeader>
                          <UserDetails user={selectedUser} />
                        </DialogContent>
                      )}
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function UserDetails({ user }: { user: UserProfile }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <UserCircle className="h-5 w-5 text-primary" />
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-muted-foreground">Username</Label>
            <p className="font-medium">{user.username}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Full Name</Label>
            <p className="font-medium">{user.first_name} {user.last_name}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          <CardTitle>Contact Details</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-muted-foreground">Email</Label>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Phone</Label>
            <p className="font-medium">{user.phone || 'Not provided'}</p>
          </div>
          <div className="col-span-2">
            <Label className="text-muted-foreground">Address</Label>
            <p className="font-medium">{user.address || 'Not provided'}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Tag className="h-5 w-5 text-primary" />
          <CardTitle>User Roles</CardTitle>
        </CardHeader>
        <CardContent>
          {user.roles.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.roles.map((role) => (
                <Badge key={role} variant="default">{role}</Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No roles assigned</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          <CardTitle>Account Status</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-muted-foreground">Status</Label>
            <Badge 
              variant={
                user.status === 'active' ? 'default' :
                user.status === 'pending' ? 'outline' :
                'destructive'
              }
            >
              {user.status}
            </Badge>
          </div>
          <div>
            <Label className="text-muted-foreground">Last Login</Label>
            <p className="font-medium">
              {user.last_login 
                ? new Date(user.last_login).toLocaleString() 
                : 'Never logged in'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}