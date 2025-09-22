type Items = {
	Vitality: Item;
	Spirit: Item;
	Weapon: Item;
};
interface ItemData {
	Name: string;
	Image: number;
}

interface Item {
	tier1: ItemData[];
	tier2: ItemData[];
	tier3: ItemData[];
	tier4: ItemData[];
}

export const ItemImages: Items = {
	Vitality: {
		tier1: [
			{
				Name: "Extra_Health",
				Image: require("../images/Vitality/800/Extra_Health.png"),
			},
			{
				Name: "Extra_Regen",
				Image: require("../images/Vitality/800/Extra_Regen.png"),
			},
			{
				Name: "Extra_Stamina",
				Image: require("../images/Vitality/800/Extra_Stamina.png"),
			},
			{
				Name: "Healing_Rite",
				Image: require("../images/Vitality/800/Healing_Rite.png"),
			},
			{
				Name: "Melee_Lifesteal",
				Image: require("../images/Vitality/800/Melee_Lifesteal.png"),
			},
			{
				Name: "Rebuttal",
				Image: require("../images/Vitality/800/Rebuttal.png"),
			},
			{
				Name: "Sprint_Boots",
				Image: require("../images/Vitality/800/Sprint_Boots.png"),
			},
		],
		tier2: [
			{
				Name: "Battle_Vest",
				Image: require("../images/Vitality/1600/Battle_Vest.png"),
			},
			{
				Name: "Bullet_Lifesteal",
				Image: require("../images/Vitality/1600/Bullet_Lifesteal_(item).png"),
			},
			{
				Name: "Debuff_Reducer",
				Image: require("../images/Vitality/1600/Debuff_Reducer.png"),
			},
			{
				Name: "Enchanter's_Emblem",
				Image: require("../images/Vitality/1600/Enchanter's_Emblem.png"),
			},
			{
				Name: "Enduring_Speed",
				Image: require("../images/Vitality/1600/Enduring_Speed.png"),
			},
			{
				Name: "Guardian_Ward",
				Image: require("../images/Vitality/1600/Guardian_Ward.png"),
			},
			{
				Name: "Healbane",
				Image: require("../images/Vitality/1600/Healbane.png"),
			},
			{
				Name: "Healing_Booster",
				Image: require("../images/Vitality/1600/Healing_Booster.png"),
			},
			{
				Name: "Reactive_Barrier",
				Image: require("../images/Vitality/1600/Reactive_Barrier.png"),
			},
			{
				Name: "Restorative_Locket",
				Image: require("../images/Vitality/1600/Restorative_Locket.png"),
			},
			{
				Name: "Return_Fire",
				Image: require("../images/Vitality/1600/Return_Fire.png"),
			},
			{
				Name: "Spirit_Lifesteal",
				Image: require("../images/Vitality/1600/Spirit_Lifesteal_(item).png"),
			},
			{
				Name: "Spirit_Shielding",
				Image: require("../images/Vitality/1600/Spirit_Shielding.png"),
			},
			{
				Name: "Weapon_Shielding",
				Image: require("../images/Vitality/1600/Weapon_Shielding.png"),
			},
		],
		tier3: [
			{
				Name: "Bullet_Resilience",
				Image: require("../images/Vitality/3200/Bullet_Resilience.png"),
			},
			{
				Name: "Counterspell",
				Image: require("../images/Vitality/3200/Counterspell.png"),
			},
			{
				Name: "Debuff_Remover",
				Image: require("../images/Vitality/3200/Debuff_Remover.png"),
			},
			{
				Name: "Fortitude",
				Image: require("../images/Vitality/3200/Fortitude.png"),
			},
			{
				Name: "Fury_Trance",
				Image: require("../images/Vitality/3200/Fury_Trance.png"),
			},
			{
				Name: "Healing_Nova",
				Image: require("../images/Vitality/3200/Healing_Nova.png"),
			},
			{
				Name: "Lifestrike",
				Image: require("../images/Vitality/3200/Lifestrike.png"),
			},
			{
				Name: "Majestic_Leap",
				Image: require("../images/Vitality/3200/Majestic_Leap.png"),
			},
			{
				Name: "Metal_Skin",
				Image: require("../images/Vitality/3200/Metal_Skin.png"),
			},
			{
				Name: "Rescue_Beam",
				Image: require("../images/Vitality/3200/Rescue_Beam.png"),
			},
			{
				Name: "Spirit_Resilience",
				Image: require("../images/Vitality/3200/Spirit_Resilience.png"),
			},
			{
				Name: "Stamina_Mastery",
				Image: require("../images/Vitality/3200/Stamina_Mastery.png"),
			},
			{
				Name: "Trophy_Collector",
				Image: require("../images/Vitality/3200/Trophy_Collector.png"),
			},
			{
				Name: "Veil_Walker",
				Image: require("../images/Vitality/3200/Veil_Walker.png"),
			},
			{
				Name: "Warp_Stone",
				Image: require("../images/Vitality/3200/Warp_Stone.png"),
			},
		],
		tier4: [
			{
				Name: "Cheat_Death",
				Image: require("../images/Vitality/6400/Cheat_Death.png"),
			},
			{
				Name: "Colossus",
				Image: require("../images/Vitality/6400/Colossus.png"),
			},
			{
				Name: "Divine_Barrier",
				Image: require("../images/Vitality/6400/Divine_Barrier.png"),
			},
			{
				Name: "Diviner's_Kevlar",
				Image: require("../images/Vitality/6400/Diviner's_Kevlar.png"),
			},
			{
				Name: "Healing_Tempo",
				Image: require("../images/Vitality/6400/Healing_Tempo.png"),
			},
			{
				Name: "Infuser",
				Image: require("../images/Vitality/6400/Infuser.png"),
			},
			{
				Name: "Inhibitor",
				Image: require("../images/Vitality/6400/Inhibitor.png"),
			},
			{
				Name: "Juggernaut",
				Image: require("../images/Vitality/6400/Juggernaut.png"),
			},
			{
				Name: "Leech",
				Image: require("../images/Vitality/6400/Leech.png"),
			},
			{
				Name: "Phantom_Strike",
				Image: require("../images/Vitality/6400/Phantom_Strike.png"),
			},
			{
				Name: "Plated_Armor",
				Image: require("../images/Vitality/6400/Plated_Armor.png"),
			},
			{
				Name: "Siphon_Bullets",
				Image: require("../images/Vitality/6400/Siphon_Bullets.png"),
			},
			{
				Name: "Spellbreaker",
				Image: require("../images/Vitality/6400/Spellbreaker.png"),
			},
			{
				Name: "Unstoppable",
				Image: require("../images/Vitality/6400/Unstoppable.png"),
			},
			{
				Name: "Vampiric_Burst",
				Image: require("../images/Vitality/6400/Vampiric_Burst.png"),
			},
			{
				Name: "Witchmail",
				Image: require("../images/Vitality/6400/Witchmail.png"),
			},
		],
	},

	Weapon: {
		tier1: [
			{
				Name: "Close_Quarters",
				Image: require("../images/Weapon/800/Close_Quarters.png"),
			},
			{
				Name: "Extended_Magazine",
				Image: require("../images/Weapon/800/Extended_Magazine.png"),
			},
			{
				Name: "Headshot_Booster",
				Image: require("../images/Weapon/800/Headshot_Booster.png"),
			},
			{
				Name: "High-Velocity_Rounds",
				Image: require("../images/Weapon/800/High-Velocity_Rounds.png"),
			},
			{
				Name: "Monster_Rounds",
				Image: require("../images/Weapon/800/Monster_Rounds.png"),
			},
			{
				Name: "Rapid_Rounds",
				Image: require("../images/Weapon/800/Rapid_Rounds.png"),
			},
			{
				Name: "Restorative_Shot",
				Image: require("../images/Weapon/800/Restorative_Shot.png"),
			},
		],

		tier2: [
			{
				Name: "Active_Reload",
				Image: require("../images/Weapon/1600/Active_Reload.png"),
			},
			{
				Name: "Backstabber",
				Image: require("../images/Weapon/1600/Backstabber.png"),
			},
			{
				Name: "Fleetfoot",
				Image: require("../images/Weapon/1600/Fleetfoot.png"),
			},
			{
				Name: "Intensifying_Magazine",
				Image: require("../images/Weapon/1600/Intensifying_Magazine.png"),
			},
			{
				Name: "Kinetic_Dash",
				Image: require("../images/Weapon/1600/Kinetic_Dash.png"),
			},
			{
				Name: "Long_Range",
				Image: require("../images/Weapon/1600/Long_Range.png"),
			},
			{
				Name: "Melee_Charge",
				Image: require("../images/Weapon/1600/Melee_Charge.png"),
			},
			{
				Name: "Mystic_Shot",
				Image: require("../images/Weapon/1600/Mystic_Shot.png"),
			},
			{
				Name: "Opening_Rounds",
				Image: require("../images/Weapon/1600/Opening_Rounds.png"),
			},
			{
				Name: "Slowing_Bullets",
				Image: require("../images/Weapon/1600/Slowing_Bullets.png"),
			},
			{
				Name: "Spirit_Shredder_Bullets",
				Image: require("../images/Weapon/1600/Spirit_Shredder_Bullets.png"),
			},
			{
				Name: "Split_Shot",
				Image: require("../images/Weapon/1600/Split_Shot.png"),
			},
			{
				Name: "Swift_Striker",
				Image: require("../images/Weapon/1600/Swift_Striker.png"),
			},
			{
				Name: "Titanic_Magazine",
				Image: require("../images/Weapon/1600/Titanic_Magazine.png"),
			},
			{
				Name: "Weakening_Headshot",
				Image: require("../images/Weapon/1600/Weakening_Headshot.png"),
			},
		],
		tier3: [
			{
				Name: "Alchemical_Fire",
				Image: require("../images/Weapon/3200/Alchemical_Fire.png"),
			},
			{
				Name: "Berserker",
				Image: require("../images/Weapon/3200/Berserker.png"),
			},
			{
				Name: "Blood_Tribute",
				Image: require("../images/Weapon/3200/Blood_Tribute.png"),
			},
			{
				Name: "Burst_Fire",
				Image: require("../images/Weapon/3200/Burst_Fire.png"),
			},
			{
				Name: "Cultist_Sacrifice",
				Image: require("../images/Weapon/3200/Cultist_Sacrifice.png"),
			},
			{
				Name: "Escalating_Resilience",
				Image: require("../images/Weapon/3200/Escalating_Resilience.png"),
			},
			{
				Name: "Express_Shot",
				Image: require("../images/Weapon/3200/Express_Shot.png"),
			},
			{
				Name: "Headhunter",
				Image: require("../images/Weapon/3200/Headhunter.png"),
			},
			{
				Name: "Heroic_Aura",
				Image: require("../images/Weapon/3200/Heroic_Aura.png"),
			},
			{
				Name: "Hollow_Point",
				Image: require("../images/Weapon/3200/Hollow_Point.png"),
			},
			{
				Name: "Hunter's_Aura",
				Image: require("../images/Weapon/3200/Hunter's_Aura.png"),
			},
			{
				Name: "Point_Blank",
				Image: require("../images/Weapon/3200/Point_Blank.png"),
			},
			{
				Name: "Sharpshooter",
				Image: require("../images/Weapon/3200/Sharpshooter.png"),
			},
			{
				Name: "Spirit_Rend",
				Image: require("../images/Weapon/3200/Spirit_Rend.png"),
			},
			{
				Name: "Tesla_Bullets",
				Image: require("../images/Weapon/3200/Tesla_Bullets.png"),
			},
			{
				Name: "Toxic_Bullets",
				Image: require("../images/Weapon/3200/Toxic_Bullets.png"),
			},
			{
				Name: "Weighted_Shots",
				Image: require("../images/Weapon/3200/Weighted_Shots.png"),
			},
		],

		tier4: [
			{
				Name: "Armor_Piercing_Rounds",
				Image: require("../images/Weapon/6400/Armor_Piercing_Rounds.png"),
			},
			{
				Name: "Capacitor",
				Image: require("../images/Weapon/6400/Capacitor.png"),
			},
			{
				Name: "Crippling_Headshot",
				Image: require("../images/Weapon/6400/Crippling_Headshot.png"),
			},
			{
				Name: "Crushing_Fists",
				Image: require("../images/Weapon/6400/Crushing_Fists.png"),
			},
			{
				Name: "Frenzy",
				Image: require("../images/Weapon/6400/Frenzy.png"),
			},
			{
				Name: "Glass_Cannon",
				Image: require("../images/Weapon/6400/Glass_Cannon.png"),
			},
			{
				Name: "Lucky_Shot",
				Image: require("../images/Weapon/6400/Lucky_Shot.png"),
			},
			{
				Name: "Ricochet",
				Image: require("../images/Weapon/6400/Ricochet.png"),
			},
			{
				Name: "Shadow_Weave",
				Image: require("../images/Weapon/6400/Shadow_Weave.png"),
			},
			{
				Name: "Silencer",
				Image: require("../images/Weapon/6400/Silencer.png"),
			},
			{
				Name: "Spellslinger",
				Image: require("../images/Weapon/6400/Spellslinger.png"),
			},
			{
				Name: "Spiritual_Overflow",
				Image: require("../images/Weapon/6400/Spiritual_Overflow.png"),
			},
		],
	},
	Spirit: {
		tier1: [
			{
				Name: "Extra_Charge",
				Image: require("../images/Spirit/800/Extra_Charge.png"),
			},
			{
				Name: "Extra_Spirit",
				Image: require("../images/Spirit/800/Extra_Spirit.png"),
			},
			{
				Name: "Mystic_Burst",
				Image: require("../images/Spirit/800/Mystic_Burst.png"),
			},
			{
				Name: "Mystic_Expansion",
				Image: require("../images/Spirit/800/Mystic_Expansion.png"),
			},
			{
				Name: "Mystic_Regeneration",
				Image: require("../images/Spirit/800/Mystic_Regeneration.png"),
			},
			{
				Name: "Rusted_Barrel",
				Image: require("../images/Spirit/800/Rusted_Barrel.png"),
			},
			{
				Name: "Spirit_Strike",
				Image: require("../images/Spirit/800/Spirit_Strike.png"),
			},
		],

		tier2: [
			{
				Name: "Arcane_Surge",
				Image: require("../images/Spirit/1600/Arcane_Surge.png"),
			},
			{
				Name: "Bullet_Resist_Shredder",
				Image: require("../images/Spirit/1600/Bullet_Resist_Shredder.png"),
			},
			{
				Name: "Cold_Front",
				Image: require("../images/Spirit/1600/Cold_Front.png"),
			},
			{
				Name: "Compress_Cooldown",
				Image: require("../images/Spirit/1600/Compress_Cooldown.png"),
			},
			{
				Name: "Duration_Extender",
				Image: require("../images/Spirit/1600/Duration_Extender.png"),
			},
			{
				Name: "Improved_Spirit",
				Image: require("../images/Spirit/1600/Improved_Spirit.png"),
			},
			{
				Name: "Mystic_Slow",
				Image: require("../images/Spirit/1600/Mystic_Slow.png"),
			},
			{
				Name: "Mystic_Vulnerability",
				Image: require("../images/Spirit/1600/Mystic_Vulnerability.png"),
			},
			{
				Name: "Quicksilver_Reload",
				Image: require("../images/Spirit/1600/Quicksilver_Reload.png"),
			},
			{
				Name: "Slowing_Hex",
				Image: require("../images/Spirit/1600/Slowing_Hex.png"),
			},
			{
				Name: "Spirit_Sap",
				Image: require("../images/Spirit/1600/Spirit_Sap.png"),
			},
			{
				Name: "Suppressor",
				Image: require("../images/Spirit/1600/Suppressor.png"),
			},
		],

		tier3: [
			{
				Name: "Decay",
				Image: require("../images/Spirit/3200/Decay.png"),
			},
			{
				Name: "Disarming_Hex",
				Image: require("../images/Spirit/3200/Disarming_Hex.png"),
			},
			{
				Name: "Greater_Expansion",
				Image: require("../images/Spirit/3200/Greater_Expansion.png"),
			},
			{
				Name: "Knockdown",
				Image: require("../images/Spirit/3200/Knockdown.png"),
			},
			{
				Name: "Radiant_Regeneration",
				Image: require("../images/Spirit/3200/Radiant_Regeneration.png"),
			},
			{
				Name: "Rapid_Recharge",
				Image: require("../images/Spirit/3200/Rapid_Recharge.png"),
			},
			{
				Name: "Silence_Wave",
				Image: require("../images/Spirit/3200/Silence_Wave.png"),
			},
			{
				Name: "Spirit_Snatch",
				Image: require("../images/Spirit/3200/Spirit_Snatch.png"),
			},
			{
				Name: "Superior_Cooldown",
				Image: require("../images/Spirit/3200/Superior_Cooldown.png"),
			},
			{
				Name: "Superior_Duration",
				Image: require("../images/Spirit/3200/Superior_Duration.png"),
			},
			{
				Name: "Surge_of_Power",
				Image: require("../images/Spirit/3200/Surge_of_Power.png"),
			},
			{
				Name: "Tankbuster",
				Image: require("../images/Spirit/3200/Tankbuster.png"),
			},
			{
				Name: "Torment_Pulse",
				Image: require("../images/Spirit/3200/Torment_Pulse.png"),
			},
		],
		tier4: [
			{
				Name: "Arctic_Blast",
				Image: require("../images/Spirit/6400/Arctic_Blast.png"),
			},
			{
				Name: "Boundless_Spirit",
				Image: require("../images/Spirit/6400/Boundless_Spirit.png"),
			},
			{
				Name: "Curse",
				Image: require("../images/Spirit/6400/Curse.png"),
			},
			{
				Name: "Echo_Shard",
				Image: require("../images/Spirit/6400/Echo_Shard.png"),
			},
			{
				Name: "Escalating_Exposure",
				Image: require("../images/Spirit/6400/Escalating_Exposure.png"),
			},
			{
				Name: "Ethereal_Shift",
				Image: require("../images/Spirit/6400/Ethereal_Shift.png"),
			},
			{
				Name: "Focus_Lens",
				Image: require("../images/Spirit/6400/Focus_Lens.png"),
			},
			{
				Name: "Lightning_Scroll",
				Image: require("../images/Spirit/6400/Lightning_Scroll.png"),
			},
			{
				Name: "Magic_Carpet",
				Image: require("../images/Spirit/6400/Magic_Carpet.png"),
			},
			{
				Name: "Mercurial_Magnum",
				Image: require("../images/Spirit/6400/Mercurial_Magnum.png"),
			},
			{
				Name: "Mystic_Reverb",
				Image: require("../images/Spirit/6400/Mystic_Reverb.png"),
			},
			{
				Name: "Refresher",
				Image: require("../images/Spirit/6400/Refresher.png"),
			},
			{
				Name: "Scourge",
				Image: require("../images/Spirit/6400/Scourge.png"),
			},
			{
				Name: "Spirit_Burn",
				Image: require("../images/Spirit/6400/Spirit_Burn.png"),
			},
			{
				Name: "Transcendent_Cooldown",
				Image: require("../images/Spirit/6400/Transcendent_Cooldown.png"),
			},
			{
				Name: "Vortex_Web",
				Image: require("../images/Spirit/6400/Vortex_Web.png"),
			},
		],
	},
};
