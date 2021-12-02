class Users{

  users = []

  addUser = ({ id, name, room }) => {

    this.#checkIfFieldsAreFilled(name,room);

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
  
    this.#checkIfUserNameAlreadyExistsOnRoom(name,room);
  
    const user = { id, name, room };
  
    this.users.push(user);
  
    return { user };
  }


  removeUser = (id) => {
    const userIndex =  this.#findUserIndexInUsersArray(id);
  
    if(this.#isUserFound(userIndex)){
      return this.#removeElementFromUsersArray(userIndex);
    }
  }


  getUser = (id) => { 
    return this.#findUserById(id);
  }


  getUsersInRoom = (room) => {
    return this.#findAllUsersInRoom(room);
  }


  #checkIfUserNameAlreadyExistsOnRoom(name,room){
    const userExists = this.users.find((user) => user.room === room && user.name === name);
    if (userExists) {
      throw new Error("Username is taken!");
    }
  }


  #checkIfFieldsAreFilled(name,room){
    if(!name || !room){
       throw new Error('Username and room are required.');
    }
  }


  #findUserIndexInUsersArray(id){
    return this.users.findIndex((user) => user.id === id);
  }


  #removeElementFromUsersArray(index){
    return this.users.splice(index,1)[0];
  }


  #isUserFound(index){
    return index!== -1;
  }


  #findUserById(id){
    return this.users.find((user) => user.id === id);
  }


  #findAllUsersInRoom(room){
    return this.users.filter(user => user.room === room);
  }

}

module.exports=Users;

