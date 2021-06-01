function findUserByUsername(userArray, username) {
    return userArray.find(function(user){
      return user.username === username;
    })
  }

  function removeUser(userArray, username) {
    let foundIndex = userArray.findIndex(function(user){
      return user.username === username;
    })
    if(foundIndex === -1) return;
  
    return userArray.splice(foundIndex,1)[0];
  }