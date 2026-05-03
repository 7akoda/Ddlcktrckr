export const getValue = (value: string, postfix: string) => {
	return value[value.length - 1] === postfix[0] &&
		postfix !== value[value.length - 1]
		? value.slice(0, value.length - 1)
		: value;
};
