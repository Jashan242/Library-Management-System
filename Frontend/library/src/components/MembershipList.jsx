import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MembershipList = () => {
    const [memberships, setMemberships] = useState([]);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        fetch("http://localhost:3030/membership/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}` // Uncomment if authentication is needed
            }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to fetch memberships");
            }
            return res.json();
        })
        .then((data) => setMemberships(data))
        .catch((error) => console.error("Error fetching memberships:", error));
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-purple-500 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">📋 Active Memberships</h2>
                
                <div className="overflow-x-auto">
                    <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="border p-3">Membership ID</th>
                                <th className="border p-3">Name</th>
                                <th className="border p-3">Contact</th>
                                <th className="border p-3">Address</th>
                                <th className="border p-3">Aadhar No</th>
                                <th className="border p-3">Start Date</th>
                                <th className="border p-3">End Date</th>
                                <th className="border p-3">Status</th>
                                <th className="border p-3">Amount Pending</th>
                            </tr>
                        </thead>
                        <tbody>
                            {memberships.length > 0 ? (
                                memberships.map((member, index) => (
                                    <tr
                                        key={member._id}
                                        className={`text-center ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"} hover:bg-gray-200 transition-all`}
                                    >
                                        <td className="border p-3">{member._id}</td>
                                        <td className="border p-3">{member.name}</td>
                                        <td className="border p-3">{member.contact}</td>
                                        <td className="border p-3">{member.address}</td>
                                        <td className="border p-3">{member.aadhar}</td>
                                        <td className="border p-3">{new Date(member.startDate).toLocaleDateString()}</td>
                                        <td className="border p-3">{new Date(member.endDate).toLocaleDateString()}</td>
                                        <td className={`border p-3 font-semibold ${member.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                                            {member.status}
                                        </td>
                                        <td className="border p-3">{member.fine || "0"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="py-4 text-center text-gray-600">No memberships found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
                    >
                        Back
                    </button>

                    <button
                        onClick={() => window.location.reload()}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
                    >
                        Refresh
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MembershipList;
