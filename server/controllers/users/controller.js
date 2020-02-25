const currentUser = services => async ({ sub, email }) => {
  const { userService } = services;

  const user = await userService.find(sub);

  if (user) {
    return { data: user, status: 200 };
  } else {
    const profile = {
      email,
      sub
    };
    const newUser = await userService.createUser(profile);
    delete newUser.sub;
    return { data: newUser, status: 200 };
  }
};

const userUpdate = services => async ({ sub, changes }) => {
  const { userService } = services;

  const user = await userService.find(sub);
  const updatedUser = await userService.updateUser(user, changes);

  if (updatedUser) {
    return {
      status: 200,
      data: updatedUser
    };
  } else {
    return {
      status: 200
    };
  }
};

const searchEmail = services => async email => {
  const { userService } = services;
  const regexp = new RegExp(email, "g");

  const users = await userService.get({ email: regexp }, "_id email name");

  return users;
};

module.exports = services => {
  return {
    currentUser: currentUser(services),
    userUpdate: userUpdate(services),
    searchEmail: searchEmail(services)
  };
};
