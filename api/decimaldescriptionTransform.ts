import { decode } from "he";

export const cleanDescription = (desc: string) => {
	if (!desc) return "";

	let cleaned = desc.replace(/<svg[\s\S]*?<\/svg>/gi, "");

	let superCleaned = cleaned.replace(/{g:citadel_binding:'Reload'}/, "reload");

	superCleaned = superCleaned.replace(
		/{g:citadel_binding:'Ability3'}/,
		"Ability 3 button",
	);

	superCleaned = superCleaned.replace(
		/{g:citadel_binding:'MoveForward'}/,
		" forward ",
	);

	superCleaned = superCleaned.replace(
		/{g:citadel_binding:'AltCast'}/,
		" Alt cast ",
	);
	superCleaned = superCleaned.replace(/[.]/g, ".\n");
	superCleaned = superCleaned.replace(/<[^>]+>/g, "");

	try {
		superCleaned = decode(superCleaned);
	} catch {}

	superCleaned = superCleaned.replace(/\s+/g, " ").trim();

	return superCleaned;
};

export const cleanUpgrade = (desc: string) => {
	if (!desc) return "";

	let cleaned = desc.replace(/<svg[\s\S]*?<\/svg>/gi, "");

	let superCleaned = cleaned.replace(/{g:citadel_binding:'Reload'}/, "reload");

	superCleaned = superCleaned.replace(/\.0/g, "");
	superCleaned = superCleaned.replace(/<[^>]+>/g, "");

	try {
		superCleaned = decode(superCleaned);
	} catch {}

	superCleaned = superCleaned.replace(/\s+/g, " ").trim();
	superCleaned = superCleaned.replace(/ On/g, "\n On");

	return superCleaned;
};

export const valueNumberizer = (value: string): number => {
	let newvalue;
	value = String(value);
	newvalue = value.replace(/[^0-9.-]/g, "");
	return Number(newvalue);
};

export const cleanDecimals = (scale: number) => {
	const scaleString = String(scale);
	const scaleArr = [...scaleString];
	const filterScale = scaleArr.filter((s) => {
		return s !== "-";
	});

	if (
		filterScale.length <= 3 ||
		(filterScale.length === 4 && filterScale[3] === "0")
	) {
		return Number(scale);
	} else if (
		filterScale.length > 10 &&
		filterScale[4] === "0" &&
		filterScale[5] === "0" &&
		filterScale[6] === "0" &&
		filterScale[7] === "0" &&
		filterScale[8] === "0" &&
		filterScale[9] === "0"
	) {
		return Number(scale.toFixed(0));
	} else {
		for (let i = 2; i < filterScale.length; i++) {
			if (filterScale[i + 1] === "9") {
				return Number(scale.toFixed(i - 1));
			} else if (filterScale[i + 1] !== "0" && filterScale[i + 1] !== "9") {
				return Number(scale.toFixed(i));
			}
		}
	}
	return scale;
};

export const cleanDetailDecimals = (value: string) => {
	value = String(value);
	value = value.replace(/(\.\d*?[1-9])0+$|\.0+$/, "$1");
	return value;
};

export const detailsValueNumberizer = (value: string) => {
	let newvalue;
	value = String(value);
	newvalue = value.replace(/[^0-9.+-]/g, "");
	return Number(newvalue);
};

export const detailsBonusNumberizer = (value: string) => {
	let newvalue;
	value = String(value);
	newvalue = value.replace(/[^0-9.]/g, "");
	return Number(newvalue);
};
