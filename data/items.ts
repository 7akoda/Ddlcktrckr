type Items = {
	Vitality: Item;
	Spirit: Item;
	Weapon: Item;
};
interface BaseItemData {
	Name: string;
	Image: number;
	Flat: string[];
	Description: string | null;
	Upgrades: string[];
	Downgrades: string[];
	Nuance: string[] | null;
}
interface ClockItemData extends BaseItemData {
	Clock: true;
	Timer: null | string;
	Type: string;
	ActiveDescription: null | string[];
}

interface NonClockItemData extends BaseItemData {
	Clock: false;
}
type ItemData = ClockItemData | NonClockItemData;

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
				Name: "Extra Health",
				Image: require("../images/Vitality/800/Extra_Health.png"),
				Flat: ["+185 Bonus Health"],
				Upgrades: ["Colossus", "Fortitude"],
				Clock: false,
				Description: null,
				Nuance: null,
				Downgrades: [],
			},
			{
				Name: "Extra Regen",
				Image: require("../images/Vitality/800/Extra_Regen.png"),
				Flat: ["+3 Health Regen"],
				Upgrades: ["Healing Booster"],
				Clock: false,
				Description: null,
				Nuance: null,
				Downgrades: [],
			},
			{
				Name: "Extra Stamina",
				Image: require("../images/Vitality/800/Extra_Stamina.png"),
				Flat: ["+1 Stamina", "+12% Stamina Recovery"],
				Upgrades: ["Stamina Mastery", "Kinetic Dash", "Arcane Surge"],
				Clock: false,
				Description: null,
				Nuance: null,
				Downgrades: [],
			},
			{
				Name: "Healing Rite",
				Image: require("../images/Vitality/800/Healing_Rite.png"),
				Flat: [
					"300 x .93 spirit power Total HP Regen",
					"+2m/s Sprint Speed (Conditional)",
					"20s Regen Duration",
					"30m Cast Range",
				],
				Description:
					"Grant Regen and Sprint Speed to the target. Gets dispelled if you take damage from enemy players or objectives. Can be self-cast.",
				Clock: true,
				Timer: "70s",
				Upgrades: ["Rescue Beam", "Healing Nova"],
				Type: "Active",
				Nuance: null,
				ActiveDescription: null,
				Downgrades: [],
			},
			{
				Name: "Melee Lifesteal",
				Image: require("../images/Vitality/800/Melee_Lifesteal.png"),
				Description: "Your next Melee attack heals you.",
				Nuance: [
					"This heal is 30% effective vs non-heroes. Cooldown is 2x as long for Light Melee hits.",
				],
				Flat: ["+12% Melee Damage", "100 Heal on Melee Hit"],
				Clock: false,
				Upgrades: ["Lifestrike"],
				Downgrades: [],
			},
			{
				Name: "Rebuttal",
				Image: require("../images/Vitality/800/Rebuttal.png"),
				Description:
					"On a successful Parry against an enemy Hero, Heal yourself for the damage parried and returns that damage to the target, and temporarily gain increased damage.",
				Flat: ["-2s Parry Cooldown", "+18% Melee Resist", "+75 Bonus Health"],
				Clock: true,
				Timer: null,
				Type: "Passive",
				Nuance: null,
				ActiveDescription: [
					"+30% Bonus Damage (Conditional)",
					"6s Buff Duration",
				],
				Upgrades: [],
				Downgrades: [],
			},
			{
				Name: "Sprint Boots",
				Image: require("../images/Vitality/800/Sprint_Boots.png"),
				Flat: ["+2.25m/s Sprint Speed", "+2 Out of Combat Regen"],
				Upgrades: ["Trophy Collector", "Enduring Speed"],
				Clock: false,
				Nuance: null,
				Description: null,
				Downgrades: [],
			},
		],
		tier2: [
			{
				Name: "Battle Vest",
				Image: require("../images/Vitality/1600/Battle_Vest.png"),
				Flat: ["+18% Bullet Resist", "+3 Out of Combat Regen"],
				Description:
					"While you are above 65% health, gain weapon damage and bonus fire rate.",
				Clock: true,
				Timer: null,
				Type: "Passive",
				ActiveDescription: [
					"+15% Weapon Damage (Conditional)",
					"+8% Fire Rate (Conditional)",
				],
				Nuance: null,
				Upgrades: [],
				Downgrades: [],
			},
			{
				Name: "Bullet Lifesteal",
				Image: require("../images/Vitality/1600/Bullet_Lifesteal_(item).png"),
				Flat: ["+16% Bullet Lifesteal", "+90 Bonus Health"],
				Clock: false,
				Description: null,
				Nuance: null,
				Upgrades: ["Leech", "Fury Trance", "Vampiric Burst"],
				Downgrades: [],
			},
			{
				Name: "Debuff Reducer",
				Image: require("../images/Vitality/1600/Debuff_Reducer.png"),
				Flat: ["+50 Bonus Health", "+20% Debuff Resist"],
				Clock: false,
				Description:
					"Reduces the duration of all negative effects applied to you.",
				Upgrades: ["Debuff Remover", "Unstoppable"],
				Nuance: null,
				Downgrades: [],
			},
			{
				Name: "Enchanter's Emblem",
				Image: require("../images/Vitality/1600/Enchanter's_Emblem.png"),
				Flat: ["+15% Spirit Resist", "+2 Out of Combat Regen"],
				Description:
					"While you are above 65% health, gain bonus Spirit and Cooldown Reduction.",
				Clock: true,
				Timer: null,
				Type: "Passive",
				ActiveDescription: [
					"+15 Spirit Power (Conditional)",
					"+7% Ability Cooldown Reduction (Conditional)",
				],
				Nuance: null,
				Upgrades: [],
				Downgrades: [],
			},
			{
				Name: "Enduring Speed",
				Image: require("../images/Vitality/1600/Enduring_Speed.png"),
				Flat: [
					" +2.25m/s Move Speed",
					"+2 Out of Combat Regen",
					"+30% Slow Resist",
				],
				Description: "Reduces the effect of enemy Move Speed penalties.",
				Clock: false,
				Nuance: null,
				Upgrades: ["Juggernaut"],
				Downgrades: ["Sprint Boots"],
			},
			{
				Name: "Guardian Ward",
				Image: require("../images/Vitality/1600/Guardian_Ward.png"),
				Downgrades: [],
				Upgrades: ["Divine Barrier"],
				Flat: ["+10% Ability Range"],
				Clock: true,
				Timer: "40s",
				Type: "Active",
				Description:
					"Provide the target with a Barrier and temporary Move Speed.",
				Nuance: [
					"Can be self-cast.",
					"Cooldown is reduced by half when cast on someone else.",
				],
				ActiveDescription: [
					"200 Barrier (Conditional)",
					"+3m/s Move Speed (Conditional)",
					"6s Buff Duration",
					"40m Cast Range",
				],
			},
			{
				Name: "Healbane",
				Image: require("../images/Vitality/1600/Healbane.png"),
				Flat: ["+7 Spirit Power"],
				Clock: true,
				Timer: null,
				Type: "Passive",
				ActiveDescription: [
					"-35% Healing Reduction (Conditional)",
					"275 Heal On Hero Kill",
					"8s Duration",
				],
				Description:
					"Your Spirit Damage applies Healing Reduction. If an enemy hero dies under this effect, you receive a large heal.",
				Nuance: null,
				Upgrades: [],
				Downgrades: [],
			},
			{
				Name: "Healing Booster",
				Image: require("../images/Vitality/1600/Healing_Booster.png"),
				Flat: ["+3 Health Regen"],
				Description: "Increases the effectiveness of your healing by 20%.",
				Clock: false,
				Nuance: null,
				Downgrades: ["Extra Regen"],
				Upgrades: ["Healing Tempo"],
			},
			{
				Name: "Reactive Barrier",
				Image: require("../images/Vitality/1600/Reactive_Barrier.png"),
				Clock: true,
				Type: "Passive",
				Timer: "24s",
				Description:
					"Automatically restores one stamina and gain a Barrier when you are movement locked, Stunned, Chained, Immobilized, or Slept.",
				Flat: ["+6% Spirit Resist"],
				ActiveDescription: ["325 x 2.1 Barrier (Conditional)", "12s Duration"],
				Downgrades: [],
				Upgrades: [],
				Nuance: null,
			},
			{
				Name: "Restorative Locket",
				Image: require("../images/Vitality/1600/Restorative_Locket.png"),
				Flat: ["+6% Spirit Resist"],
				Clock: true,
				Timer: "30s",
				Type: "Active",
				Description:
					"When an enemy uses an ability within 30m range from you, store one Restoration Stack.",
				ActiveDescription: ["20 x 0.4 Boons Heal per Stack", "20 Max Stacks"],
				Nuance: [
					"Consume all stacks to heal target ally and replenish 2 stamina points. Can be self-cast.",
				],
				Upgrades: [],
				Downgrades: [],
			},
			{
				Name: "Return Fire",
				Image: require("../images/Vitality/1600/Return_Fire.png"),
				Flat: ["+8% Bullet Resist"],
				Description:
					"Automatically fire a bullet towards any attacker who damages you with their abilities or weapon.",
				Clock: true,
				Type: "Active",
				Timer: "25s",
				ActiveDescription: [
					"50% Bullet Damage Returned",
					"25% Spirit Damage Returned",
					"6s Duration",
				],
				Nuance: null,
				Upgrades: [],
				Downgrades: [],
			},
			{
				Name: "Spirit Lifesteal",
				Image: require("../images/Vitality/1600/Spirit_Lifesteal_(item).png"),
				Flat: ["+16% Spirit Lifesteal", "+70 Bonus Health", "+6 Spirit Power"],
				Upgrades: ["Leech", "Infuser"],
				Downgrades: [],
				Clock: false,
				Nuance: null,
				Description: null,
			},
			{
				Name: "Spirit Shielding",
				Image: require("../images/Vitality/1600/Spirit_Shielding.png"),
				Flat: ["+2.5 Out of Combat Regen"],
				Clock: true,
				Type: "Passive",
				Timer: "35s",
				Description:
					"Gain a Barrier whenever you take significant spirit damage from enemy Heroes in a small time frame.",
				ActiveDescription: [
					"+325 x 4 Boons Barrier (Conditional)",
					"+1.75m/s Move Speed (Conditional)",
					"+150 Damage Threshold",
					"+3.5s Time Frame",
					"+8s Barrier Duration",
				],
				Nuance: null,
				Upgrades: [],
				Downgrades: [],
			},
			{
				Name: "Weapon Shielding",
				Image: require("../images/Vitality/1600/Weapon_Shielding.png"),
				Flat: ["+2.5 Out of Combat Regen"],
				Clock: true,
				Timer: "35s",
				Type: "Passive",
				Description:
					"Gain a Barrier whenever you take significant weapon damage from enemy Heroes in a small time frame.",
				ActiveDescription: [
					"325 x 4 Boons Barrier (Conditional)",
					"+1.75m/s Move Speed (Conditional)",
					"150 Damage Threshold",
					"3.5s Time Frame",
					"8s Barrier Duration",
				],
				Nuance: null,
				Upgrades: [],
				Downgrades: [],
			},
		],
		tier3: [
			{
				Name: "Bullet Resilience",
				Image: require("../images/Vitality/3200/Bullet_Resilience.png"),
			},
			{
				Name: "Counterspell",
				Image: require("../images/Vitality/3200/Counterspell.png"),
			},
			{
				Name: "Debuff Remover",
				Image: require("../images/Vitality/3200/Debuff_Remover.png"),
			},
			{
				Name: "Fortitude",
				Image: require("../images/Vitality/3200/Fortitude.png"),
			},
			{
				Name: "Fury Trance",
				Image: require("../images/Vitality/3200/Fury_Trance.png"),
			},
			{
				Name: "Healing Nova",
				Image: require("../images/Vitality/3200/Healing_Nova.png"),
			},
			{
				Name: "Lifestrike",
				Image: require("../images/Vitality/3200/Lifestrike.png"),
			},
			{
				Name: "Majestic Leap",
				Image: require("../images/Vitality/3200/Majestic_Leap.png"),
			},
			{
				Name: "Metal Skin",
				Image: require("../images/Vitality/3200/Metal_Skin.png"),
			},
			{
				Name: "Rescue Beam",
				Image: require("../images/Vitality/3200/Rescue_Beam.png"),
			},
			{
				Name: "Spirit Resilience",
				Image: require("../images/Vitality/3200/Spirit_Resilience.png"),
			},
			{
				Name: "Stamina Mastery",
				Image: require("../images/Vitality/3200/Stamina_Mastery.png"),
			},
			{
				Name: "Trophy Collector",
				Image: require("../images/Vitality/3200/Trophy_Collector.png"),
			},
			{
				Name: "Veil Walker",
				Image: require("../images/Vitality/3200/Veil_Walker.png"),
			},
			{
				Name: "Warp Stone",
				Image: require("../images/Vitality/3200/Warp_Stone.png"),
			},
		],
		tier4: [
			{
				Name: "Cheat Death",
				Image: require("../images/Vitality/6400/Cheat_Death.png"),
			},
			{
				Name: "Colossus",
				Image: require("../images/Vitality/6400/Colossus.png"),
			},
			{
				Name: "Divine Barrier",
				Image: require("../images/Vitality/6400/Divine_Barrier.png"),
			},
			{
				Name: "Diviner's Kevlar",
				Image: require("../images/Vitality/6400/Diviner's_Kevlar.png"),
			},
			{
				Name: "Healing Tempo",
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
				Name: "Phantom Strike",
				Image: require("../images/Vitality/6400/Phantom_Strike.png"),
			},
			{
				Name: "Plated Armor",
				Image: require("../images/Vitality/6400/Plated_Armor.png"),
			},
			{
				Name: "Siphon Bullets",
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
				Name: "Vampiric Burst",
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
				Name: "Close Quarters",
				Image: require("../images/Weapon/800/Close_Quarters.png"),
			},
			{
				Name: "Extended Magazine",
				Image: require("../images/Weapon/800/Extended_Magazine.png"),
			},
			{
				Name: "Headshot Booster",
				Image: require("../images/Weapon/800/Headshot_Booster.png"),
			},
			{
				Name: "High-Velocity Rounds",
				Image: require("../images/Weapon/800/High-Velocity_Rounds.png"),
			},
			{
				Name: "Monster Rounds",
				Image: require("../images/Weapon/800/Monster_Rounds.png"),
			},
			{
				Name: "Rapid Rounds",
				Image: require("../images/Weapon/800/Rapid_Rounds.png"),
			},
			{
				Name: "Restorative Shot",
				Image: require("../images/Weapon/800/Restorative_Shot.png"),
			},
		],

		tier2: [
			{
				Name: "Active Reload",
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
				Name: "Intensifying Magazine",
				Image: require("../images/Weapon/1600/Intensifying_Magazine.png"),
			},
			{
				Name: "Kinetic Dash",
				Image: require("../images/Weapon/1600/Kinetic_Dash.png"),
			},
			{
				Name: "Long Range",
				Image: require("../images/Weapon/1600/Long_Range.png"),
			},
			{
				Name: "Melee Charge",
				Image: require("../images/Weapon/1600/Melee_Charge.png"),
			},
			{
				Name: "Mystic Shot",
				Image: require("../images/Weapon/1600/Mystic_Shot.png"),
			},
			{
				Name: "Opening Rounds",
				Image: require("../images/Weapon/1600/Opening_Rounds.png"),
			},
			{
				Name: "Slowing Bullets",
				Image: require("../images/Weapon/1600/Slowing_Bullets.png"),
			},
			{
				Name: "Spirit Shredder Bullets",
				Image: require("../images/Weapon/1600/Spirit_Shredder_Bullets.png"),
			},
			{
				Name: "Split Shot",
				Image: require("../images/Weapon/1600/Split_Shot.png"),
			},
			{
				Name: "Swift Striker",
				Image: require("../images/Weapon/1600/Swift_Striker.png"),
			},
			{
				Name: "Titanic Magazine",
				Image: require("../images/Weapon/1600/Titanic_Magazine.png"),
			},
			{
				Name: "Weakening Headshot",
				Image: require("../images/Weapon/1600/Weakening_Headshot.png"),
			},
		],
		tier3: [
			{
				Name: "Alchemical Fire",
				Image: require("../images/Weapon/3200/Alchemical_Fire.png"),
			},
			{
				Name: "Berserker",
				Image: require("../images/Weapon/3200/Berserker.png"),
			},
			{
				Name: "Blood Tribute",
				Image: require("../images/Weapon/3200/Blood_Tribute.png"),
			},
			{
				Name: "Burst Fire",
				Image: require("../images/Weapon/3200/Burst_Fire.png"),
			},
			{
				Name: "Cultist Sacrifice",
				Image: require("../images/Weapon/3200/Cultist_Sacrifice.png"),
			},
			{
				Name: "Escalating Resilience",
				Image: require("../images/Weapon/3200/Escalating_Resilience.png"),
			},
			{
				Name: "Express Shot",
				Image: require("../images/Weapon/3200/Express_Shot.png"),
			},
			{
				Name: "Headhunter",
				Image: require("../images/Weapon/3200/Headhunter.png"),
			},
			{
				Name: "Heroic Aura",
				Image: require("../images/Weapon/3200/Heroic_Aura.png"),
			},
			{
				Name: "Hollow Point",
				Image: require("../images/Weapon/3200/Hollow_Point.png"),
			},
			{
				Name: "Hunter's Aura",
				Image: require("../images/Weapon/3200/Hunter's_Aura.png"),
			},
			{
				Name: "Point Blank",
				Image: require("../images/Weapon/3200/Point_Blank.png"),
			},
			{
				Name: "Sharpshooter",
				Image: require("../images/Weapon/3200/Sharpshooter.png"),
			},
			{
				Name: "Spirit Rend",
				Image: require("../images/Weapon/3200/Spirit_Rend.png"),
			},
			{
				Name: "Tesla Bullets",
				Image: require("../images/Weapon/3200/Tesla_Bullets.png"),
			},
			{
				Name: "Toxic Bullets",
				Image: require("../images/Weapon/3200/Toxic_Bullets.png"),
			},
			{
				Name: "Weighted Shots",
				Image: require("../images/Weapon/3200/Weighted_Shots.png"),
			},
		],

		tier4: [
			{
				Name: "Armor Piercing Rounds",
				Image: require("../images/Weapon/6400/Armor_Piercing_Rounds.png"),
			},
			{
				Name: "Capacitor",
				Image: require("../images/Weapon/6400/Capacitor.png"),
			},
			{
				Name: "Crippling Headshot",
				Image: require("../images/Weapon/6400/Crippling_Headshot.png"),
			},
			{
				Name: "Crushing Fists",
				Image: require("../images/Weapon/6400/Crushing_Fists.png"),
			},
			{
				Name: "Frenzy",
				Image: require("../images/Weapon/6400/Frenzy.png"),
			},
			{
				Name: "Glass Cannon",
				Image: require("../images/Weapon/6400/Glass_Cannon.png"),
			},
			{
				Name: "Lucky Shot",
				Image: require("../images/Weapon/6400/Lucky_Shot.png"),
			},
			{
				Name: "Ricochet",
				Image: require("../images/Weapon/6400/Ricochet.png"),
			},
			{
				Name: "Shadow Weave",
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
				Name: "Spiritual Overflow",
				Image: require("../images/Weapon/6400/Spiritual_Overflow.png"),
			},
		],
	},
	Spirit: {
		tier1: [
			{
				Name: "Extra Charge",
				Image: require("../images/Spirit/800/Extra_Charge.png"),
			},
			{
				Name: "Extra Spirit",
				Image: require("../images/Spirit/800/Extra_Spirit.png"),
			},
			{
				Name: "Mystic Burst",
				Image: require("../images/Spirit/800/Mystic_Burst.png"),
			},
			{
				Name: "Mystic Expansion",
				Image: require("../images/Spirit/800/Mystic_Expansion.png"),
			},
			{
				Name: "Mystic Regeneration",
				Image: require("../images/Spirit/800/Mystic_Regeneration.png"),
			},
			{
				Name: "Rusted Barrel",
				Image: require("../images/Spirit/800/Rusted_Barrel.png"),
			},
			{
				Name: "Spirit Strike",
				Image: require("../images/Spirit/800/Spirit_Strike.png"),
			},
		],

		tier2: [
			{
				Name: "Arcane Surge",
				Image: require("../images/Spirit/1600/Arcane_Surge.png"),
			},
			{
				Name: "Bullet Resist Shredder",
				Image: require("../images/Spirit/1600/Bullet_Resist_Shredder.png"),
			},
			{
				Name: "Cold Front",
				Image: require("../images/Spirit/1600/Cold_Front.png"),
			},
			{
				Name: "Compress Cooldown",
				Image: require("../images/Spirit/1600/Compress_Cooldown.png"),
			},
			{
				Name: "Duration Extender",
				Image: require("../images/Spirit/1600/Duration_Extender.png"),
			},
			{
				Name: "Improved Spirit",
				Image: require("../images/Spirit/1600/Improved_Spirit.png"),
			},
			{
				Name: "Mystic Slow",
				Image: require("../images/Spirit/1600/Mystic_Slow.png"),
			},
			{
				Name: "Mystic Vulnerability",
				Image: require("../images/Spirit/1600/Mystic_Vulnerability.png"),
			},
			{
				Name: "Quicksilver Reload",
				Image: require("../images/Spirit/1600/Quicksilver_Reload.png"),
			},
			{
				Name: "Slowing Hex",
				Image: require("../images/Spirit/1600/Slowing_Hex.png"),
			},
			{
				Name: "Spirit Sap",
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
				Name: "Disarming Hex",
				Image: require("../images/Spirit/3200/Disarming_Hex.png"),
			},
			{
				Name: "Greater Expansion",
				Image: require("../images/Spirit/3200/Greater_Expansion.png"),
			},
			{
				Name: "Knockdown",
				Image: require("../images/Spirit/3200/Knockdown.png"),
			},
			{
				Name: "Radiant Regeneration",
				Image: require("../images/Spirit/3200/Radiant_Regeneration.png"),
			},
			{
				Name: "Rapid Recharge",
				Image: require("../images/Spirit/3200/Rapid_Recharge.png"),
			},
			{
				Name: "Silence Wave",
				Image: require("../images/Spirit/3200/Silence_Wave.png"),
			},
			{
				Name: "Spirit Snatch",
				Image: require("../images/Spirit/3200/Spirit_Snatch.png"),
			},
			{
				Name: "Superior Cooldown",
				Image: require("../images/Spirit/3200/Superior_Cooldown.png"),
			},
			{
				Name: "Superior Duration",
				Image: require("../images/Spirit/3200/Superior_Duration.png"),
			},
			{
				Name: "Surge of Power",
				Image: require("../images/Spirit/3200/Surge_of_Power.png"),
			},
			{
				Name: "Tankbuster",
				Image: require("../images/Spirit/3200/Tankbuster.png"),
			},
			{
				Name: "Torment Pulse",
				Image: require("../images/Spirit/3200/Torment_Pulse.png"),
			},
		],
		tier4: [
			{
				Name: "Arctic Blast",
				Image: require("../images/Spirit/6400/Arctic_Blast.png"),
			},
			{
				Name: "Boundless Spirit",
				Image: require("../images/Spirit/6400/Boundless_Spirit.png"),
			},
			{
				Name: "Curse",
				Image: require("../images/Spirit/6400/Curse.png"),
			},
			{
				Name: "Echo Shard",
				Image: require("../images/Spirit/6400/Echo_Shard.png"),
			},
			{
				Name: "Escalating Exposure",
				Image: require("../images/Spirit/6400/Escalating_Exposure.png"),
			},
			{
				Name: "Ethereal Shift",
				Image: require("../images/Spirit/6400/Ethereal_Shift.png"),
			},
			{
				Name: "Focus Lens",
				Image: require("../images/Spirit/6400/Focus_Lens.png"),
			},
			{
				Name: "Lightning Scroll",
				Image: require("../images/Spirit/6400/Lightning_Scroll.png"),
			},
			{
				Name: "Magic Carpet",
				Image: require("../images/Spirit/6400/Magic_Carpet.png"),
			},
			{
				Name: "Mercurial Magnum",
				Image: require("../images/Spirit/6400/Mercurial_Magnum.png"),
			},
			{
				Name: "Mystic Reverb",
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
				Name: "Spirit Burn",
				Image: require("../images/Spirit/6400/Spirit_Burn.png"),
			},
			{
				Name: "Transcendent Cooldown",
				Image: require("../images/Spirit/6400/Transcendent_Cooldown.png"),
			},
			{
				Name: "Vortex Web",
				Image: require("../images/Spirit/6400/Vortex_Web.png"),
			},
		],
	},
};
