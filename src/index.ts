import fs from "fs";
import { utils } from "ethers";
import { FILE, ADDRESS, AMOUNT } from "./constants";
import { getMerkleProof, getMerkleRoot } from "./merkle-tree";

const getLeaf = entry => {
    if (typeof entry == "string") {
        if (entry.startsWith("0x")) return utils.keccak256(entry);
        return utils.keccak256(utils.toUtf8Bytes(entry));
    }
    return utils.solidityKeccak256(["address", "uint256"], [entry[0], utils.parseEther(entry[1])]);
};

const main = async () => {
    let path = FILE;
    if (!path.startsWith("./") && !path.startsWith("../")) path = "./" + path;
    const list = fs
        .readFileSync(path, "utf8")
        .split("\n")
        .map((line, index) => {
            if (index == 0) return null;
            const [address, amount] = line.split(",");
            if (!amount) return address;
            return [address, amount];
        })
        .filter(account => !!account);
    console.log("Root:\n  " + getMerkleRoot(list, getLeaf));
    console.log("Path:");
    console.log("  " + JSON.stringify(getMerkleProof(list, getLeaf, AMOUNT ? [ADDRESS, AMOUNT] : ADDRESS)));
    fs.writeFileSync(path + ".json", JSON.stringify(list), "utf8");
};
main().catch(console.error);
