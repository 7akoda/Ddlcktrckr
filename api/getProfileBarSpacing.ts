export const getSpacing = (id: number) => {
	let space = {};
	if (id === 15 || id === 52 || id === 81) {
		space = { right: 9 };
	}

	if (id === 12) {
		space = { right: 2 };
	}
	if (id === 12) {
		space = { left: 4 };
	}
	if (id === 50) {
		space = { right: 17 };
	}
	if (id === 20 || id === 16) {
		space = { right: 5 };
	}
	if (id === 64 || id === 35 || id === 65) {
		space = { left: 7 };
	}
	if (id === 67 || id === 80) {
		space = { right: 9 };
	}
	if (id === 79 || id === 2 || id === 58) {
		space = { right: 24 };
	}

	if (id === 63) {
		space = { top: 6.5, right: 0.5 };
	}
	if (id === 77) {
		space = { top: 2, right: 10 };
	}
	if (id === 17) {
		space = { top: 2, left: 27 };
	}
	if (id === 80) {
		space = { top: 2 };
	}
	if (id === 4) {
		space = { top: 2, left: 23.5 };
	}
	if (id === 19) {
		space = { bottom: 8.5 };
	}
	if (id === 8 || id === 25 || id === 69 || id === 7 || id === 3) {
		space = { left: 21.5 };
	}
	if (id === 66 || id === 11) {
		space = { left: 15.5 };
	}
	if (id === 2 || id === 6 || id === 18) {
		space = { left: 12 };
	}
	if (id === 1 || id === 13 || id === 76 || id === 10) {
		space = { left: 27 };
	}
	if (id === 27) {
		space = { left: 23 };
	}
	if (id === 3 || id === 14) {
		space = { left: 20 };
	}

	return space;
};
