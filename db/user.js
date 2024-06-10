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




export const createuser = (user) => {
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


export const login = (loginUser) => {
  const users = listUsers();

  const existUser = users.find(function (user) {
    return user.email === loginUser.email;
  });

  if (!existUser) {
    return false;
  }

  if (existUser.password !== loginUser.password) {
    return false;
  }

  localStorage.setItem("loggedUser", JSON.stringify(existUser));

  return existUser;
};
