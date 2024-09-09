const { User } = require("../models/userModel");

const redis = require("redis");

const client = redis.createClient();

client.on("error", (err) => {
  console.log("There was an error connecting to my redis cluster", err);
  console.log("Sending command to Redis:", commandName, args);
});

client.connect();

client.set("isNewUserAdded", "true");

// This function gets me all the users present inside the MongoDB collection Users
exports.getAllUsers = async (req, res) => {
  const isNewUserAdded = await client.get("isNewUserAdded");
  try {
    if (isNewUserAdded === "true") {
      const users = await User.find({ isDeleted: false });
      await client.set("isNewUserAdded", "false");
      await client.set("user", JSON.stringify(users));
      res.status(200).json({
        success: true,
        data: users,
      });
    } else {
      // fetch and return all the users from Redis
      const users = await client.get("user");

      return res.status(200).json({
        success: true,
        data: JSON.parse(users),
      });
    }
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

// This function updates a user by its id
exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, body);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error occured",
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await User.find({ role: "", isDeleted: false });

    res.status(200).json({
      success: true,
      data: users,
    });
    console.log(users);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
    console.log(err);
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id, { isDeleted: true });

    user.save();

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
