import User from "../models/userModel.js";
import Notice from "../models/notification.js";
import { createJWT } from "../utils/index.js";
import Project from "../models/projectModel.js";

const handleError = (error, res) => {
  console.error(error);
  res.status(400).json({ status: false, message: error.message });
};

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      isAdmin,
      isManager,
      isDeveloper,
      role,
      title,
    } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      isAdmin,
      isManager,
      isDeveloper,
      role,
      title,
      profile: {},
    });

    if (user) {
      if (isAdmin) createJWT(res, user._id);

      user.password = undefined;
      return res.status(201).json(user);
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Invalid user data" });
    }
  } catch (error) {
    handleError(error, res);
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password." });
    }

    if (!user.isActive) {
      return res.status(401).json({
        status: false,
        message: "User account has been deactivated, contact the administrator",
      });
    }

    if (await user.matchPassword(password)) {
      createJWT(res, user._id);
      user.password = undefined;
      return res.status(200).json(user);
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password" });
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    handleError(error, res);
  }
};

export const getEmployeeList = async (req, res) => {
  try {
    const users = await User.find().select("name title role email isActive");
    res.status(200).json(users);
  } catch (error) {
    handleError(error, res);
  }
};

export const getNotificationsList = async (req, res) => {
  try {
    const { userId } = req.user;
    const notice = await Notice.find({
      team: userId,
      isRead: { $nin: [userId] },
    }).populate("task", "title");

    res.status(200).json(notice);
  } catch (error) {
    handleError(error, res);
  }
};



export const updateUserProfile = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;
    const { _id, ...updateData } = req.body;

    const id =
      isAdmin && userId === _id
        ? userId
        : isAdmin && userId !== _id
        ? _id
        : userId;

    const user = await User.findById(id);

    if (user) {
      // Update profile image URL if provided
      if (updateData.profile?.imageUrl) {
        user.profile.imageUrl = updateData.profile.imageUrl;
      }

      user.name = updateData.name || user.name;
      user.title = updateData.title || user.title;
      user.role = updateData.role || user.role;
      user.isAdmin = updateData.isAdmin ?? user.isAdmin;
      user.isManager = updateData.isManager ?? user.isManager;
      user.isDeveloper = updateData.isDeveloper ?? user.isDeveloper;

      const updatedUser = await user.save();
      updatedUser.password = undefined;

      res.status(200).json({
        status: true,
        message: "Profile Updated Successfully.",
        user: updatedUser,
      });
    } else {
      res.status(404).json({ status: false, message: "User not found" });
    }
  } catch (error) {
    handleError(error, res);
  }
};



export const markNotificationRead = async (req, res) => {
  try {
    const { userId } = req.user;
    const { isReadType, id } = req.query;

    if (isReadType === "all") {
      await Notice.updateMany(
        { team: userId, isRead: { $nin: [userId] } },
        { $push: { isRead: userId } },
        { new: true }
      );
    } else {
      await Notice.findOneAndUpdate(
        { _id: id, isRead: { $nin: [userId] } },
        { $push: { isRead: userId } },
        { new: true }
      );
    }

    res.status(200).json({ status: true, message: "Done" });
  } catch (error) {
    handleError(error, res);
  }
};

export const changeUserPassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);

    if (user) {
      user.password = req.body.password;
      await user.save();
      user.password = undefined;

      res.status(200).json({
        status: true,
        message: "Password changed successfully.",
      });
    } else {
      res.status(404).json({ status: false, message: "User not found" });
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const activateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (user) {
      user.isActive = req.body.isActive;
      await user.save();

      res.status(200).json({
        status: true,
        message: `User account has been ${
          user.isActive ? "activated" : "disabled"
        }`,
      });
    } else {
      res.status(404).json({ status: false, message: "User not found" });
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ status: true, message: "User deleted successfully" });
  } catch (error) {
    handleError(error, res);
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userProfile = await User.findById(req.user.id).select("-password");
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


//edit personal info
export const profileinfo = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;
    const { _id, personalInformation, workInformation, contactInformation, hierarchyInformation, identityInformation, resignationInformation, bankInformation } = req.body; // Extract new fields

    const id =
      isAdmin && userId === _id
        ? userId
        : isAdmin && userId !== _id
        ? _id
        : userId;

    const user = await User.findById(id);

    if (user) {
      // Update personalInformation if present
      if (personalInformation) {
        user.profile.personalInformation = {
          ...user.profile.personalInformation,
          ...personalInformation,
        };
      }

      // Update workInformation if present
      if (workInformation) {
        user.profile.workInformation = {
          ...user.profile.workInformation,
          ...workInformation,
        };
      }

      // Update contactInformation if present
      if (contactInformation) {
        user.profile.contactInformation = {
          ...user.profile.contactInformation,
          ...contactInformation,
        };
      }

      // Update bankInformation if present
      if (bankInformation) {
        user.profile.bankInformation = {
          ...user.profile.bankInformation,
          ...bankInformation,
        };
      }

      // Update hierarchyInformation if present
      if (hierarchyInformation) {
        user.profile.hierarchyInformation = {
          ...user.profile.hierarchyInformation,
          ...hierarchyInformation,
        };
      }

      // Update identityInformation if present
      if (identityInformation) {
        user.profile.identityInformation = {
          ...user.profile.identityInformation,
          ...identityInformation,
        };
      }

      // Update resignationInformation if present
      if (resignationInformation) {
        user.profile.resignationInformation = {
          ...user.profile.resignationInformation,
          ...resignationInformation,
        };
      }

      const updatedUser = await user.save();
      updatedUser.password = undefined; // Exclude password from the response

      res.status(200).json({
        status: true,
        message: "Profile Information Updated Successfully.",
        user: updatedUser,
      });
    } else {
      res.status(404).json({ status: false, message: "User not found" });
    }
  } catch (error) {
    handleError(error, res);
  }
};





//get user detail
export const getProfileInfo = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;
    const { _id } = req.query;

    const id = isAdmin && userId === _id ? userId : isAdmin ? _id : userId;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const {
      personalInformation,
      workInformation,
      contactInformation,
      hierarchyInformation,
      identityInformation,
      resignationInformation,
      bankInformation,
    } = user.profile;

    res.status(200).json({
      status: true,
      message: "Profile Information Fetched Successfully.",
      personalInformation,
      workInformation,
      contactInformation,
      hierarchyInformation,
      identityInformation,
      resignationInformation,
      bankInformation,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getManager = async (req, res) => {
  try {
    const manager = await User.find({
      $or: [{ role: "Manager" }], // Assuming 'role' field stores roles
    }).select("name _id role"); // Only select necessary fields like name and _id
    if (!manager || manager.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No approvers found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Manager fetched successfully",
      manager,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};



export const getManagerById = async (req, res) => {
  try {
    const { id } = req.params; 

    // Fetch the manager by ID and select only the necessary fields
    const manager = await User.findById(id).select("name _id role ");

    // Check if manager exists
    if (!manager) {
      return res.status(404).json({
        status: false,
        message: "Manager not found",
      });
    }

    // Return the manager data
    res.status(200).json({
      status: true,
      message: "Manager fetched successfully",
      manager,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};


export const getDeveloper = async (req, res) => {
  try {
    // Fetch all users who have the role of Developer
    const developers = await User.find({
      $or: [{ role: "Developer" }], // Assuming 'role' field stores roles
    }).select("name _id role"); // Only select necessary fields like name, _id, and role
    
    // Check if developers exist
    if (!developers || developers.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No developers found",
      });
    }
    
    // Return the developer data
    res.status(200).json({
      status: true,
      message: "Developers fetched successfully",
      developers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

