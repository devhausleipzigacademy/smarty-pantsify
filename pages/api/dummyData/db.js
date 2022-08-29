const data = {
  users: require("./dummyData/userDummies"),
  resources: require("./dummyData/resourceDummies"),
  tracks: require("./dummyData/trackDummies"),
  tasks: require("./dummyData/taskDummies"),
};

module.exports = () => {
  return data;
};
