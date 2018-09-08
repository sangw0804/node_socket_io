const expect = require("expect");

let {generateMessage, generateLocationMessage} = require("./message");

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
});

describe("generateLocationMessage", () => {
    it("should generate correct location message obj", () => {
        let from = "osw", lat = 31.1111, lng = -123.222;
        let locMsg = generateLocationMessage(from, lat, lng);

        expect(locMsg.from).toBe(from);
        expect(typeof locMsg.createdAt).toBe("number");
        expect(locMsg.url).toMatch(`https://www.google.com/maps?q=${lat},${lng}`);
    });
});