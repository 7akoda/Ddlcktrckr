export const cleanDescription = (desc: string) => {
	if (!desc) return "";

	let cleaned = desc.replace(/<svg[\s\S]*?<\/svg>/gi, "");

	let superCleaned = cleaned.replace(/{g:citadel_binding:'Reload'}/, "reload");

	superCleaned = superCleaned.replace(
		/{g:citadel_binding:'Ability3'}/,
		"Ability 3 button"
	);
	superCleaned = superCleaned.replace(/[.]/g, ".\n");
	superCleaned = superCleaned.replace(/<[^>]+>/g, "");

	try {
		const { decode } = require("he");
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
		const { decode } = require("he");
		superCleaned = decode(superCleaned);
	} catch {}

	superCleaned = superCleaned.replace(/\s+/g, " ").trim();
	superCleaned = superCleaned.replace(/ On/g, "\n On");

	return superCleaned;
};

export const cleanPropertyName = (property: string) => {
	return property == "AbilityCooldown"
		? "Cooldown"
		: property == "AbilityDuration"
		? "Duration"
		: property == "BonusHealthRegen"
		? "Health Regen"
		: property == "BonusMaxHealth"
		? "Max Health"
		: property == "StunDuration"
		? "Stun Duration"
		: property == "MeleeResistReduction"
		? "Melee Resist"
		: property == "DashRange"
		? "Dash Range"
		: property == "BonusDamagePercent"
		? "Bonus Damage"
		: property == "AbilityCastRange"
		? "Cast Range"
		: property == "DPS"
		? "Damage Per Second"
		: property == "GrenadeCount"
		? "Bomb Count"
		: property == "HealAmount"
		? "Heal Amount"
		: property == "BuffDuration"
		? "Buff Duration"
		: property == "AbilityLifestealPercentHero"
		? "Spirit Lifesteal"
		: property == "HealingFactor"
		? "Lifesteal"
		: property == "NonHeroHealingFactor"
		? "Lifesteal vs Non-Heroes"
		: property == "RegenIncomingDamagePercent"
		? "Damage Regenerated"
		: property == "RegenIncomingDamageDuration"
		? "Regeneration Time"
		: property == "SlowPercent"
		? "Move Speed"
		: property == "SlowDuration"
		? "Slow Duration"
		: property == "ParryWindow"
		? "Invulnerability Duration"
		: property == "MeleeResistReductionDuration"
		? "Melee Resist Reduction Duration"
		: property == "BaseDamage"
		? "Base Damage"
		: property == "MaxStabs"
		? "Max Lunges"
		: property == "PerfectDamage"
		? "Perfect Damage"
		: property == "MaxDamageBeforePerfect"
		? "Max Hold Damage"
		: property == "DelayedDamage"
		? "Delayed Damage"
		: property == "DebuffDuration"
		? "Debuff Duration"
		: property == "LowHealthEnemyThreshold"
		? "Delayed Damage"
		: property;
};
export const valueNumberizer = (value: string) => {
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
		(filterScale.length == 4 && filterScale[3] == "0")
	) {
		return scale;
	} else if (
		filterScale.length > 10 &&
		filterScale[4] == "0" &&
		filterScale[5] == "0" &&
		filterScale[6] == "0" &&
		filterScale[7] == "0" &&
		filterScale[8] == "0" &&
		filterScale[9] == "0"
	) {
		return scale.toFixed(0);
	} else {
		for (let i = 2; i < filterScale.length; i++) {
			if (filterScale[i + 1] == "9") {
				return scale.toFixed(i - 1);
			} else if (filterScale[i + 1] !== "0" && filterScale[i + 1] !== "9") {
				return scale.toFixed(i);
			}
		}
	}
};
