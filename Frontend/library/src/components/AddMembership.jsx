import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMembership = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        contactName: "",
        contactAddress: "",
        aadharCardNo: "",
        startDate: "",
        endDate: "",
        type: "6months",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:3030/membership/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to add membership");
            }

            setMessage("✅ Membership added successfully!");
            setFormData({
                firstName: "",
                lastName: "",
                contactName: "",
                contactAddress: "",
                aadharCardNo: "",
                startDate: "",
                endDate: "",
                type: "6months",
            });

        } catch (error) {
            console.error("Error adding membership:", error);
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-500 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">📜 Add Membership</h2>

                {message && <p className="text-center text-green-700 font-semibold">{message}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="firstName" placeholder="First Name" className="input-field" value={formData.firstName} onChange={handleChange} required />
                    <input type="text" name="lastName" placeholder="Last Name" className="input-field" value={formData.lastName} onChange={handleChange} required />
                    <input type="text" name="contactName" placeholder="Contact Name" className="input-field" value={formData.contactName} onChange={handleChange} required />
                    <input type="text" name="contactAddress" placeholder="Contact Address" className="input-field" value={formData.contactAddress} onChange={handleChange} required />
                    <input type="text" name="aadharCardNo" placeholder="Aadhar Card No" className="input-field" value={formData.aadharCardNo} onChange={handleChange} required />

                    <label className="block font-semibold text-gray-700">Start Date:</label>
                    <input type="date" name="startDate" className="input-field" value={formData.startDate} onChange={handleChange} required />

                    <label className="block font-semibold text-gray-700">End Date:</label>
                    <input type="date" name="endDate" className="input-field" value={formData.endDate} onChange={handleChange} required />

                    <fieldset className="border p-3 rounded-md">
                        <legend className="text-sm font-medium">Membership Type</legend>
                        <label className="block"><input type="radio" name="type" value="6months" checked={formData.type === "6months"} onChange={handleChange} /> 6 Months</label>
                        <label className="block"><input type="radio" name="type" value="1year" checked={formData.type === "1year"} onChange={handleChange} /> 1 Year</label>
                        <label className="block"><input type="radio" name="type" value="2years" checked={formData.type === "2years"} onChange={handleChange} /> 2 Years</label>
                    </fieldset>

                    <div className="flex justify-between">
                        <button type="button" onClick={() => navigate(-1)} className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300">
                            Back
                        </button>

                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300" disabled={loading}>
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMembership;
