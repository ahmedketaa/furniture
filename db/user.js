/// function to get list of users
export const listUsers = () => {
  let users = localStorage.getItem("users");

  if (!users) {
    users = []; ///return empty array
  } else {
    users = JSON.parse(users);
  }

  return users;
};

// for create user & admin by sending role with user object from outside the function
export const createUser = (user) => {
  const users = listUsers();

  let id = 1;
  if (users.length > 0) {
    id = users[users.length - 1].id + 1;
  }

  user.id = id;

  users.push(user);
  console.log("test new user array ",user);

  localStorage.setItem("users", JSON.stringify(users));
};

export const userLogin = (loginUser) => {
  const users = listUsers();

  const existUser = users.find(function (user) {
    return user.email === loginUser.email && user.role === "user";
  });

  if (!existUser) {
    return false;
  }

  if (existUser.password !== loginUser.password) {
    return false;
  }

  localStorage.setItem("loggedUser", JSON.stringify(existUser));

  // if user logged in remove logged admin if exists
  localStorage.removeItem("loggedAdmin", JSON.stringify(existUser));

  return existUser;
};

export const adminLogin = (loginAdmin) => {
  const users = listUsers();

  const existUser = users.find(function (user) {
    return user.email === loginAdmin.email && user.role === "admin";
  });

  if (!existUser) {
    return false;
  }

  if (existUser.password !== loginAdmin.password) {
    return false;
  }

  localStorage.setItem("loggedAdmin", JSON.stringify(existUser));

  // if admin logged in remove logged user if exists
  localStorage.removeItem("loggedUser", JSON.stringify(existUser));

  return existUser;
};
