const expect = require("expect");
const {Users} = require("./users");

describe("Users", () => {
    let users = new Users();

    beforeEach(() => {
        users.users = [
            {
                id: "1",
                name: "james",
                room: "Developers"
            },{
                id: "2",
                name: "cloe",
                room: "Designers"
            },{
                id: "3",
                name: "max",
                room: "Developers"
            }
        ];
    });

    it("should make new user", () => {
        let users = new Users();
        let user = users.addUser("123", "james", "Developers");

        expect(users.users).toEqual([user]);
    });

    it("should return user names in specific room", () => {
        let userNames = users.getUserList("Developers");

        expect(userNames).toEqual(["james", "max"]);
    });

    it("should remove user with exist id", () => {
        let removedUser = users.removeUser("1");

        expect(removedUser.id).toBe("1");
        expect(users.users.length).toBe(2);
    });

    it("should not remove user with absent id", () => {
        let removedUser = users.removeUser("14");

        expect(removedUser).toBeNull();
        expect(users.users.length).toBe(3);
    });

    it("should find user with exist id", () => {
        let foundUser = users.getUser("1");

        expect(foundUser).toEqual(users.users[0]);
    });

    it("should not find user with absent id", () => {
        let foundUser = users.getUser("123");

        expect(foundUser).toBeUndefined();
    });
});