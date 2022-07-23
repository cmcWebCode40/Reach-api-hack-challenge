"reach 0.1";

const interactInterface = {
	printUsers: Fun([], Null),
};

export const main = Reach.App(() => {
	const Alice = Participant("Alice", {
		...interactInterface,
	});

	const B = API("Bob", {});

	init();

	Alice.only(() => {
		const _attachUsers = interact.printUsers();
	});

	exit();
});
