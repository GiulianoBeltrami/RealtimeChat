
const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  const user = { id, name, room };

  users.push(user);

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

class Users{

  users = []

  addUser = ({ id, name, room }) => {

    this.#checkIfFieldsAreFilled(name,room);

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
  
    this.#checkIfUserExists(name,room);
  
    const newUser = { id, name, room };
  
    this.users.push(newUser);
  
    return { newUser };
  }

  #checkIfUserExists(name,room){
    const userExists = this.users.find((user) => user.room === room && user.name === name);
    if (userExists) {
      throw Error("Username is taken!");
    }
  }

  #checkIfFieldsAreFilled(name,room){
    if(!name || !room){
       throw { error: 'Username and room are required.' };
    }
  }

}

module.exports={users,addUser, removeUser, getUser, getUsersInRoom}
module.exports=Users;

usersClass = new Users();
console.log(usersClass.addUser({id:"teste",name:"abc",room:"2"}));
