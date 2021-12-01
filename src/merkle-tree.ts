import { utils } from "ethers";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

export type Entry = string | string[];

const getLeaf = (entry: Entry) => {
    if (typeof entry == "string") {
        if (entry.startsWith("0x")) return utils.keccak256(entry);
        return utils.keccak256(utils.toUtf8Bytes(entry));
    }
    return utils.solidityKeccak256(["address", "uint256"], [entry[0], utils.parseEther(entry[1])]);
};

export const getMerkleRoot = (entries: Entry[]) => {
    const leaves = entries.map(getLeaf);
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    return tree.getHexRoot();
};

export const getMerkleProof = (entries: Entry[], target: Entry) => {
    const leaves = entries.map(getLeaf);
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    return tree.getHexProof(getLeaf(target));
};
