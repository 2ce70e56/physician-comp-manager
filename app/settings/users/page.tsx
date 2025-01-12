'use client';

import { useState } from 'react';
import { Card, Title, Text, Button, TextInput, Select, SelectItem } from '@tremor/react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
  status: 'ACTIVE' | 'INACTIVE';
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Admin',
      email: 'john@example.com',
      role: 'ADMIN',
      status: 'ACTIVE'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'USER'
  });

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add API call here
    setUsers([...users, { ...newUser, id: Date.now().toString(), status: 'ACTIVE' } as User]);
    setShowAddForm(false);
    setNewUser({ name: '', email: '', role: 'USER' });
  };

  const handleStatusChange = async (userId: string, newStatus: 'ACTIVE' | 'INACTIVE') => {
    // Add API call here
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleRoleChange = async (userId: string, newRole: 'ADMIN' | 'MANAGER' | 'USER') => {
    // Add API call here
    setUsers(users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title>User Management</Title>
          <Text>Manage user access and permissions</Text>
        </div>
        <Button onClick={() => setShowAddForm(true)}>Add User</Button>
      </div>

      {showAddForm && (
        <Card className="mb-6">
          <form onSubmit={handleAddUser} className="space-y-4">
            <TextInput
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
            <TextInput
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
            <Select
              value={newUser.role}
              onValueChange={(value) => setNewUser({ ...newUser, role: value })}
              placeholder="Select Role"
              required
            >
              <SelectItem value="ADMIN">Administrator</SelectItem>
              <SelectItem value="MANAGER">Manager</SelectItem>
              <SelectItem value="USER">User</SelectItem>
            </Select>

            <div className="flex justify-end space-x-4">
              <Button variant="secondary" onClick={() => setShowAddForm(false)}>Cancel</Button>
              <Button type="submit">Add User</Button>
            </div>
          </form>
        </Card>
      )}

      <Card>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Select
                    value={user.role}
                    onValueChange={(value) => handleRoleChange(user.id, value as 'ADMIN' | 'MANAGER' | 'USER')}
                  >
                    <SelectItem value="ADMIN">Administrator</SelectItem>
                    <SelectItem value="MANAGER">Manager</SelectItem>
                    <SelectItem value="USER">User</SelectItem>
                  </Select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Select
                    value={user.status}
                    onValueChange={(value) => handleStatusChange(user.id, value as 'ACTIVE' | 'INACTIVE')}
                  >
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </Select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button 
                    size="xs" 
                    variant="secondary" 
                    onClick={() => handleStatusChange(user.id, user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')}
                  >
                    {user.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </main>
  );
}