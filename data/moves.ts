type Upgrade = string;

interface Signature {
	upgrades: [Upgrade, Upgrade, Upgrade];
}

type Hero = {
	id: number;
	name: string;
	signature1: Signature;
	signature2: Signature;
	signature3: Signature;
	signature4: Signature;
};

export const heroMoves: Hero[] = [
	{
		id: 6,
		name: "Abrams",
		signature1: {
			upgrades: ["-19s Cooldown", "+2s Duration", "+38 Damage Per Second"],
		},
		signature2: {
			upgrades: [
				"On Hero Collide: +25% Weapon Damage for 8s",
				"On Wall Hit: +0.45s Stun Duration",
				"-22s Cooldown",
			],
		},
		signature3: {
			upgrades: [
				"+1.5 Health Regen",
				"+150 Max Health",
				"+7% Damage Regenerated",
			],
		},
		signature4: {
			upgrades: [
				"-35s Cooldown",
				"On Hero Hit: +100 Max HP and +15% Fire Rate",
				"On cast, become Unstoppable.",
			],
		},
	},
	{
		id: 15,
		name: "Bebop",
		signature1: {
			upgrades: [
				"-10.5s Cooldown",
				"On Hero Hit: Gain fast spin-up time, 2x weapon range and +40% weapon damage for 9s",
				"On Hero Hit: Set Grapple Arm cooldown to 0 and add +100% bullets to your current clip",
			],
		},
		signature2: {
			upgrades: [
				"-8s Cooldown",
				"+70 Damage",
				"On Attach: -30% Outgoing Damage for 5s",
			],
		},
		signature3: {
			upgrades: [
				"+20% weapon damage against victims for 6s",
				"+30m Cast Range",
				"-11.5s Cooldown",
			],
		},
		signature4: {
			upgrades: [
				"-25s Cooldown",
				"+90 Damage Per Second",
				"Hyper Beam heals Bebop for 65% of its damage on Heroes. 20% on non-hero",
			],
		},
	},
	{
		id: 16,
		name: "Calico",
		signature1: {
			upgrades: ["-3s Cooldown", "+18 Damage", "+2 Bomb Count"],
		},
		signature2: {
			upgrades: [
				"+25 Heal Amount",
				"+55 Damage",
				"On Hero Hit: 50% Cooldown Refund",
			],
		},
		signature3: {
			upgrades: [
				"+14s Buff Duration",
				"+45% Move Speed",
				"-15s Cooldown. Gain 25 Health Regen during Ava.",
			],
		},
		signature4: {
			upgrades: [
				"-25s Cooldown",
				"+75 Damage. +20% Move Speed.",
				"Refund all cooldowns and gain 24% Damage for 5s.",
			],
		},
	},
	{
		id: 11,
		name: "Dynamo",
		signature1: {
			upgrades: [
				"On Hit: 35% Slow and -35% Fire Rate for 4s",
				"On Hit: +30% Bullet Damage Taken for 8s",
				"+115 Damage and +1 Charge",
			],
		},
		signature2: {
			upgrades: [
				"+4m Cast Range",
				"+25% Fire Rate Bonus",
				"-5s Cooldown and On Buff: +120% Max Ammo",
			],
		},
		signature3: {
			upgrades: [
				"Gain +4m/s movespeed bonus for 8s if Aurora is fully channeled. Gain instantly with 5AP Upgrade.",
				"-14s Cooldown",
				"Full move and ability use and additionally heals +2.5% of Max Health per second",
			],
		},
		signature4: {
			upgrades: [
				"+2m Singularity Radius",
				"+0.75s Channel Duration",
				"+4% Max Health as Damage",
			],
		},
	},
	{
		id: 17,
		name: "Grey Talon",
		signature1: {
			upgrades: [
				"+1 Charges",
				"+60 Damage",
				"Improved damage scaling and -3s Charge Delay",
			],
		},
		signature2: {
			upgrades: [
				"-14s Cooldown",
				"While airborne, +5 Weapon Damage and weapon damage applies 40% movement slow for 1.5s",
				"While airborne, +30% Bullet Lifesteal and +30% Spirit Lifesteal",
			],
		},
		signature3: {
			upgrades: [
				"-20s Cooldown",
				"+0.75s Tether Duration",
				"Grey Talon deals +30% more Bullet Damage to enemies hit by Spirit Snare for 10s",
			],
		},
		signature4: {
			upgrades: [
				"+90 Damage",
				"-45s Cooldown",
				"After hit, kills enemies that are below 22% Health",
			],
		},
	},
	{
		id: 13,
		name: "Haze",
		signature1: {
			upgrades: [
				"Removes 1 stamina on wake-up",
				"-12.0 Cooldown and -60% stamina recovery for 6s on wake-up",
				"Applies -12% Bullet Resist and -40% Fire Rate for 6s on wake-up.",
			],
		},
		signature2: {
			upgrades: [
				"+5m Invis Sprint Speed",
				"After invis, gain +10% Bullet Lifesteal for 8s",
				"Enable Ability Charges and grants 0.5s of Invincibility",
			],
		},
		signature3: {
			upgrades: [
				"55 Spirit damage and 15% slow for 2s to target every 20 stacks",
				"+40 Max Stacks and +5s Duration",
				"+0.12per stack Weapon Damage",
			],
		},
		signature4: {
			upgrades: [
				"+4 Weapon Damage",
				"-45s Cooldown",
				"+60% Bullet Evasion and +3m/s Dance Movespeed",
			],
		},
	},
	{
		id: 14,
		name: "Holliday",
		signature1: {
			upgrades: ["-10s Cooldown", "+75 Explosion Damage", "+3 Charges"],
		},
		signature2: {
			upgrades: [
				"-10s Cooldown",
				"You and allies gain a +4m/s move speed bonus for 4s on landing",
				"+75 Stomp Damage. Improve Spirit scaling",
			],
		},
		signature3: {
			upgrades: [
				"-25% Fading Move Speed",
				"+55 Damage",
				"-4s Cooldown on Hero Headshots. -2s on NPC Headshots",
			],
		},
		signature4: {
			upgrades: ["+75 Damage", "+0.75s Duration", "-30s Cooldown"],
		},
	},
	{
		id: 1,
		name: "Infernus",
		signature1: {
			upgrades: [
				"+1 Charges",
				"Napalm Effect: +10% Lifesteal",
				"Napalm Effect: +20% Damage Taken and -33% Healing",
			],
		},
		signature2: {
			upgrades: [
				"On Hit: -30% Fire Rate for 6s",
				"+37 Damage Per Second",
				"Enable Ability Charges and -15.0s Ability Cooldown",
			],
		},
		signature3: {
			upgrades: [
				"Burn Effect: -25% Spirit Damage",
				"+1s Burn Duration",
				"+28 Damage Per Second",
			],
		},
		signature4: {
			upgrades: [
				"-35s Cooldown",
				"+0.5s Stun Duration and +3m Radius",
				"+105 Damage. On Hero Hit: Heal for 70% of damage",
			],
		},
	},
	{
		id: 20,
		name: "Ivy",
		signature1: {
			upgrades: ["+1 Charges", "+2s Duration", "+46.0 DPS and +2m Radius"],
		},
		signature2: {
			upgrades: ["+10% Fire Rate", "+2.0m/s movement bonus", "+1 Tether Count"],
		},
		signature3: {
			upgrades: [
				"-19s Cooldown",
				"+75 Damage and stuns for 0.5s.",
				"+13% Max Health Heal",
			],
		},
		signature4: {
			upgrades: [
				"-20% Bullet Resist on enemies hit for 8s",
				"+200 Barrier and +5m Explode Radius",
				"Applies Silence on enemies hit for +3s",
			],
		},
	},
	{
		id: 12,
		name: "Kelvin",
		signature1: {
			upgrades: [
				"+1 Charges",
				"Frost Grenade now heals 80 HP to friendly targets. Scales with Spirit.",
				"+160 Damage",
			],
		},
		signature2: {
			upgrades: [
				"+4m Sprint Speed",
				"-15s Cooldown",
				"While active, gain +1 Spirit Power per meter of Ice Path trail created. Max of 55 Spirit Power",
			],
		},
		signature3: {
			upgrades: [
				"-7s Cooldown",
				"+37 Damage Per Second",
				"Fires 2 additional Arctic Beams toward enemies within 10m of the last target hit",
			],
		},
		signature4: {
			upgrades: [
				"-40% Enemy Fire Rate",
				"-45s Cooldown",
				"+50 Health Regen and now scales with Spirit Power",
			],
		},
	},
	{
		id: 4,
		name: "Lady Geist",
		signature1: {
			upgrades: [
				"-4s Cooldown",
				"+55 Damage",
				"Bombs leave a toxic mess on the ground, dealing 26% of the original damage per second, for 6s.",
			],
		},
		signature2: {
			upgrades: [
				"+18 Damage Per Second",
				"+2s Duration",
				"Ability becomes charged and grants +1 Charge",
			],
		},
		signature3: {
			upgrades: [
				"-3s Cooldown",
				"+28 Damage and +4 Blood Shards",
				"+7% Damage Amp",
			],
		},
		signature4: {
			upgrades: [
				"-35s Cooldown",
				"On cast, +40% Fire Rate for 8s.",
				"Silence enemies within 15m for 3s",
			],
		},
	},
	{
		id: 31,
		name: "Lash",
		signature1: {
			upgrades: [
				"-10s Cooldown",
				"Struck enemies are knocked up and slowed by 50% for 3s",
				"Damage Per Meter +110% and improved scaling",
			],
		},
		signature2: {
			upgrades: [
				"-19s Cooldown",
				"+20m Cast Range and gain +6 Weapon Damage for 10s",
				"+20% Fire Rate to Weapon Bonus Buff",
			],
		},
		signature3: {
			upgrades: [
				"Apply -35% Move speed for 3s",
				"-14s Cooldown",
				"+95 Damage and applies -35% Fire Rate",
			],
		},
		signature4: {
			upgrades: [
				"+8m Max Throw Distance",
				"-25s Cooldown",
				"Stun enemies in the landing zone for 1s",
			],
		},
	},
	{
		id: 8,
		name: "McGinnis",
		signature1: {
			upgrades: [
				"Turrets apply +25% Movement Slow",
				"+10m Attack Range and +10% turret fire rate",
				"+42 Turret DPS and +14s Turret Lifetime",
			],
		},
		signature2: {
			upgrades: [
				"+35% Fire Rate on units being healed by Medicinal Specter",
				"-17s Cooldown",
				"+3% Max Health regen per second",
			],
		},
		signature3: {
			upgrades: [
				"Removes 1 stamina and amplifies McGinnis's damage by 15% on hit enemies for 7s",
				"-20s Cooldown",
				"Adds a 0.75s Stun to enemies hit by Spectral Wall",
			],
		},
		signature4: {
			upgrades: [
				"Applies 30% movement slow",
				"-45s Cooldown",
				"+23 Damage per Rocket and Improved damage scaling",
			],
		},
	},
	{
		id: 52,
		name: "Mirage",
		signature1: {
			upgrades: [
				"-15s Cooldown",
				"--8% Bullet Resist",
				"+60 Max HP Steal Per Bullet",
			],
		},
		signature2: {
			upgrades: [
				"+0.4s Lift Duration",
				"-14s Cooldown",
				"+20% Bullet Evasion Chance",
			],
		},
		signature3: {
			upgrades: [
				"Apply 60% Slow for 0.5s whenever you apply 2x multiplier or higher",
				"+2.5s Multiplier Duration and +9 Base Damage",
				"-0.75s Cooldown Between Multiplier and +4 Max Multiplier",
			],
		},
		signature4: {
			upgrades: [
				"+2m Move Speed",
				"Grants Traveller Buffs to Ally",
				"On arrival, become Immune to Stun, Silence, Sleep, Root, and Disarm for 3s.",
			],
		},
	},
	{
		id: 18,
		name: "Mo & Krill",
		signature1: {
			upgrades: [
				"-3.75s Cooldown",
				"+23 Damage",
				"Adds a debuff to enemies that lets Mo & Krill deal +15% Damage to them. Stacks and lasts 16s.",
			],
		},
		signature2: {
			upgrades: [
				"Burrow time +3s",
				"+75 Spin DPS and +2 radius",
				"-19.0 Cooldown and +2m/s Move Speed",
			],
		},
		signature3: {
			upgrades: ["+1s Duration", "-19s Cooldown", "Slow targets by -40%"],
		},
		signature4: {
			upgrades: [
				"+30% Bullet Resist during Combo",
				"Combo Duration +0.75s",
				"+35 Damage Per Second and 80% lifesteal",
			],
		},
	},
	{
		id: 10,
		name: "Paradox",
		signature1: {
			upgrades: [
				"+0.8s Duration",
				"-8s Cooldown",
				"+40 Pulse Damage and +0.75m Radius per pulse.",
			],
		},
		signature2: {
			upgrades: [
				"+2m Width,+1m Height",
				"+9% Max Health Damage on Touch",
				"Enemies that touch Time Wall will be Silenced for 2.5s",
			],
		},
		signature3: {
			upgrades: [
				"+0.4s Max Time-Stop",
				"-8s Cooldown and +2s Charge Hold Duration",
				"+50% Max Damage Scaling",
			],
		},
		signature4: {
			upgrades: ["-15s Cooldown", "+90 Swap Damage", "+15m Cast Range"],
		},
	},
	{
		id: 50,
		name: "Pocket",
		signature1: {
			upgrades: [
				"+14 Damage Per Projectile",
				"-14s Cooldown",
				"+4% Amp Per Stack and 2m Radius",
			],
		},
		signature2: {
			upgrades: [
				"-14s Cooldown",
				"+75 Damage",
				"+7 Weapon Damage for 10s after teleporting with Flying Cloak.",
			],
		},
		signature3: {
			upgrades: [
				"-5s Cooldown",
				"+100 Damage",
				"Applies -40% Fire Rate for 4.0s. +0.5s Escape Duration",
			],
		},
		signature4: {
			upgrades: [
				"-25s Cooldown",
				"+4s Duration and suppresses targets' healing by -40%",
				"+18 DPS and +6m Radius",
			],
		},
	},
	{
		id: 2,
		name: "Seven",
		signature1: {
			upgrades: ["+1 Charges", "+35% Move Speed", "+65 DPS and +1m radius"],
		},
		signature2: {
			upgrades: ["-19s Cooldown", "+8m Radius", "+0.9s Stun Duration"],
		},
		signature3: {
			upgrades: [
				"-15s Cooldown",
				"Shock Damage applies -15% Spirit Resist for 8s",
				"+12 Shock Damage, improved Spirit scaling, and +3 Max Jumps",
			],
		},
		signature4: {
			upgrades: [
				"+35% Bullet Resist while channeling Storm Cloud",
				"+7s Channel Time and +10m Radius",
				"+60 DPS and allows movement control",
			],
		},
	},
	{
		id: 19,
		name: "Shiv",
		signature1: {
			upgrades: [
				"+1 Charges",
				"+2s Bleed Duration",
				"+37 Damage and +6.5 Bleed DPS",
			],
		},
		signature2: {
			upgrades: [
				"-3s Cooldown",
				"+55 Damage",
				"Reduce cooldown by 2s per enemy hero hit (1s for Non-Hero). Max -6s per Dash.",
			],
		},
		signature3: {
			upgrades: [
				"-10s Cooldown",
				"+10% Incoming Damage Deferred",
				"+35% Deferred Damage Cleared",
			],
		},
		signature4: {
			upgrades: [
				"Gain +2 m/s move speed while at full rage.",
				"+5% Enemy Health Threshold and +8% Full Rage Bonus Damage",
				"Finishing off an enemy with Killing Blow resets its cooldown.",
			],
		},
	},
	{
		id: 60,
		name: "Sinclair",
		signature1: {
			upgrades: [
				"Bolts apply -25% Fire Rate for 5s.",
				"-13s Cooldown",
				"+140.0 Max Damage. +50.0% Assistant Damage.",
			],
		},
		signature2: {
			upgrades: [
				"-10s Cooldown",
				"+7s Duration & 5m Range",
				"+45% Fire Rate and +14 Assistant Damage",
			],
		},
		signature3: {
			upgrades: [
				"-10s Cooldown",
				"+1s Hex Duration",
				"+5% Damage Amp and +3m Radius",
			],
		},
		signature4: {
			upgrades: [
				"Upgrade the Copy.",
				"Upgrade the Copy AGAIN!",
				"Upgrade the Copy ONCE AGAIN!",
			],
		},
	},
	{
		id: 3,
		name: "Vindicta",
		signature1: {
			upgrades: [
				"+40% Fire Rate",
				"-20s Cooldown",
				"+0.5s Tether Duration and +1m Capture Radius",
			],
		},
		signature2: {
			upgrades: [
				"+50% base Ammo while flying",
				"+6s Duration",
				"+11 Spirit Damage Per Bullet",
			],
		},
		signature3: {
			upgrades: [
				"Crow Ricochets up to 2 times towards other enemies within 15m",
				"-16s Cooldown",
				"-8% Bullet Resist and -8% Spirit Resist",
			],
		},
		signature4: {
			upgrades: [
				"-20s Cooldown",
				"+100 Max Bonus Damage",
				"Assassinate kills grant +600 souls",
			],
		},
	},
	{
		id: 35,
		name: "Viscous",
		signature1: {
			upgrades: [
				"-5.75s Cooldown",
				"+45.0 Damage and +1m Radius",
				"Bounces 2 times",
			],
		},
		signature2: {
			upgrades: [
				"Increases Move Speed and Stamina Recovery",
				"+25 Health Regen",
				"Removes all Debuffs and -21.0s Cooldown",
			],
		},
		signature3: {
			upgrades: [
				"+1 Charges",
				"+30 Damage and +15% Movement Slow",
				"-12s Cooldown and now deals Heavy Melee Damage",
			],
		},
		signature4: {
			upgrades: [
				"+5s Duration",
				"+80 Damage",
				"Can cast abilities and use items while rolling",
			],
		},
	},
	{
		id: 58,
		name: "Vyper",
		signature1: {
			upgrades: [
				"-4s Cooldown",
				"+50 Damage",
				"+1s Slow Duration and remove 1 Stamina",
			],
		},
		signature2: {
			upgrades: [
				"+35 Max Venom Damage",
				"-40% Healing Reduction",
				"Bullets also build up Lethal Venom",
			],
		},
		signature3: {
			upgrades: [
				"+20% Slide Distance",
				"+2 Stamina",
				"+20% Spirit & Bullet Resist while Sliding",
			],
		},
		signature4: {
			upgrades: [
				"+55 Petrify Damage",
				"-25s Cooldown",
				"+1.0s Petrify Duration. Petrifies all enemies in the area.",
			],
		},
	},
	{
		id: 25,
		name: "Warden",
		signature1: {
			upgrades: [
				"Hit enemies lose 1 Stamina",
				"+45 Damage",
				"-6.5s Cooldown and Weapon Debuff applies -35% Fire Rate",
			],
		},
		signature2: {
			upgrades: [
				"+20% Move Speed bonus",
				"-19s Cooldown",
				"+150 Barrier Health and now scales with Spirit Power",
			],
		},
		signature3: {
			upgrades: [
				"+1s Immobilize Duration",
				"-19s Cooldown",
				"Warden deals +20% more Bullet Damage to trapped Heroes for 6s",
			],
		},
		signature4: {
			upgrades: [
				"+3m Radius",
				"+45.0 DPS-30.0s Cooldown",
				"+50.0% Bullet Resist+50.0% Spirit Resist+2.5s Duration",
			],
		},
	},
	{
		id: 7,
		name: "Wraith",
		signature1: {
			upgrades: [
				"+1 Charges",
				"+45 Damage",
				"+50% Card Summon Rate and Cards apply a 30% Slow for 1s.",
			],
		},
		signature2: {
			upgrades: [
				"+15m Cast Range",
				"300 Barrier for 5s. Barrier scales with Spirit Power.",
				"-28s Cooldown",
			],
		},
		signature3: {
			upgrades: [
				"-14s Cooldown",
				"+2.8 Spirit Damage Per Bullet",
				"+15% Bullet and Spirit Lifesteal and Increased Scaling on Spirit Damage Per Bullet",
			],
		},
		signature4: {
			upgrades: [
				"-25s Cooldown",
				"+0.75s Duration",
				"Telekinesis will bounce to an additional nearby target",
			],
		},
	},
	{
		id: 27,
		name: "Yamato",
		signature1: {
			upgrades: [
				"Gain +60 Bullet Resist while channeling",
				"-2s Ability Cooldown and apply 40% movement slow for 3s",
				"+185 Full Charge Damage",
			],
		},
		signature2: {
			upgrades: [
				"+25% Move Speed",
				"+20m Cast Range",
				"Can Grapple to ally Heroes and +6 Weapon Damage for 10s",
			],
		},
		signature3: {
			upgrades: [
				"+30% Fire Rate",
				"+6% of Max Health Heal on hero hit",
				"-5.75s Cooldown",
			],
		},
		signature4: {
			upgrades: [
				"+15% Fire Rate",
				"+4m Move Speed",
				"+3.0s Duration +20% Bullet Resist +20% Spirit Resist",
			],
		},
	},
	{
		id: 63,
		name: "Mina",
		signature1: {
			upgrades: [
				"+20 Heal Per Kill",
				"+60 Damage",
				"+6% Missing Health as Damage",
			],
		},
		signature2: {
			upgrades: [
				"+3m Cast Range",
				"On Cast: Gain +30% Fire Rate & add 8 bullets",
				"-12s Cooldown",
			],
		},
		signature3: {
			upgrades: [
				"On Proc: +160 m/s Move Speed for 3s",
				"+4 Damage, +55 Bonus Damage",
				"On Proc: -1 Stamina and 30% Slow for 3s",
			],
		},
		signature4: {
			upgrades: [
				"+2 Damage",
				"+40s Cooldown",
				"On Hit: Deal +1% Current Health as Damage",
			],
		},
	},
	{
		id: 64,
		name: "Drifter",
		signature1: {
			upgrades: [
				"+35 Bonus Damage",
				"-7s Cooldown",
				"Gain 45% Bullet Lifesteal against affected enemies for 4s",
			],
		},
		signature2: {
			upgrades: [
				"+1%/sec Bleed Damage",
				"+25% Fire Rate for 6s after ambushing",
				"Enable 2 Ability Charges",
			],
		},
		signature3: {
			upgrades: [
				"+2m/s Move Speed when around an isolated enemy hero",
				"On isolated kill: reduces the cooldown of all your abilities by 15s and restores 3 stamina",
				"+10% Amplified Damage",
			],
		},
		signature4: {
			upgrades: [
				"+7 Spirit Damage Proc",
				"-30s Cooldown and +3m/s Sprint Speed",
				"+2s Duration and +1 Max Targets",
			],
		},
	},
	{
		id: 66,
		name: "Victor",
		signature1: {
			upgrades: [
				"+40 Damage",
				"On Hit: Apply 40% Slow for 2s",
				"On Hero Hit: Heal for 20% of your missing health",
			],
		},
		signature2: {
			upgrades: [
				"+1.5m Move Speed",
				"+50 Total HP Regen",
				"-4s Cooldown, On Cast: Purge non-ultimate debuffs",
			],
		},
		signature3: {
			upgrades: [
				"Enemies receive 30% Slow",
				"+10 Min DPS and +50 Max DPS",
				"Enemies take +13% Damage",
			],
		},
		signature4: {
			upgrades: [
				"On Revive: Gain 25% Fire Rate and 10 Spirit Damage per Bullet",
				"+40% Rebirth Health",
				"+200 Damage and 3m Radius",
			],
		},
	},
	{
		id: 67,
		name: "Paige",
		signature1: {
			upgrades: ["-5s Cooldown", "+2s Trail Duration", "+115 Damage & +30 DPS"],
		},
		signature2: {
			upgrades: [
				"+50 Barrier",
				"On Barrier: +25% Fire Rate",
				"Up to 2 additional allies gain 75% Barrier",
			],
		},
		signature3: {
			upgrades: [
				"-6s Cooldown",
				"+0.75s Immobilize Duration",
				"On Hit: Reduce Spirit Resist by -18% for 6s",
			],
		},
		signature4: {
			upgrades: [
				"+150 Heal Amount",
				"Increase Width by +4 Steeds",
				"+150 Damage and +0.5s Stun Duration",
			],
		},
	},
	{
		id: 69,
		name: "Doorman",
		signature1: {
			upgrades: [
				"+2m Radius",
				"+30 Impact Damage +50 Explosion Damage",
				"Impacts cause half radius explosions",
			],
		},
		signature2: {
			upgrades: [
				"+10s Duration",
				"Grants a Barrier first time traveling through doors",
				"+50m Doorway Distance +30m Cast Range",
			],
		},
		signature3: {
			upgrades: [
				"-8s Cooldown",
				"+15m Cast Range",
				"+50 Cart Damage and deal 130 Damage and 1.2s stun on wall impact",
			],
		},
		signature4: {
			upgrades: [
				"+2m Cast Range",
				"Unstoppable while channeling",
				"-50s Cooldown",
			],
		},
	},
	{
		id: 72,
		name: "Billy",
		signature1: {
			upgrades: [
				"-10s Cooldown",
				"+1.3m Radius",
				"Now deals 60% Heavy Melee Damage",
			],
		},
		signature2: {
			upgrades: [
				"On Impact: -50% cooldown",
				"On Impact: +25% weapon damage for 5s",
				"On Impact: Deal 6% max health as spirit damage",
			],
		},
		signature3: {
			upgrades: [
				"While Blasted: +1.75m/s bonus move speed",
				"+1 Bashdown Charge on use and +7% Wrecked Bullet Amp",
				"+50 Melee Bonus Health",
			],
		},
		signature4: {
			upgrades: [
				"-25s Cooldown",
				"+15% spirit resist & bullet resist",
				"+100 spirit damage On Pull: Unstoppable for 2s",
			],
		},
	},
];
