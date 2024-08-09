import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory as carIDL } from "../../../declarations/Cars_backend/Cars_backend.did.js";
// import { idlFactory as ledgerIDL } from "../../../declarations/ledger_canister/ledger_canister.did.js";

const CARS_BACKEND_CANISTER = "bkyz2-fmaaa-aaaaa-qaaaq-cai";
const LEDGER_CANISTER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai";
const HOST = "http://localhost:4943";

// PROBABLY NEED TO ADJUST CANISTERIDS
export async function getCarCanister() {
    return await getCanister(CARS_BACKEND_CANISTER, carIDL);
}

// export async function getLedgerCanister() {
//     return getCanister(LEDGER_CANISTER_ID, ledgerIDL);
// }

async function getCanister(canisterId, idl) {
    const authClient = window.auth.client;
    const agent = new HttpAgent({
        host: HOST,
        identity: authClient.getIdentity()
    });
    await agent.fetchRootKey(); // this line is needed for the local env only
    return Actor.createActor(idl, {
        agent,
        canisterId,
    });
}