// controllers/userController.js

// Controller functions for user management
// Using function-module style instead of class

export const registerUser = async (req, res, userService) => {
  try {
    const userData = req.body;
    const newUser = await userService.register(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res, userService) => {
  try {
    const { email, password } = req.body;
    const token = await userService.login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res, userService) => {
  try {
    const userId = req.user.id; // Assuming middleware sets req.user
    const userProfile = await userService.getProfile(userId);
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res, userService) => {
  try {
    const userId = req.user.id; // Assuming middleware sets req.user
    const updatedData = req.body;
    const updatedUser = await userService.update(userId, updatedData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


