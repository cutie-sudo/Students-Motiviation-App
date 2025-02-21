import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Admin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [category, setCategory] = useState('');

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            
            {/* User Management Section */}
            <Card>
                <CardContent>
                    <h2 className="text-xl mb-2">User Management</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input input-bordered w-full mb-2"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input input-bordered w-full mb-2"
                    />
                    <Button className="btn btn-primary mb-2">Add User</Button>
                    <Button className="btn btn-warning mb-2">Deactivate User</Button>
                </CardContent>
            </Card>

            {/* Content Management Section */}
            <Card className="mt-4">
                <CardContent>
                    <h2 className="text-xl mb-2">Content Management</h2>
                    <input
                        type="text"
                        placeholder="Content Title"
                        className="input input-bordered w-full mb-2"
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="select select-bordered w-full mb-2"
                    >
                        <option value="">Select Category</option>
                        <option value="DevOps">DevOps</option>
                        <option value="FullStack">FullStack</option>
                        <option value="Front-End">Front-End</option>
                        <option value="Back-End">Back-End</option>
                    </select>
                    <Button className="btn btn-success mb-2">Approve Content</Button>
                    <Button className="btn btn-danger mb-2">Flag Content</Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Admin;
