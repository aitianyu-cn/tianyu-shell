/**@format */

import fs from "fs";
import path from "path";
import readline from "readline";

export default function messageBundleLoader(this: any, source: any) {
    const textMap: any = {};
    const callback = this.async();

    const resBaseName = path.basename(this.resourcePath, ".properties");
    const resDirName = path.dirname(this.resourcePath);

    const readInterface = readline.createInterface({
        input: fs.createReadStream(`${resDirName}/${resBaseName}.properties`),
        terminal: false,
    });

    readInterface.on("line", (line) => {
        if (line.length > 0 && line[0] !== "#" && line[0] !== " ") {
            const splitIndex = line.indexOf("=");
            const key = line.substring(0, splitIndex).trimEnd();
            const text = line.substring(line.indexOf("=") + 1).trimStart();
            textMap[key] = text;
        }
    });

    readInterface.on("close", () => {
        // const moduleExp = `module.exports.getText=function(key){return _source[key]||key}`;

        // const output = `const _source=${JSON.stringify(textMap)};${moduleExp}`;
        const output = `module.exports=${JSON.stringify(textMap)}`;
        callback(null, output);
        readInterface.close();
    });
}
