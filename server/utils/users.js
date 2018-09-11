class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        let removedUser = null;
        this.users = this.users.filter((user) => {
            if(user.id === id) {
                removedUser = user;
            }
            return user.id !== id;
        });

        return removedUser;
    }

    getUser(id) {
        let foundUser = this.users.find((user) => user.id === id);
        return foundUser;
    }

    getUserList(room) {
        let users = this.users.filter((user) => user.room === room);
        let userNames = users.map((user) => user.name);

        return userNames;
    }
}

module.exports = {Users};