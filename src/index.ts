import fs from "fs";
import { getMerkleProof, getMerkleRoot } from "./merkle-tree";
import readlineSync from "readline-sync";

const main = async () => {
    let filePath = readlineSync.question("File path: ");
    const address = readlineSync.question("Address: ");
    if (!filePath.startsWith("./") && !filePath.startsWith("../")) filePath = "./" + filePath;
    const accounts = fs
        .readFileSync(filePath, "utf8")
        .split("\n")
        .map((line, index) => {
            if (index == 0) return null;
            return line.split(",")[0];
        })
        .filter(account => !!account);
    console.log("Root: " + getMerkleRoot(accounts));
    console.log("Path:");
    console.log(getMerkleProof(accounts, address));
    fs.writeFileSync(filePath + ".json", JSON.stringify(accounts), "utf8");
};
main().catch(console.error);
