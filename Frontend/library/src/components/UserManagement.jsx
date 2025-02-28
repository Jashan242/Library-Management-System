import React, { useEffect, useState } from "react";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [selectedOption, setSelectedOption] = useState("new");
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "user" });
    const [selectedUser, setSelectedUser] = useState(null);
    const [role, setRole] = useState("");
    const [status, setStatus] = useState(false);

    // Fetch existing users
    useEffect(() => {
        if (selectedOption === "existing") {
            fetch("http://localhost:3030/user", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => res.json())
                .then((data) => setUsers(data))
                .catch((error) => console.error("Error fetching users:", error));
        }
    }, [selectedOption]);

    // Handle new user input
    const handleNewUserChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    // Add New User
    const addUser = () => {
        fetch("http://localhost:3030/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                setNewUser({ name: "", email: "", role: "user" });
            })
            .catch((error) => console.error("Error adding user:", error));
    };

    // Update User Role
    const updateUserRole = () => {
        fetch("http://localhost:3030/user/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: selectedUser, role }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                window.location.reload();
            })
            .catch((error) => console.error("Error updating role:", error));
    };

    // Delete User
    const deleteUser = (userId) => {
        fetch(`http://localhost:3030/user/delete/${userId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                setUsers(users.filter((user) => user._id !== userId));
            })
            .catch((error) => console.error("Error deleting user:", error));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-center">User Management</h2>

            {/* Radio Buttons */}
            <div className="flex justify-center gap-6 mb-6">
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="userType"
                        value="new"
                        checked={selectedOption === "new"}
                        onChange={() => setSelectedOption("new")}
                        className="mr-2"
                    />
                    New User
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="userType"
                        value="existing"
                        checked={selectedOption === "existing"}
                        onChange={() => setSelectedOption("existing")}
                        className="mr-2"
                    />
                    Existing User
                </label>
            </div>

            {/* New User Form */}
            {selectedOption === "new" && (
                <div className="p-4 border rounded-lg bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Add New User</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={handleNewUserChange}
                        className="w-full p-2 mb-3 border rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={handleNewUserChange}
                        className="w-full p-2 mb-3 border rounded"
                    />
                    <select
                        name="role"
                        value={newUser.role}
                        onChange={handleNewUserChange}
                        className="w-full p-2 mb-3 border rounded"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button onClick={addUser} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Add User
                    </button>
                </div>
            )}

            {/* Existing Users List */}
            {selectedOption === "existing" && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Manage Existing Users</h3>
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Role</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="text-center">
                                    <td className="border p-2">{user.name}</td>
                                    <td className="border p-2">{user.email}</td>
                                    <td className="border p-2">{user.role}</td>
                                    <td className="border p-2 flex justify-center gap-3">
                                        {/* Update Role Dropdown */}
                                        <select
                                            className="border p-1"
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="">Change Role</option>
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        <button
                                            onClick={() => {
                                                setSelectedUser(user._id);
                                                updateUserRole();
                                            }}
                                            className="bg-green-500 text-white p-1 px-3 rounded hover:bg-green-600"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => deleteUser(user._id)}
                                            className="bg-red-500 text-white p-1 px-3 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
