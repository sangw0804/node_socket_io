const expect = require("expect");

let {generateMessage} = require("./message");

describe("generateMessage", () => {
    it("should generate correct message obj", () => {
        let from = "osw", text = "hi!!";
        let msg = generateMessage(from, text);

        expect(msg).toMatchObject({
            text,
            from
        });
        expect(typeof msg.createdAt).toBe('number');
    })
})