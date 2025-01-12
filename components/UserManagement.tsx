import React, { useState, useEffect } from 'react';
import {
  Card,
  Title,
  Text,
  Button,
  Select,
  SelectItem,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Input,
  Alert,
  AlertDescription
} from '@tremor/react';

// ... (previous interfaces remain the same)

export const UserManagement: React.FC = () => {
  // ... (previous state declarations remain the same)

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSaveUser = async (userData: Partial<User>) => {
    try {
      const response = await fetch(`/api/users/${editingUser?.id || ''}`, {
        method: editingUser ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error('Failed to save user');

      const savedUser = await response.json();
      
      if (editingUser) {
        setUsers(users.map(user => user.id === editingUser.id ? savedUser : user));
      } else {
        setUsers([...users, savedUser]);
      }
      
      setEditingUser(null);
      setErrorMessage('');
    } catch (error) {
      console.error('Error saving user:', error);
      setErrorMessage('Failed to save user. Please try again.');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete user');

      setUsers(users.filter(user => user.id !== userId));
      setShowDeleteConfirm(null);
      setErrorMessage('');
    } catch (error) {
      console.error('Error deleting user:', error);
      setErrorMessage('Failed to delete user. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        {/* ... (previous header and filters remain the same) */}

        {errorMessage && (
          <Alert color="red" className="mt-4">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <Table className="mt-6">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Department</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Last Login</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge color={user.role === 'admin' ? 'red' : user.role === 'manager' ? 'yellow' : 'blue'}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  <Badge color={user.status === 'active' ? 'green' : 'gray'}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="xs" onClick={() => setEditingUser(user)}>
                      Edit
                    </Button>
                    <Button 
                      size="xs" 
                      color="red" 
                      onClick={() => setShowDeleteConfirm(user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Edit/Add User Modal */}
      <Dialog open={!!editingUser || isAddingUser} onOpenChange={() => {
        setEditingUser(null);
        setIsAddingUser(false);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingUser ? 'Edit User' : 'Add New User'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input
                value={editingUser?.name || newUser.name}
                onChange={(e) => editingUser 
                  ? setEditingUser({...editingUser, name: e.target.value})
                  : setNewUser({...newUser, name: e.target.value})
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={editingUser?.email || newUser.email}
                onChange={(e) => editingUser
                  ? setEditingUser({...editingUser, email: e.target.value})
                  : setNewUser({...newUser, email: e.target.value})
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <Select
                value={editingUser?.role || newUser.role}
                onValueChange={(value: 'admin' | 'manager' | 'user') => editingUser
                  ? setEditingUser({...editingUser, role: value})
                  : setNewUser({...newUser, role: value})
                }
              >
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <Select
                value={editingUser?.department || newUser.department}
                onValueChange={(value) => editingUser
                  ? setEditingUser({...editingUser, department: value})
                  : setNewUser({...newUser, department: value})
                }
              >
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => handleSaveUser(editingUser || newUser)}
            >
              {editingUser ? 'Save Changes' : 'Add User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog 
        open={!!showDeleteConfirm} 
        onOpenChange={() => setShowDeleteConfirm(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              color="gray"
              onClick={() => setShowDeleteConfirm(null)}
            >
              Cancel
            </Button>
            <Button
              color="red"
              onClick={() => showDeleteConfirm && handleDeleteUser(showDeleteConfirm)}
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;