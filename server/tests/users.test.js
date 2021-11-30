const users = require('../users');


test('Adds a user to users array',() => {
    user = {id:"1",name:"teste",room:"sala_teste"};
    
    users.addUser(user);

    expect(users.users).toEqual(expect.arrayContaining([user]));
});


test('Remove a user from users array', () =>{
    user = {id:"2",name:"teste2",room:"sala_teste2"};
    users.users.push(user);

    users.removeUser(user.id);

    expect(users.users).toEqual(expect.not.arrayContaining([user]));
});


test('Getting user information from users array',() => {
    user = {id:"3",name:"teste3",room:"sala_teste3"};
    users.users.push(user);

    const userInformation = users.getUser(user.id);

    expect(userInformation).toEqual(user);
});


test('Getting all users in the same room from users array',() =>{
    user = {id:"4",name:"teste4",room:"sala_teste4"};
    users.users.push(user);

    const usersInTheRoom = users.getUsersInRoom("sala_teste4");

    expect(usersInTheRoom).toEqual(expect.arrayContaining([user]))
})