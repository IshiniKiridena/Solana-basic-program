import * as web3 from "@solana/web3.js"
import { Buffer } from "buffer";
import * as dotenv from "dotenv";

dotenv.config();

const connection = new web3.Connection(web3.clusterApiUrl("devnet"))

async function main() {
    const secretKey = process.env.SECRET_KEY;
    const programId = process.env.PROGRAM_ID;

    if (!secretKey || !programId) {
        console.error("Error: SECRET_KEY or PROGRAM_ID is not set in the environment variables.");
        return;
    }

    const key: Uint8Array = Uint8Array.from(JSON.parse(secretKey))
    const signer = web3.Keypair.fromSecretKey(key);
    let program_id: web3.PublicKey = new web3.PublicKey(programId);

    let transaction = new web3.Transaction()
    transaction.add(
        new web3.TransactionInstruction({
            keys: [],
            programId: program_id,
            data: Buffer.alloc(0)
        })
    );
    await web3.sendAndConfirmTransaction(connection, transaction, [signer]).then(
        (sig) => {
            console.log("Signature : ", sig)
        }
    );

}

main();