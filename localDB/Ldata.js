'use strict';

const dataLegendary = [
	{
		classification: "mastermind",
		name: "Mr.Sinister",
		expansion: "Dark City"
	},
	{
		classification: "mastermind",
		name: "Stryfe",
		expansion: "Dark City"
	},
	{
		classification: "mastermind",
		name: "Mephisto",
		expansion: "Dark City"
	},
	{
		classification: "mastermind",
		name: "Apocalypse",
		expansion: "Dark City"
	},
	{
		classification: "mastermind",
		name: "Kingpin",
		expansion: "Dark City"
	},
	{
		classification: "scheme",
		name: "Transform Citizens into Demons",
		expansion: "Dark City"
	},
	{
		classification: "scheme",
		name: "X-Cutioner's Song",
		expansion: "Dark City"
	},
	{
		classification: "scheme",
		name: "Capture Baby Hope",
		expansion: "Dark City"
	},
	{
		classification: "scheme",
		name: "Detonate the Helicarrier",
		expansion: "Dark City"
	},
	{
		classification: "scheme",
		name: "Massive Earthquake Generator",
		expansion: "Dark City"
	},
	{
		classification: "scheme",
		name: "Organized Crime Wave",
		expansion: "Dark City"
	},
	{
		classification: "scheme",
		name: "Save Humanity",
		expansion: "Dark City"
	},
	{
		classification: "scheme",
		name: "Steal the Weaponized Plutonium",
		expansion: "Dark City"
	},
	{
		classification: "villian",
		name: "Mauraders",
		expansion: "Dark City"
	},
	{
		classification: "villian",
		name: "MLF",
		expansion: "Dark City"
	},
	{
		classification: "henchman",
		name: "Maggia Goons",
		expansion: "Dark City"
	},
	{
		classification: "villian",
		name: "Emissaries of Evil",
		expansion: "Dark City"
	},
	{
		classification: "villian",
		name: "Four Horsemen",
		expansion: "Dark City"
	},
	{
		classification: "villian",
		name: "Streets of New York",
		expansion: "Dark City"
	},
	{
		classification: "villian",
		name: "Underworld",
		expansion: "Dark City"
	},
	{
		classification: "henchman",
		name: "Phalanx",
		expansion: "Dark City"
	},
	{
		classification: "hero",
		name: "Elektra",
		expansion: "Dark City"
	},
	{
		classification: "hero",
		name: "Bishop",
		expansion: "Dark City"
	},
	{
		classification: "hero",
		name: "Blade",
		expansion: "Dark City"
	},
	{
		classification: "hero",
		name: "Daredevil",
		expansion: "Dark City"
	},
	{
		classification: "hero",
		name: "Elektra",
		expansion: "Dark City"
	},
	{
		classification: "hero",
		name: "Forge",
		expansion: "Dark City"
	},
	{
		classification: "hero",
		name: "Angel",
		expansion: "Dark City"
	},
	{
		classification: "hero",
		name: "Punisher",
		expansion: "Dark City"
	},
	{
		classification: "hero",
		name: "Iron Fist",
		expansion: "Dark City"
	},
	{
		classification: "hero",
		name: "Jean Grey",
		expansion: "Dark City"
	},
	{
		classification: "hero",
		name: "Iceman",
		expansion: "Dark City"
	},
	{
		classification: "hero",
		name: "Ghost Rider",
		expansion: "Dark City"
	},
	{
		classification: "hero",
		name: "Wolverine",
		expansion: "Dark City"
	},
	{
		classification: "hero",
		name: "Domino",
		expansion: "Dark City"
	},
	{
		classification: "hero",
		name: "Cable",
		expansion: "Dark City"
	},
	{
		classification: "hero",
		name: "Colossus",
		expansion: "Dark City"
	},
	{
		classification: "hero",
		name: "Professor X",
		expansion: "Dark City"
	},
	{
		classification: "hero",
		name: "Nightcrawler",
		expansion: "Dark City"
	},
	{
		classification: "mastermind",
		name: "Red Skull",
		expansion: "base"
	},
	{
		classification: "mastermind",
		name: "Magneto",
		expansion: "base"
	},
	{
		classification: "mastermind",
		name: "Loki",
		expansion: "base"
	},
	{
		classification: "mastermind",
		name: "Dr.Doom",
		expansion: "base"
	},
	{
		classification: "scheme",
		name: "Portals to the Dark Dimension",
		expansion: "base"
	},
	{
		classification: "scheme",
		name: "Midtown Bank Robbery",
		expansion: "base"
	},
	{
		classification: "scheme",
		name: "Negative Zone Prison Breakouot",
		expansion: "base"
	},
	{
		classification: "scheme",
		name: "Super Hero Civil War",
		expansion: "base"
	},
	{
		classification: "scheme",
		name: "Unleash the Power of the Cosmic Cube",
		expansion: "base"
	},
	{
		classification: "scheme",
		name: "Replace the Earth's Leaders with Killebots",
		expansion: "base"
	},
	{
		classification: "scheme",
		name: "Secret Invasion of the Skrull Shapeshifters",
		expansion: "base"
	},
	{
		classification: "scheme",
		name: "The Legacy Virus",
		expansion: "base"
	},
	{
		classification: "henchman",
		name: "Savage Land Mutates",
		expansion: "base"
	},
	{
		classification: "villian",
		name: "Radiation",
		expansion: "base"
	},
	{
		classification: "henchman",
		name: "Doombot Legion",
		expansion: "base"
	},
	{
		classification: "villian",
		name: "Skrulls",
		expansion: "base"
	},
	{
		classification: "henchman",
		name: "Sentinels",
		expansion: "base"
	},
	{
		classification: "villian",
		name: "Enemies of Asgard",
		expansion: "base"
	},
	{
		classification: "villian",
		name: "Brotherhood",
		expansion: "base"
	},
	{
		classification: "henchman",
		name: "Hand Ninjas",
		expansion: "base"
	},
	{
		classification: "villian",
		name: "Spider-foes",
		expansion: "base"
	},
	{
		classification: "villian",
		name: "Masters of Evil",
		expansion: "base"
	},
	{
		classification: "villian",
		name: "Hydra",
		expansion: "base"
	},
	{
		classification: "hero",
		name: "Emma Frost",
		expansion: "base"
	},
	{
		classification: "hero",
		name: "Spider-man",
		expansion: "base"
	},
	{
		classification: "hero",
		name: "Nick Fury",
		expansion: "base"
	},
	{
		classification: "hero",
		name: "Wolverine",
		expansion: "base"
	},
	{
		classification: "hero",
		name: "Black Widow",
		expansion: "base"
	},
	{
		classification: "hero",
		name: "Storm",
		expansion: "base"
	},
	{
		classification: "hero",
		name: "Gambit",
		expansion: "base"
	},
	{
		classification: "hero",
		name: "Hawkeye",
		expansion: "base"
	},
	{
		classification: "hero",
		name: "Thor",
		expansion: "base"
	},
	{
		classification: "hero",
		name: "Cyclops",
		expansion: "base"
	},
	{
		classification: "hero",
		name: "Captian America",
		expansion: "base"
	},
	{
		classification: "hero",
		name: "Deadpool",
		expansion: "base"
	},
	{
		classification: "hero",
		name: "Rogue",
		expansion: "base"
	},
	{
		classification: "hero",
		name: "Hulk",
		expansion: "base"
	}

];

module.exports = {dataLegendary};