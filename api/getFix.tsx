export const getPostfix = (postfix: string, value: string, prop: any) => {
	return (postfix === "m" &&
		prop.css_class === "move_speed" &&
		value[value.length - 1] === "m") ||
		(postfix[0] === " " && prop.css_class === "move_speed")
		? "/s"
		: postfix === value[value.length - 1] ||
			  postfix[postfix.length - 1] === value[value.length - 1]
			? ""
			: postfix[0] === " "
				? postfix.slice(1)
				: postfix;
};

export const getPrefix = (prefix: string, value: string) => {
	return prefix === value[0]
		? ""
		: value[0] === "-"
			? ""
			: prefix === "{s:sign}"
				? "+"
				: prefix;
};
