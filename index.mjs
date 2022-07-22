import { loadStdlib } from "@reach-sh/stdlib";
import * as backend from "./build/index.main.mjs";

const reachStdLib = loadStdlib(process.env);

const balanceInAtomUnit = reachStdLib.parseCurrency(100);

// Create Alice Account

const accAlice = await reachStdLib.newTestAccount(balanceInAtomUnit);

const ctcAlice = accAlice.contract(backend);

console.log(`Alice successfully deployed ready to accept attachers`);

const users = [];

const createUsers = async (user) => {
	const acc = await reachStdLib.newTestAccount(balanceInAtomUnit);
	acc.contract(backend, ctcAlice.getInfo());
	users.push(acc.getAddress());
	console.log(`Created API participant for ${user}`);
};

const initBob = async () => {
	await createUsers("Bob1");
	await createUsers("Bob2");
	await createUsers("Bob3");

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
