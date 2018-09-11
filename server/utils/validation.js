const isRealString = (target) => {
    return typeof target === "string" && target.trim().length > 0;
}

module.exports = { isRealString };