import User from "../models/user.js";

// ---------------- ADMIN: GET PENDING STAFF ----------------
export const getPendingStaff = async (req, res) => {
  try {
    const staff = await User.find({
      role: "staff",
      status: "pending",
    }).select("-password");

    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- ADMIN: APPROVE / REJECT STAFF ----------------
export const updateStaffStatus = async (req, res) => {
  try {
    const { status } = req.body; // approved | rejected

    const staff = await User.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    staff.status = status;
    await staff.save();

    res.json({ message: `Staff ${status}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
