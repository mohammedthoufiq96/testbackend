// controllers/userController.js

const getUsers = async (req, res) => {
  try {
    // Mock user data (replace later with DB query if needed)
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ];

    return res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message,
    });
  }
};

module.exports = {
  getUsers,
};




  







