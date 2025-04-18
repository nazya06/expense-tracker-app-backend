import { User } from "../models/index.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "email"],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error getting user", error });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const { email } = req.body;

    // user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    res.json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();

    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};
