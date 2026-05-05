export const getSpacing = (id: number) => {
	let space = {};
	if (id === 15 || id === 58 || id === 2 || id === 52 || id === 81) {
		space = { right: 9 };
	}
	if (id === 16) {
		space = { right: 2 };
	}
	if (id === 50) {
		space = { right: 15 };
	}

	if (id === 67) {
		space = { right: 12 };
	}
	if (id === 79) {
		space = { right: 25 };
	}

	if (id === 63) {
		space = { top: 6.5 };
	}
	if (id === 4 || id === 17 || id === 77 || id === 80) {
		space = { top: 2 };
	}

	if (id === 19) {
		space = { bottom: 8.5 };
	}

	if (id === 2) {
		space = { left: 2.5 };
	}
	if (id === 1 || id === 12 || id === 13) {
		space = { left: 1 };
	}
	return space;
};
