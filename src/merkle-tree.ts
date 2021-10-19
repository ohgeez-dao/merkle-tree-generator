import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

export const getMerkleRoot = (accounts: string[]) => {
    const leaves = accounts.map(v => keccak256(v));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    return tree.getHexRoot();
};

export const getMerkleProof = (accounts: string[], me: string) => {
    const leaves = accounts.map(v => keccak256(v));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    return tree.getHexProof(keccak256(me));
};
