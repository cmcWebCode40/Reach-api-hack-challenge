import { loadStdlib } from "@reach-sh/stdlib";
import * as backend from "./build/index.main.mjs";

const reachStdLib = loadStdlib(process.env);

const balanceInAtomUnit = reachStdLib.parseCurrency(100);

// Create Alice Account

const accAlice = await reachStdLib.newTestAccount(balanceInAtomUnit);

const ctcAlice = accAlice.contract(backend);

const users = [];

const createUsers = async () => {
	const acc = await reachStdLib.newTestAccount(balanceInAtomUnit);
	acc.contract(backend, ctcAlice.getInfo());
	users.push(acc.getAddress());
};

const initBob = async () => {
	await createUsers("Bob");
	await createUsers("Bob");
	await createUsers("Bob");

	console.log(` list of Attached Users ${users}`);
};

const aliceInterface = {
	printUsers: () => {
		initBob();
	},
};

await ctcAlice.p.Alice({
	...aliceInterface,
});
