// /middleware/isAdmin.js
const isAdmin = async (user) => {
  return user && user.isAdmin;
};

export default isAdmin;
