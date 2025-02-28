const Membership = require("../models/membership");
const User = require("../models/user");

// ➤ Create a New Membership (All Fields Mandatory)
exports.createMembership = async (req, res) => {
    try {
        const { userId, name, contactNumber, contactAddress, aadharCardNo, type = "6months", startDate } = req.body;

        // Validate mandatory fields
        if (!userId || !name || !contactNumber || !contactAddress || !aadharCardNo || !startDate) {
            return res.status(400).json({ error: "All fields are mandatory" });
        }

        // Calculate end date based on membership type
        let endDate = new Date(startDate);
        if (type === "6months") {
            endDate.setMonth(endDate.getMonth() + 6);
        } else if (type === "1year") {
            endDate.setFullYear(endDate.getFullYear() + 1);
        } else if (type === "2years") {
            endDate.setFullYear(endDate.getFullYear() + 2);
        }

        // Create new membership entry
        const newMembership = new Membership({
            userId,
            name,
            contactNumber,
            contactAddress,
            aadharCardNo,
            type,
            startDate,
            endDate,
            status: "active",
            amountPending: 0
        });

        await newMembership.save();
        res.status(201).json({ message: "Membership added successfully", membership: newMembership });

    } catch (error) {
        console.error("Error creating membership:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ➤ Get Membership by ID (for Update)
exports.getMembershipById = async (req, res) => {
    try {
        const membership = await Membership.findById(req.params.id);
        if (!membership) return res.status(404).json({ error: "Membership not found" });

        res.status(200).json(membership);
    } catch (error) {
        console.error("Error fetching membership:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ➤ Update Membership (Extend or Cancel)
exports.updateMembership = async (req, res) => {
    try {
        const { membershipId, extend, cancel } = req.body;

        // Validate mandatory membership ID
        if (!membershipId) {
            return res.status(400).json({ error: "Membership ID is required" });
        }

        let membership = await Membership.findById(membershipId);
        if (!membership) return res.status(404).json({ error: "Membership not found" });

        if (cancel) {
            // If cancel is true, set status to 'cancelled'
            membership.status = "cancelled";
            await membership.save();
            return res.status(200).json({ message: "Membership cancelled successfully", membership });
        }

        if (extend) {
            // Extend membership (default: 6 months)
            let newEndDate = new Date(membership.endDate);
            newEndDate.setMonth(newEndDate.getMonth() + 6);
            membership.endDate = newEndDate;
            await membership.save();
            return res.status(200).json({ message: "Membership extended by 6 months", membership });
        }

        res.status(400).json({ error: "Invalid update request. Specify 'extend' or 'cancel'." });

    } catch (error) {
        console.error("Error updating membership:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all memberships
exports.getAllMemberships = async (req, res) => {
    try {
        const memberships = await Membership.find().populate("userId", "name email");
        return res.status(200).json(memberships);
    } catch (error) {
        console.error("Error fetching memberships:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
