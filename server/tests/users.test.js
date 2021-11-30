const users = require('../users');

test('Adds a user to users array',() => {
    user = {id:"1",name:"teste",room:"sala_teste"}
    
    users.addUser(user);

    expect(users.users).toEqual(expect.arrayContaining([user]));
});

