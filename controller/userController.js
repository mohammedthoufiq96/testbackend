const getUsers = (req, res) => {
    // Just returning a mock response for users
    res.status(200).json({
      users: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ]
    });
  };
  
  module.exports = { getUsers };

  




