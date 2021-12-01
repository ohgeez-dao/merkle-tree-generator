#!/usr/bin/env node

import fs from "fs";
import { FILE, ADDRESS, AMOUNT, QUOTE_PATH } from "./constants";
import { getMerkleProof, getMerkleRoot } from "./merkle-tree";

const main = async () => {
    let path = FILE;
    if (!path.startsWith("./") && !path.startsWith("../")) path = "./" + path;
    const list = fs
        .readFileSync(path, "utf8")
        .split(/[\r\n]{1,2}/)
        .map((line, index) => {
            if (index == 0) return null;
            const [address, amount] = line.split(",");
            if (!amount) return address;
            return [address, amount];
        })
        .filter(account => !!account);
    console.log("Root:\n  " + getMerkleRoot(list));
    console.log("Path:");
    let merklePath = JSON.stringify(getMerkleProof(list, AMOUNT ? [ADDRESS, AMOUNT] : ADDRESS));
    if (!QUOTE_PATH) merklePath = merklePath.replace(/"/g, "");
    console.log("  " + merklePath);
    fs.writeFileSync(path + ".json", JSON.stringify(list, null, 2), "utf8");
};
main().catch(console.error);
