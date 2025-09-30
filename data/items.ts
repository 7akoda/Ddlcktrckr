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
				Name: "Extra Health",
				Image: require("../images/Vitality/800/Extra_Health.png"),
			},
			{
				Name: "Extra Regen",
				Image: require("../images/Vitality/800/Extra_Regen.png"),
			},
			{
				Name: "Extra Stamina",
				Image: require("../images/Vitality/800/Extra_Stamina.png"),
			},
			{
				Name: "Healing Rite",
				Image: require("../images/Vitality/800/Healing_Rite.png"),
			},
			{
				Name: "Melee Lifesteal",
				Image: require("../images/Vitality/800/Melee_Lifesteal.png"),
			},
			{
				Name: "Rebuttal",
				Image: require("../images/Vitality/800/Rebuttal.png"),
			},
			{
				Name: "Sprint Boots",
				Image: require("../images/Vitality/800/Sprint_Boots.png"),
			},
		],
		tier2: [
			{
				Name: "Battle Vest",
				Image: require("../images/Vitality/1600/Battle_Vest.png"),
			},
			{
				Name: "Bullet Lifesteal",
				Image: require("../images/Vitality/1600/Bullet_Lifesteal_(item).png"),
			},
			{
				Name: "Debuff Reducer",
				Image: require("../images/Vitality/1600/Debuff_Reducer.png"),
			},
			{
				Name: "Enchanter's Emblem",
				Image: require("../images/Vitality/1600/Enchanter's_Emblem.png"),
			},
			{
				Name: "Enduring Speed",
				Image: require("../images/Vitality/1600/Enduring_Speed.png"),
			},
			{
				Name: "Guardian Ward",
				Image: require("../images/Vitality/1600/Guardian_Ward.png"),
			},
			{
				Name: "Healbane",
				Image: require("../images/Vitality/1600/Healbane.png"),
			},
			{
				Name: "Healing Booster",
				Image: require("../images/Vitality/1600/Healing_Booster.png"),
			},
			{
				Name: "Reactive Barrier",
				Image: require("../images/Vitality/1600/Reactive_Barrier.png"),
			},
			{
				Name: "Restorative Locket",
				Image: require("../images/Vitality/1600/Restorative_Locket.png"),
			},
			{
				Name: "Return Fire",
				Image: require("../images/Vitality/1600/Return_Fire.png"),
			},
			{
				Name: "Spirit Lifesteal",
				Image: require("../images/Vitality/1600/Spirit_Lifesteal_(item).png"),
			},
			{
				Name: "Spirit Shielding",
				Image: require("../images/Vitality/1600/Spirit_Shielding.png"),
			},
			{
				Name: "Weapon Shielding",
				Image: require("../images/Vitality/1600/Weapon_Shielding.png"),
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
