const Users = require('../users');
users = new Users();


test('Adds a user to users array',() => {
    user = {id:"1",name:"teste",room:"sala_teste"};
    
    users.addUser(user);
    
    expect(users.users).toEqual(expect.arrayContaining([user]));
});


test('Adds a repetead user to users array',() => {

    userOne = {id:"2",name:"teste2",room:"sala_teste"};
    userTwo = {id:"3",name:"teste2",room:"sala_teste"};

    users.addUser(userOne);

    expect(users.addUser(userTwo)).toEqual(expect.not.arrayContaining([userTwo]));
});


test('Remove a user from users array', () =>{
    user = {id:"4",name:"teste4",room:"sala_teste4"};
    users.users.push(user);

    users.removeUser(user.id);

    expect(users.users).toEqual(expect.not.arrayContaining([user]));
});


test('Getting user information from users array',() => {
    user = {id:"10",name:"teste10",room:"sala_teste3"};
    users.users.push(user);

    const userInformation = users.getUser(user.id);

    expect(userInformation).toEqual(user);
});


test('Getting all users in the same room from users array',() =>{
    user = {id:"5",name:"teste5",room:"sala_teste5"};
    users.users.push(user);

    const usersInTheRoom = users.getUsersInRoom(user.room);

    expect(usersInTheRoom).toEqual(expect.arrayContaining([user]))
})