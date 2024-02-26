/**@format */

const fs = require("fs");
const path = require("path");
const tsJest = require("ts-jest");

module.exports = {
    process: (source, sourcePath, options) => {
        const textMap = {};
        const dirName = path.dirname(sourcePath);
        const fileName = path.join(dirName, "message.properties");
        const lines = fs.readFileSync(fileName, "utf-8").split("\n");
        for (const line of lines) {
            if (line.length > 0 && line[0] !== "#" && line[0] !== " ") {
                const key = line.substring(0, line.indexOf("="));
                const value = line.substring(line.indexOf("=") + 1);
                textMap[key] = value;
            }
        }

        const target = source.replace("{}", JSON.stringify(textMap));
        console.log(JSON.stringify(source));
        console.log(JSON.stringify(textMap));
        // return tsJest.(target, sourcePath, config, options);
        return {
            code: source.replace("{}", JSON.stringify(textMap)),
            // code: JSON.stringify(textMap),
        };
        // return ;
        // return JSON.stringify(textMap);
    },
};
