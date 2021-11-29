import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

export const getMerkleRoot = (entries: unknown[], getLeaf: (entry) => string) => {
    const leaves = entries.map(getLeaf);
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    return tree.getHexRoot();
};

export const getMerkleProof = (entries: unknown[], getLeaf: (entry) => string, target: unknown) => {
    const leaves = entries.map(getLeaf);
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    return tree.getHexProof(getLeaf(target));
};
