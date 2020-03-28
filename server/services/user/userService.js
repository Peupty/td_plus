const createUser = User => profile => {
  if (!profile) {
    throw new Error(`Profile: ${profile} loginStrategy: ${loginStrategy}`);
  }

  const user = new User(profile);

  return user.save();
};

const find = User => sub => {
  return User.findOne({ sub }, "-sub");
};

const findByEmail = User => email => {
  return User.findOne({ email: email });
};

const findById = User => id => {
  return User.findById(id);
};

const get = User => (query, projection = "-sub") => {
  return User.find(query, projection);
};

const updateUser = async (user, changes) => {
  Object.assign(user, changes);

  return user.save();
};

const getId = User => email => {
  return User.findOne({ email }, "_id");
};

const getAllFriends = User => async sub => {
  const user = await User.find({ sub });
  const friends = await User.find({}, "name email _id")
    .where("_id")
    .in(user.friends)
    .exec();

  return friends;
};

const updateUsers = User => async (users, cb) => {
  return await Promise.all(
    users.map(async id => {
      const user = await findById(User)(id);
      return cb(user);
    })
  );
};

module.exports = User => {
  return {
    createUser: createUser(User),
    find: find(User),
    findById: findById(User),
    get: get(User),
    updateUser,
    findByEmail: findByEmail(User),
    getId: getId(User),
    getAllFriends: getAllFriends(User),
    updateUsers: updateUsers(User)
  };
};
