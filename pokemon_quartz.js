const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;
const TILE_SIZE = 40;
const FPS = 60;

const COLORS = {
  WHITE: "rgb(255,255,255)",
  BLACK: "rgb(0,0,0)",
  GREEN: "rgb(34,139,34)",
  DARK_GREEN: "rgb(0,100,0)",
  BLUE: "rgb(0,100,255)",
  GRAY: "rgb(128,128,128)",
  RED: "rgb(255,0,0)",
  YELLOW: "rgb(255,255,0)",
  LIGHT_GRAY: "rgb(200,200,200)",
  PINK: "rgb(255,182,193)",
  TREE_GREEN: "rgb(16,110,16)",
  TREE_BROWN: "rgb(120,80,30)",
  TREE_SHADOW: "rgb(10,80,10)",
  TREE_HIGHLIGHT: "rgb(50,160,50)",
  TREE_BROWN_DARK: "rgb(90,60,20)"
};

const EVOLUTIONS = {
  Turtwig: ["Grotle", 18],
  Grotle: ["Torterra", 32],
  Chimchar: ["Monferno", 14],
  Monferno: ["Infernape", 36],
  Piplup: ["Prinplup", 16],
  Prinplup: ["Empoleon", 36],
  Starly: ["Staravia", 14],
  Staravia: ["Staraptor", 34],
  Bidoof: ["Bibarel", 15],
  Shinx: ["Luxio", 15],
  Luxio: ["Luxray", 30],
  Budew: ["Roserade", 32],
  Cranidos: ["Rampardos", 30],
  Shieldon: ["Bastiodon", 30],
  Buizel: ["Floatzel", 26],
  Gible: ["Gabite", 24],
  Gabite: ["Garchomp", 48],
  Riolu: ["Lucario", 30],
  Croagunk: ["Toxicroak", 37],
  Shellos: ["Gastrodon", 30],
  Finneon: ["Lumineon", 31],
  Snover: ["Abomasnow", 40],
  Piloswine: ["Mamoswine", 34]
};

const MOVES = {
  Tackle: { power: 40, accuracy: 100, type: "Normal" },
  Growl: { power: 0, accuracy: 100, type: "Normal" },
  Ember: { power: 40, accuracy: 100, type: "Fire" },
  Flamethrower: { power: 90, accuracy: 100, type: "Fire" },
  Scratch: { power: 40, accuracy: 100, type: "Normal" },
  "Vine Whip": { power: 45, accuracy: 100, type: "Grass" },
  "Leaf Blade": { power: 90, accuracy: 100, type: "Grass" },
  "Water Gun": { power: 40, accuracy: 100, type: "Water" },
  "Hydro Pump": { power: 110, accuracy: 80, type: "Water" },
  Peck: { power: 35, accuracy: 100, type: "Flying" },
  "Aerial Ace": { power: 60, accuracy: 100, type: "Flying" },
  "Thunder Wave": { power: 0, accuracy: 90, type: "Electric" },
  Thunderbolt: { power: 90, accuracy: 100, type: "Electric" },
  "Dragon Breath": { power: 60, accuracy: 100, type: "Dragon" },
  "Dragon Claw": { power: 80, accuracy: 100, type: "Dragon" },
  "Close Combat": { power: 120, accuracy: 100, type: "Fighting" },
  "Mach Punch": { power: 40, accuracy: 100, type: "Fighting" },
  "Poison Powder": { power: 0, accuracy: 75, type: "Poison" },
  "Sludge Bomb": { power: 90, accuracy: 100, type: "Poison" },
  "Stone Edge": { power: 100, accuracy: 80, type: "Rock" },
  "Rock Slide": { power: 75, accuracy: 90, type: "Rock" },
  "Ice Shard": { power: 40, accuracy: 100, type: "Ice" },
  "Ice Beam": { power: 90, accuracy: 100, type: "Ice" }
};

const POKEMON_MOVES = {
  Turtwig: ["Tackle", "Vine Whip"],
  Grotle: ["Tackle", "Vine Whip", "Leaf Blade"],
  Torterra: ["Tackle", "Vine Whip", "Leaf Blade", "Stone Edge"],
  Chimchar: ["Tackle", "Ember"],
  Monferno: ["Tackle", "Ember", "Flamethrower"],
  Infernape: ["Scratch", "Flamethrower", "Close Combat"],
  Piplup: ["Tackle", "Water Gun"],
  Prinplup: ["Tackle", "Water Gun", "Hydro Pump"],
  Empoleon: ["Water Gun", "Hydro Pump", "Aerial Ace"],
  Starly: ["Tackle", "Peck"],
  Staravia: ["Peck", "Aerial Ace"],
  Staraptor: ["Peck", "Aerial Ace", "Close Combat"],
  Bidoof: ["Tackle"],
  Bibarel: ["Tackle", "Water Gun"],
  Shinx: ["Tackle", "Thunder Wave"],
  Luxio: ["Tackle", "Thunderbolt"],
  Luxray: ["Tackle", "Thunderbolt", "Close Combat"],
  Budew: ["Tackle", "Vine Whip"],
  Roserade: ["Vine Whip", "Leaf Blade", "Sludge Bomb"],
  Cranidos: ["Tackle", "Stone Edge"],
  Rampardos: ["Tackle", "Rock Slide", "Stone Edge", "Close Combat"],
  Shieldon: ["Tackle", "Rock Slide"],
  Bastiodon: ["Rock Slide", "Stone Edge", "Aerial Ace"],
  Buizel: ["Tackle", "Water Gun"],
  Floatzel: ["Tackle", "Water Gun", "Hydro Pump"],
  Gible: ["Tackle", "Dragon Breath"],
  Gabite: ["Dragon Breath", "Dragon Claw"],
  Garchomp: ["Dragon Claw", "Stone Edge", "Close Combat"],
  Riolu: ["Mach Punch", "Close Combat"],
  Lucario: ["Mach Punch", "Close Combat", "Thunderbolt"],
  Croagunk: ["Poison Powder", "Mach Punch"],
  Toxicroak: ["Poison Powder", "Sludge Bomb", "Close Combat"],
  Shellos: ["Tackle", "Water Gun"],
  Gastrodon: ["Tackle", "Water Gun", "Stone Edge"],
  Finneon: ["Tackle", "Water Gun"],
  Lumineon: ["Tackle", "Water Gun", "Hydro Pump"],
  Mantyke: ["Tackle", "Water Gun"],
  Mantine: ["Tackle", "Water Gun", "Hydro Pump"],
  Snover: ["Tackle", "Ice Shard"],
  Abomasnow: ["Tackle", "Ice Shard", "Ice Beam"],
  Snorunt: ["Tackle", "Ice Shard"],
  Froslass: ["Ice Shard", "Ice Beam"],
  Sneasel: ["Tackle", "Ice Shard"],
  Weavile: ["Tackle", "Ice Shard", "Ice Beam"],
  Piloswine: ["Tackle", "Ice Shard", "Stone Edge"],
  Mamoswine: ["Tackle", "Ice Shard", "Stone Edge"],
  Glaceon: ["Ice Shard", "Ice Beam"]
};

const TYPE_EFFECTIVENESS = {
  Fire: { strong_against: ["Grass", "Ice", "Bug", "Steel"], weak_to: ["Water", "Ground", "Rock"] },
  Water: { strong_against: ["Fire", "Ground", "Rock"], weak_to: ["Electric", "Grass"] },
  Grass: { strong_against: ["Water", "Ground", "Rock"], weak_to: ["Fire", "Ice", "Poison", "Flying", "Bug"] },
  Electric: { strong_against: ["Water", "Flying"], weak_to: ["Ground"] },
  Flying: { strong_against: ["Grass", "Fighting", "Bug"], weak_to: ["Electric", "Ice", "Rock"] },
  Dragon: { strong_against: ["Dragon"], weak_to: ["Ice", "Dragon"] },
  Fighting: { strong_against: ["Normal", "Ice", "Rock", "Dark", "Steel"], weak_to: ["Flying", "Psychic", "Fairy"] },
  Poison: { strong_against: ["Grass", "Fairy"], weak_to: ["Ground", "Psychic"] },
  Rock: { strong_against: ["Flying", "Bug", "Fire", "Ice"], weak_to: ["Water", "Grass", "Fighting", "Ground", "Steel"] },
  Ground: { strong_against: ["Fire", "Electric", "Poison", "Rock", "Steel"], weak_to: ["Water", "Grass", "Ice"] },
  Steel: { strong_against: ["Ice", "Rock", "Fairy"], weak_to: ["Fire", "Water", "Ground"] },
  Normal: { strong_against: [], weak_to: ["Fighting"] },
  Ice: { strong_against: ["Flying", "Ground", "Grass", "Dragon"], weak_to: ["Fire", "Fighting", "Rock", "Steel"] },
  Psychic: { strong_against: ["Fighting", "Poison"], weak_to: ["Dark", "Bug", "Ghost"] },
  Ghost: { strong_against: ["Ghost", "Psychic"], weak_to: ["Dark", "Ghost"] },
  Dark: { strong_against: ["Ghost", "Psychic"], weak_to: ["Fighting", "Bug", "Fairy"] },
  Fairy: { strong_against: ["Fighting", "Dragon", "Dark"], weak_to: ["Poison", "Steel"] },
  Bug: { strong_against: ["Grass", "Psychic", "Dark"], weak_to: ["Fire", "Flying", "Rock"] }
};

const GEN4_POKEMON = {
  Turtwig: { type: "Grass", hp: 55, attack: 68, defense: 64, speed: 31 },
  Grotle: { type: "Grass", hp: 75, attack: 89, defense: 85, speed: 36 },
  Torterra: { type: "Grass/Ground", hp: 95, attack: 109, defense: 105, speed: 56 },
  Chimchar: { type: "Fire", hp: 44, attack: 58, defense: 44, speed: 61 },
  Monferno: { type: "Fire/Fighting", hp: 64, attack: 78, defense: 52, speed: 81 },
  Infernape: { type: "Fire/Fighting", hp: 76, attack: 104, defense: 71, speed: 108 },
  Piplup: { type: "Water", hp: 53, attack: 51, defense: 53, speed: 40 },
  Prinplup: { type: "Water", hp: 64, attack: 66, defense: 68, speed: 50 },
  Empoleon: { type: "Water/Steel", hp: 84, attack: 86, defense: 88, speed: 60 },
  Starly: { type: "Normal/Flying", hp: 40, attack: 55, defense: 30, speed: 60 },
  Staravia: { type: "Normal/Flying", hp: 55, attack: 75, defense: 50, speed: 80 },
  Staraptor: { type: "Normal/Flying", hp: 85, attack: 120, defense: 70, speed: 100 },
  Bidoof: { type: "Normal", hp: 59, attack: 45, defense: 40, speed: 31 },
  Bibarel: { type: "Normal/Water", hp: 79, attack: 85, defense: 60, speed: 71 },
  Shinx: { type: "Electric", hp: 45, attack: 65, defense: 34, speed: 45 },
  Luxio: { type: "Electric", hp: 60, attack: 85, defense: 49, speed: 60 },
  Luxray: { type: "Electric", hp: 80, attack: 120, defense: 79, speed: 70 },
  Budew: { type: "Grass/Poison", hp: 40, attack: 30, defense: 35, speed: 55 },
  Roserade: { type: "Grass/Poison", hp: 60, attack: 70, defense: 65, speed: 90 },
  Cranidos: { type: "Rock", hp: 67, attack: 125, defense: 40, speed: 58 },
  Rampardos: { type: "Rock", hp: 97, attack: 165, defense: 60, speed: 58 },
  Shieldon: { type: "Rock/Steel", hp: 30, attack: 42, defense: 118, speed: 30 },
  Bastiodon: { type: "Rock/Steel", hp: 60, attack: 52, defense: 168, speed: 30 },
  Buizel: { type: "Water", hp: 55, attack: 65, defense: 35, speed: 85 },
  Floatzel: { type: "Water", hp: 85, attack: 105, defense: 55, speed: 115 },
  Gible: { type: "Dragon/Ground", hp: 58, attack: 70, defense: 45, speed: 42 },
  Gabite: { type: "Dragon/Ground", hp: 68, attack: 90, defense: 65, speed: 82 },
  Garchomp: { type: "Dragon/Ground", hp: 108, attack: 130, defense: 95, speed: 102 },
  Riolu: { type: "Fighting", hp: 40, attack: 70, defense: 40, speed: 60 },
  Lucario: { type: "Fighting/Steel", hp: 70, attack: 110, defense: 70, speed: 90 },
  Croagunk: { type: "Poison/Fighting", hp: 48, attack: 61, defense: 40, speed: 50 },
  Toxicroak: { type: "Poison/Fighting", hp: 83, attack: 106, defense: 65, speed: 85 },
  Shellos: { type: "Water", hp: 76, attack: 48, defense: 48, speed: 34 },
  Gastrodon: { type: "Water/Ground", hp: 111, attack: 83, defense: 68, speed: 39 },
  Finneon: { type: "Water", hp: 49, attack: 49, defense: 56, speed: 66 },
  Lumineon: { type: "Water", hp: 69, attack: 69, defense: 76, speed: 91 },
  Mantyke: { type: "Water/Flying", hp: 45, attack: 20, defense: 50, speed: 50 },
  Mantine: { type: "Water/Flying", hp: 85, attack: 40, defense: 70, speed: 70 },
  Snover: { type: "Grass/Ice", hp: 60, attack: 62, defense: 50, speed: 40 },
  Abomasnow: { type: "Grass/Ice", hp: 90, attack: 92, defense: 75, speed: 60 },
  Snorunt: { type: "Ice", hp: 50, attack: 50, defense: 50, speed: 50 },
  Froslass: { type: "Ice/Ghost", hp: 70, attack: 80, defense: 70, speed: 110 },
  Sneasel: { type: "Dark/Ice", hp: 55, attack: 95, defense: 55, speed: 115 },
  Weavile: { type: "Dark/Ice", hp: 70, attack: 120, defense: 65, speed: 125 },
  Piloswine: { type: "Ice/Ground", hp: 100, attack: 100, defense: 80, speed: 50 },
  Mamoswine: { type: "Ice/Ground", hp: 110, attack: 130, defense: 80, speed: 80 },
  Glaceon: { type: "Ice", hp: 65, attack: 60, defense: 110, speed: 65 }
};

const BIOME_POKEMON = {
  GRASSLAND: ["Turtwig", "Chimchar", "Piplup", "Starly", "Bidoof", "Shinx", "Budew", "Buizel", "Riolu", "Croagunk"],
  DESERT: ["Cranidos", "Rampardos", "Shieldon", "Bastiodon", "Gible", "Gabite", "Garchomp", "Chimchar", "Monferno"],
  BEACH: ["Buizel", "Floatzel", "Finneon", "Lumineon", "Shellos", "Gastrodon", "Mantyke", "Mantine"],
  SNOW: ["Snover", "Abomasnow", "Snorunt", "Froslass", "Sneasel", "Weavile", "Piloswine", "Mamoswine", "Glaceon"]
};

const BIOME_COLORS = {
  GRASSLAND: { bg: COLORS.DARK_GREEN, accent: COLORS.GREEN },
  DESERT: { bg: "rgb(139,69,19)", accent: "rgb(184,134,11)" },
  BEACH: { bg: "rgb(235,215,150)", accent: "rgb(70,145,190)" },
  SNOW: { bg: "rgb(225,238,248)", accent: "rgb(170,205,235)" }
};

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getTypeEffectiveness(attackerType, defenderType) {
  if (!TYPE_EFFECTIVENESS[attackerType]) return 1.0;
  const effectiveness = TYPE_EFFECTIVENESS[attackerType];

  if (defenderType.includes("/")) {
    const types = defenderType.split("/").map((t) => t.trim());
    let multiplier = 1.0;
    for (const t of types) {
      if (effectiveness.strong_against.includes(t)) multiplier *= 2.0;
      else if (effectiveness.weak_to.includes(t)) multiplier *= 0.5;
    }
    return multiplier;
  }

  if (effectiveness.strong_against.includes(defenderType)) return 2.0;
  if (effectiveness.weak_to.includes(defenderType)) return 0.5;
  return 1.0;
}

class Pokemon {
  constructor(name, level = 5, spriteCache) {
    this.name = name;
    this.level = level;
    const data = GEN4_POKEMON[name];
    this.type = data.type;
    this.max_hp = data.hp + level * 2;
    this.current_hp = this.max_hp;
    this.attack = data.attack + level;
    this.defense = data.defense + level;
    this.speed = data.speed + level;
    this.current_xp = 0;
    this.xp_to_level = 100;
    this.moves = POKEMON_MOVES[name] ? [...POKEMON_MOVES[name]] : [];
    this.spriteCache = spriteCache;
  }

  getSprite() {
    return this.spriteCache[`${this.name.toLowerCase()}.png`] || null;
  }

  takeDamage(damage) {
    this.current_hp -= damage;
    if (this.current_hp < 0) this.current_hp = 0;
  }

  heal() {
    this.current_hp = this.max_hp;
  }

  isAlive() {
    return this.current_hp > 0;
  }

  gainXp(amount) {
    this.current_xp += amount;
    return this.checkLevelUp();
  }

  checkLevelUp() {
    const result = {
      evolved: false,
      levelUps: [],
      evolutions: []
    };

    while (this.current_xp >= this.xp_to_level) {
      this.current_xp -= this.xp_to_level;
      const oldName = this.name;
      const oldLevel = this.level;
      const oldMaxHp = this.max_hp;
      const oldAttack = this.attack;
      const oldDefense = this.defense;
      const oldSpeed = this.speed;

      this.level += 1;

      const data = GEN4_POKEMON[this.name];
      this.max_hp = data.hp + this.level * 2;
      this.current_hp = this.max_hp;
      this.attack = data.attack + this.level;
      this.defense = data.defense + this.level;
      this.speed = data.speed + this.level;

      result.levelUps.push({
        name: oldName,
        fromLevel: oldLevel,
        toLevel: this.level,
        hpGain: this.max_hp - oldMaxHp,
        attackGain: this.attack - oldAttack,
        defenseGain: this.defense - oldDefense,
        speedGain: this.speed - oldSpeed
      });

      if (EVOLUTIONS[this.name]) {
        const [evolveName, evolveLevel] = EVOLUTIONS[this.name];
        if (this.level >= evolveLevel) {
          this.evolve(evolveName);
          result.evolved = true;
          result.evolutions.push({ from: oldName, to: this.name });
        }
      }
    }

    return result;
  }

  evolve(newName) {
    this.name = newName;
    const data = GEN4_POKEMON[newName];
    this.type = data.type;
    this.max_hp = data.hp + this.level * 2;
    this.current_hp = this.max_hp;
    this.attack = data.attack + this.level;
    this.defense = data.defense + this.level;
    this.speed = data.speed + this.level;
    this.moves = POKEMON_MOVES[newName] ? [...POKEMON_MOVES[newName]] : [];
  }
}

class Player {
  constructor(x, y, spriteCache) {
    this.x = x;
    this.y = y;
    this.pokemon_team = [];
    this.pokeballs = 5;
    this.spriteCache = spriteCache;
  }

  get sprite() {
    return this.spriteCache["pokemon bsdp character.png"] || null;
  }

  getSprite(biome = "GRASSLAND") {
    if (biome === "DESERT") {
      return this.spriteCache["pokemon bsdp character desert.png"] || this.spriteCache["pokemon bsdp character.png"] || null;
    }
    if (biome === "BEACH") {
      return this.spriteCache["pokemon bsdp character beach.png"] || this.spriteCache["pokemon bsdp character desert.png"] || this.spriteCache["pokemon bsdp character.png"] || null;
    }
    if (biome === "SNOW") {
      return this.spriteCache["pokemon bsdp character snow.png"] || this.spriteCache["pokemon bsdp character grass.png"] || this.spriteCache["pokemon bsdp character.png"] || null;
    }
    return this.spriteCache["pokemon bsdp character grass.png"] || this.spriteCache["pokemon bsdp character.png"] || null;
  }

  addPokemon(pokemon) {
    if (this.pokemon_team.length < 6) {
      this.pokemon_team.push(pokemon);
      return true;
    }
    return false;
  }

  getActivePokemon() {
    for (const pokemon of this.pokemon_team) {
      if (pokemon.isAlive()) return pokemon;
    }
    return null;
  }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.pixelRatio = Math.max(1, window.devicePixelRatio || 1);
    this.canvas.width = Math.floor(SCREEN_WIDTH * this.pixelRatio);
    this.canvas.height = Math.floor(SCREEN_HEIGHT * this.pixelRatio);
    this.ctx = canvas.getContext("2d");
    this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
    this.ctx.imageSmoothingEnabled = true;
    this.spriteDirs = [""];
    this.spriteCache = {};

    this.state = "START";
    this.player = new Player(5, 5, this.spriteCache);
    this.wild_pokemon = null;
    this.steps = 0;
    this.message = "";
    this.message_timer = 0;
    this.pokecenter_pos = { x: 0, y: 0 };
    this.last_overworld_pos = { x: 5, y: 5 };
    this.prev_state = "EXPLORE";
    this.inventory_selected = 0;
    this.inputLocked = false;
    this.captureHideWild = false;
    this.captureWildScale = 1;
    this.pokeballOverlay = null;
    this.hasBoat = false;
    this.beachTrainerDefeated = false;
    this.inTrainerBattle = false;
    this.battleSwitchMode = false;
    this.battleForcedSwitch = false;
    this.titleReady = false;
    this.titlePulse = 0;
    this.titleScreenImageName = "Pokemon quartz title screen.png";
    this.beachTrainerPos = { x: 13, y: 7 };
    this.beachPierY = 7;

    this.map_width = 20;
    this.map_height = 15;
    this.terrain = [];
    this.currentBiome = "GRASSLAND";
    this.biomeMap = {
      GRASSLAND: [],
      DESERT: [],
      BEACH: [],
      SNOW: []
    };
    this.playerBiomePos = {
      GRASSLAND: { x: 5, y: 5 },
      DESERT: { x: 5, y: 0 },
      BEACH: { x: 19, y: 7 },
      SNOW: { x: 19, y: 7 }
    };
    this.generateAllMaps();

    this.pokemonWithSprites = new Set(Object.keys(GEN4_POKEMON));
  }

  getDefaultBiomePositions() {
    return {
      GRASSLAND: { x: Math.floor(this.map_width / 2), y: Math.floor(this.map_height / 2) },
      DESERT: { x: 5, y: 0 },
      BEACH: { x: 19, y: 7 },
      SNOW: { x: 19, y: 7 }
    };
  }

  async init() {
    await this.preloadSprites();
    this.bindKeys();
    this.loop();
  }

  async preloadSprites() {
    const files = [
      "pokemon bsdp character.png",
      "pokemon bsdp character grass.png",
      "pokemon bsdp character desert.png",
      "pokemon bsdp character beach.png",
      "pokemon bsdp character snow.png",
      "pokemon trainer beach.jpg",
      "pokeball.png",
      "Pokecenter.png",
      this.titleScreenImageName,
      ...Object.keys(GEN4_POKEMON).map((name) => `${name.toLowerCase()}.png`)
    ];

    await Promise.all(files.map((file) => this.loadSprite(file)));
  }

  async loadSprite(fileName) {
    for (const dir of this.spriteDirs) {
      const path = dir ? `${dir}/${fileName}` : fileName;
      const img = new Image();

      const loaded = await new Promise((resolve) => {
        img.onload = () => {
          this.spriteCache[fileName] = img;
          resolve(true);
        };
        img.onerror = () => resolve(false);
        img.src = path;
      });

      if (loaded) return;
    }
  }

  get pokeballSprite() {
    return this.spriteCache["pokeball.png"] || null;
  }

  get pokecenterSprite() {
    return this.spriteCache["Pokecenter.png"] || null;
  }

  get trainerSprite() {
    return this.spriteCache["pokemon trainer beach.jpg"]
      || this.spriteCache["pokemon bsdp character desert.png"]
      || this.spriteCache["pokemon bsdp character grass.png"]
      || null;
  }

  get titleScreenSprite() {
    return this.spriteCache[this.titleScreenImageName]
      || this.spriteCache["Pokemon quartz title screen.png"]
      || null;
  }

  saveGame() {
    const saveData = {
      playerX: this.player.x,
      playerY: this.player.y,
      pokeballs: this.player.pokeballs,
      team: this.player.pokemon_team.map((p) => ({
        name: p.name,
        level: p.level,
        current_hp: p.current_hp,
        max_hp: p.max_hp,
        attack: p.attack,
        defense: p.defense,
        speed: p.speed,
        current_xp: p.current_xp,
        xp_to_level: p.xp_to_level,
        moves: p.moves
      })),
      lastOverworldPos: this.last_overworld_pos,
      currentBiome: this.currentBiome,
      playerBiomePos: this.playerBiomePos,
      hasBoat: this.hasBoat,
      beachTrainerDefeated: this.beachTrainerDefeated
    };
    localStorage.setItem("pokemonSave", JSON.stringify(saveData));
    this.showMessage("Game saved!", 120);
  }

  loadGame() {
    const saveData = localStorage.getItem("pokemonSave");
    if (!saveData) {
      this.showMessage("No save found!", 120);
      return false;
    }

    try {
      const data = JSON.parse(saveData);
      this.player.x = data.playerX;
      this.player.y = data.playerY;
      this.player.pokeballs = data.pokeballs;
      this.last_overworld_pos = data.lastOverworldPos;
      this.currentBiome = data.currentBiome || "GRASSLAND";
      this.hasBoat = Boolean(data.hasBoat);
      this.beachTrainerDefeated = Boolean(data.beachTrainerDefeated);
      const defaultPos = this.getDefaultBiomePositions();
      this.playerBiomePos = {
        ...defaultPos,
        ...(data.playerBiomePos || {})
      };

      this.player.pokemon_team = data.team.map((pData) => {
        const p = new Pokemon(pData.name, pData.level, this.spriteCache);
        p.current_hp = pData.current_hp;
        p.max_hp = pData.max_hp;
        p.attack = pData.attack;
        p.defense = pData.defense;
        p.speed = pData.speed;
        p.current_xp = pData.current_xp;
        p.xp_to_level = pData.xp_to_level;
        p.moves = pData.moves;
        return p;
      });

      this.terrain = this.biomeMap[this.currentBiome];
      this.state = "EXPLORE";
      this.showMessage("Game loaded!", 120);
      return true;
    } catch (e) {
      console.error("Error loading save:", e);
      this.showMessage("Error loading save!", 120);
      return false;
    }
  }

  startNewGame(starterName) {
    const defaultPos = this.getDefaultBiomePositions();
    this.player = new Player(defaultPos.GRASSLAND.x, defaultPos.GRASSLAND.y, this.spriteCache);
    this.playerBiomePos = defaultPos;
    this.currentBiome = "GRASSLAND";
    this.steps = 0;
    this.hasBoat = false;
    this.beachTrainerDefeated = false;
    this.inTrainerBattle = false;
    this.battleSwitchMode = false;
    this.battleForcedSwitch = false;
    this.wild_pokemon = null;
    this.captureHideWild = false;
    this.captureWildScale = 1;
    this.pokeballOverlay = null;
    this.last_overworld_pos = { x: defaultPos.GRASSLAND.x, y: defaultPos.GRASSLAND.y };

    this.generateAllMaps();
    this.player.addPokemon(new Pokemon(starterName, 5, this.spriteCache));
    this.state = "EXPLORE";
    this.showMessage(`You chose ${starterName}!`, 120);
  }

  sendToNearestPokecenter() {
    const cx = this.pokecenter_pos.x;
    const cy = this.pokecenter_pos.y;

    this.player.pokemon_team.forEach((p) => p.heal());
    this.currentBiome = "GRASSLAND";
    this.terrain = this.biomeMap.GRASSLAND;
    this.player.x = cx;
    this.player.y = cy;
    this.playerBiomePos.GRASSLAND = { x: cx, y: cy };
    this.last_overworld_pos = { x: cx, y: cy };
    this.wild_pokemon = null;
    this.inTrainerBattle = false;
    this.battleSwitchMode = false;
    this.battleForcedSwitch = false;
    this.captureHideWild = false;
    this.captureWildScale = 1;
    this.pokeballOverlay = null;
    this.state = "CENTER";
    this.showMessage("All Pokemon fainted! You were rushed to the nearest Pokecenter.", 180);
  }

  generateAllMaps() {
    this.biomeMap.GRASSLAND = this.generateMapForBiome("GRASSLAND");
    this.biomeMap.DESERT = this.generateMapForBiome("DESERT");
    this.biomeMap.BEACH = this.generateMapForBiome("BEACH");
    this.biomeMap.SNOW = this.generateMapForBiome("SNOW");
    this.terrain = this.biomeMap.GRASSLAND;
  }

  generateMapForBiome(biome) {
    const terrain = [];
    for (let y = 0; y < this.map_height; y += 1) {
      const row = [];
      for (let x = 0; x < this.map_width; x += 1) {
        if (biome === "GRASSLAND") {
          row.push(Math.random() < 0.3 ? "grass" : "path");
        } else if (biome === "DESERT") {
          row.push(Math.random() < 0.4 ? "grass" : "path");
        } else if (biome === "BEACH") {
          row.push(x < this.map_width / 2 ? "water" : "sand");
        } else if (biome === "SNOW") {
          row.push(Math.random() < 0.22 ? "ice" : "snow");
        }
      }
      terrain.push(row);
    }

    const cx = this.pokecenter_pos.x;
    const cy = this.pokecenter_pos.y;
    if (biome === "GRASSLAND") {
      terrain[cy][cx] = "center";
      if (cx + 1 < this.map_width) terrain[cy][cx + 1] = "center";
      if (cy + 1 < this.map_height) terrain[cy + 1][cx] = "center";
      if (cy + 1 < this.map_height && cx + 1 < this.map_width) terrain[cy + 1][cx + 1] = "center";

      for (let y = 0; y < this.map_height; y += 1) {
        for (let x = 0; x < this.map_width; x += 1) {
          if (x === this.player.x && y === this.player.y) continue;
          if (terrain[y][x] === "center") continue;
          if (Math.random() < 0.12) terrain[y][x] = "tree";
        }
      }
    } else if (biome === "DESERT") {
      for (let y = 0; y < this.map_height; y += 1) {
        for (let x = 0; x < this.map_width; x += 1) {
          if (x === this.player.x && y === this.player.y) continue;
          if (Math.random() < 0.08) terrain[y][x] = "rock";
        }
      }
    } else if (biome === "BEACH") {
      const splitX = this.map_width / 2;
      const pierY = this.beachPierY;
      for (let y = 0; y < this.map_height; y += 1) {
        for (let x = 0; x < this.map_width; x += 1) {
          if (x === this.player.x && y === this.player.y) continue;
          terrain[y][x] = x < splitX ? "water" : "sand";
          if (y === pierY && x >= 0 && x <= 13) terrain[y][x] = "pier";
          if (x >= 15 && y >= 2 && y <= 12 && Math.random() < 0.22) terrain[y][x] = "tree";
        }
      }
    } else if (biome === "SNOW") {
      for (let y = 0; y < this.map_height; y += 1) {
        for (let x = 0; x < this.map_width; x += 1) {
          if (x === this.player.x && y === this.player.y) continue;
          if (Math.random() < 0.08) terrain[y][x] = "tree";
          if (Math.random() < 0.12) terrain[y][x] = "ice";
        }
      }
    }

    return terrain;
  }

  getEncounterTilesForBiome(biome) {
    if (biome === "BEACH") return ["water"];
    if (biome === "SNOW") return ["snow", "ice"];
    return ["grass"];
  }

  switchBiome(nextBiome, entryX, entryY, message) {
    this.playerBiomePos[this.currentBiome] = { x: this.player.x, y: this.player.y };
    this.currentBiome = nextBiome;
    this.terrain = this.biomeMap[nextBiome];
    this.player.x = entryX;
    this.player.y = entryY;
    this.showMessage(message, 120);
  }

  generateMap() {
    this.generateAllMaps();
  }

  showMessage(text, duration = 120) {
    this.message = text;
    this.message_timer = duration;
  }

  drawText(text, x, y, color = COLORS.WHITE, size = 24, align = "left") {
    this.ctx.fillStyle = color;
    this.ctx.font = `${size}px Trebuchet MS`;
    this.ctx.textAlign = align;
    this.ctx.fillText(text, x, y);
  }

  drawRect(x, y, w, h, fill, stroke = null, lineWidth = 1) {
    this.ctx.fillStyle = fill;
    this.ctx.fillRect(x, y, w, h);
    if (stroke) {
      this.ctx.lineWidth = lineWidth;
      this.ctx.strokeStyle = stroke;
      this.ctx.strokeRect(x, y, w, h);
    }
  }

  startScreen() {
    const bg = this.titleScreenSprite;
    if (bg) {
      this.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, COLORS.BLACK);
      const scale = Math.min(SCREEN_WIDTH / bg.width, SCREEN_HEIGHT / bg.height);
      const drawW = bg.width * scale;
      const drawH = bg.height * scale;
      const drawX = (SCREEN_WIDTH - drawW) / 2;
      const drawY = (SCREEN_HEIGHT - drawH) / 2;
      this.ctx.drawImage(bg, drawX, drawY, drawW, drawH);
    } else {
      this.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, COLORS.BLUE);
      this.drawText("POKEMON QUARTZ", SCREEN_WIDTH / 2, 150, COLORS.YELLOW, 40, "center");
    }

    this.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, "rgba(0,0,0,0.15)");
    this.drawRect(0, SCREEN_HEIGHT - 120, SCREEN_WIDTH, 120, "rgba(0,0,0,0.45)");

    this.titlePulse += 0.06;
    const pulse = 0.45 + ((Math.sin(this.titlePulse) + 1) / 2) * 0.55;

    if (!this.titleReady) {
      this.drawText("Press ENTER to start", SCREEN_WIDTH / 2, SCREEN_HEIGHT - 62, `rgba(255,255,255,${pulse.toFixed(3)})`, 34, "center");
      this.drawText("L - Load save", SCREEN_WIDTH / 2, SCREEN_HEIGHT - 24, COLORS.WHITE, 20, "center");
      return;
    }

    this.drawRect(140, 190, 520, 250, "rgba(0,0,0,0.65)", "rgba(255,255,255,0.7)", 2);
    const lines = [
      "Choose your starter Pokemon",
      "1 - Turtwig (Grass)",
      "2 - Chimchar (Fire)",
      "3 - Piplup (Water)",
      "",
      "Esc - Back to title"
    ];

    let y = 240;
    for (const line of lines) {
      this.drawText(line, SCREEN_WIDTH / 2, y, COLORS.WHITE, 28, "center");
      y += 34;
    }
  }

  drawMap() {
    for (let y = 0; y < this.map_height; y += 1) {
      for (let x = 0; x < this.map_width; x += 1) {
        const px = x * TILE_SIZE;
        const py = y * TILE_SIZE;
        const tile = this.terrain[y][x];

        if (tile === "grass") {
          if (this.currentBiome === "GRASSLAND") {
            this.drawRect(px, py, TILE_SIZE, TILE_SIZE, COLORS.DARK_GREEN, COLORS.BLACK);
          } else if (this.currentBiome === "DESERT") {
            this.drawRect(px, py, TILE_SIZE, TILE_SIZE, "rgb(184,134,11)", "rgb(139,69,19)");
          } else if (this.currentBiome === "BEACH") {
            this.drawRect(px, py, TILE_SIZE, TILE_SIZE, "rgb(238,219,157)", "rgb(210,185,120)");
          } else if (this.currentBiome === "SNOW") {
            this.drawRect(px, py, TILE_SIZE, TILE_SIZE, "rgb(236,244,250)", "rgb(200,220,235)");
          }
        } else if (tile === "sand") {
          this.drawRect(px, py, TILE_SIZE, TILE_SIZE, "rgb(242,226,162)", "rgb(212,188,126)");
        } else if (tile === "water") {
          this.drawRect(px, py, TILE_SIZE, TILE_SIZE, "rgb(75,145,205)", "rgb(45,95,160)");
          this.drawRect(px + 4, py + 10, TILE_SIZE - 8, 3, "rgba(255,255,255,0.55)");
        } else if (tile === "pier") {
          this.drawRect(px, py, TILE_SIZE, TILE_SIZE, "rgb(154,112,68)", "rgb(100,72,40)");
          this.drawRect(px + 4, py + 5, TILE_SIZE - 8, 6, "rgb(168,126,82)", "rgb(120,84,50)");
          this.drawRect(px + 4, py + 18, TILE_SIZE - 8, 4, "rgb(130,92,54)");
        } else if (tile === "snow") {
          this.drawRect(px, py, TILE_SIZE, TILE_SIZE, "rgb(242,248,252)", "rgb(208,224,236)");
        } else if (tile === "ice") {
          this.drawRect(px, py, TILE_SIZE, TILE_SIZE, "rgb(189,229,248)", "rgb(120,178,210)");
          this.drawRect(px + 6, py + 6, 12, 12, "rgba(255,255,255,0.35)");
        } else if (tile === "tree") {
          if (this.currentBiome === "GRASSLAND") {
            this.drawRect(px, py, TILE_SIZE, TILE_SIZE, COLORS.DARK_GREEN, COLORS.BLACK);
            this.ctx.beginPath();
            this.ctx.fillStyle = COLORS.TREE_SHADOW;
            this.ctx.arc(px + 23, py + 18, 13, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.fillStyle = COLORS.TREE_GREEN;
            this.ctx.arc(px + 20, py + 16, 12, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.fillStyle = COLORS.TREE_HIGHLIGHT;
            this.ctx.arc(px + 16, py + 12, 5, 0, Math.PI * 2);
            this.ctx.fill();

            this.drawRect(px + 16, py + 26, 8, 12, COLORS.TREE_BROWN_DARK);
            this.drawRect(px + 17, py + 27, 6, 10, COLORS.TREE_BROWN);
          } else if (this.currentBiome === "DESERT") {
            this.drawRect(px, py, TILE_SIZE, TILE_SIZE, "rgb(210,155,50)", "rgb(180,130,40)");
            this.drawCactus(px, py);
          } else if (this.currentBiome === "BEACH") {
            this.drawRect(px, py, TILE_SIZE, TILE_SIZE, "rgb(242,226,162)", "rgb(212,188,126)");
            this.drawRect(px + 15, py + 12, 6, 18, "rgb(142,100,60)", "rgb(95,66,36)", 1);
            this.ctx.beginPath();
            this.ctx.fillStyle = "rgb(63,150,95)";
            this.ctx.arc(px + 17, py + 12, 7, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.arc(px + 23, py + 12, 7, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.arc(px + 20, py + 8, 7, 0, Math.PI * 2);
            this.ctx.fill();
          } else if (this.currentBiome === "SNOW") {
            this.drawRect(px, py, TILE_SIZE, TILE_SIZE, "rgb(236,244,250)", "rgb(208,224,236)");
            // Tree trunk
            this.drawRect(px + 16, py + 18, 8, 18, "rgb(110,84,52)", "rgb(75,58,36)", 1);
            // Large bottom triangle
            this.ctx.beginPath();
            this.ctx.fillStyle = "rgb(20,90,50)";
            this.ctx.moveTo(px + 20, py + 6);
            this.ctx.lineTo(px + 8, py + 18);
            this.ctx.lineTo(px + 32, py + 18);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.strokeStyle = "rgb(10,60,30)";
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            // Medium middle triangle
            this.ctx.beginPath();
            this.ctx.fillStyle = "rgb(25,105,55)";
            this.ctx.moveTo(px + 20, py + 14);
            this.ctx.lineTo(px + 10, py + 24);
            this.ctx.lineTo(px + 30, py + 24);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
            // Snow on top
            this.ctx.fillStyle = "rgb(245,250,255)";
            this.ctx.beginPath();
            this.ctx.arc(px + 20, py + 5, 4, 0, Math.PI * 2);
            this.ctx.fill();
            // Snow accents on branches
            this.ctx.beginPath();
            this.ctx.arc(px + 10, py + 18, 2.5, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.arc(px + 30, py + 18, 2.5, 0, Math.PI * 2);
            this.ctx.fill();
          }
        } else if (tile === "rock") {
          this.drawRect(px, py, TILE_SIZE, TILE_SIZE, "rgb(184,134,11)", "rgb(139,69,19)");
          this.drawRect(px + 4, py + 4, 14, 14, "rgb(160,120,100)", "rgb(100,70,50)", 2);
        } else if (tile === "center") {
          const cx = this.pokecenter_pos.x;
          const cy = this.pokecenter_pos.y;
          if (x === cx && y === cy && this.pokecenterSprite) {
            this.ctx.drawImage(this.pokecenterSprite, cx * TILE_SIZE, cy * TILE_SIZE, 80, 80);
          } else if (!this.pokecenterSprite) {
            this.drawRect(px, py, TILE_SIZE, TILE_SIZE, COLORS.RED, COLORS.BLACK);
          }
        } else {
          if (this.currentBiome === "GRASSLAND") {
            this.drawRect(px, py, TILE_SIZE, TILE_SIZE, COLORS.GREEN, COLORS.BLACK);
          } else if (this.currentBiome === "DESERT") {
            this.drawRect(px, py, TILE_SIZE, TILE_SIZE, "rgb(210,155,50)", "rgb(180,130,40)");
          }
        }
      }
    }

    if (this.currentBiome === "BEACH" && !this.beachTrainerDefeated) {
      const tx = this.beachTrainerPos.x * TILE_SIZE;
      const ty = this.beachTrainerPos.y * TILE_SIZE;
      const sprite = this.trainerSprite;
      if (sprite) {
        this.ctx.drawImage(sprite, tx, ty, TILE_SIZE, TILE_SIZE);
      } else {
        this.drawRect(tx + 10, ty + 8, 20, 24, "rgb(200,70,70)", COLORS.BLACK, 1);
      }
    }

    const playerX = this.player.x * TILE_SIZE;
    const playerY = this.player.y * TILE_SIZE;
    if (this.currentBiome === "BEACH" && this.hasBoat && this.terrain[this.player.y][this.player.x] === "water") {
      this.drawBoat(playerX, playerY);
    }

    const playerSprite = this.player.getSprite(this.currentBiome);
    if (playerSprite) {
      this.ctx.drawImage(playerSprite, playerX, playerY, TILE_SIZE, TILE_SIZE);
    } else {
      this.ctx.beginPath();
      this.ctx.fillStyle = COLORS.RED;
      this.ctx.arc(playerX + TILE_SIZE / 2, playerY + TILE_SIZE / 2, TILE_SIZE / 3, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  drawBoat(px, py) {
    // Wake behind the boat to make movement on water read clearly.
    this.ctx.fillStyle = "rgba(225,245,255,0.65)";
    this.ctx.beginPath();
    this.ctx.ellipse(px + 12, py + 29, 9, 3, 0, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.ellipse(px + 28, py + 31, 7, 2.5, 0, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.fillStyle = "rgb(126,82,44)";
    this.ctx.moveTo(px + 4, py + 27);
    this.ctx.lineTo(px + 11, py + 20);
    this.ctx.lineTo(px + 29, py + 20);
    this.ctx.lineTo(px + 36, py + 27);
    this.ctx.lineTo(px + 31, py + 33);
    this.ctx.lineTo(px + 9, py + 33);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.strokeStyle = "rgb(80,52,28)";
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    this.drawRect(px + 19, py + 12, 2, 10, "rgb(92,70,46)");
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgb(242,246,250)";
    this.ctx.moveTo(px + 21, py + 12);
    this.ctx.lineTo(px + 30, py + 17);
    this.ctx.lineTo(px + 21, py + 21);
    this.ctx.closePath();
    this.ctx.fill();

    this.drawRect(px + 15, py + 24, 10, 4, "rgb(174,132,82)", "rgb(110,76,42)", 1);
  }

  drawCactus(px, py) {
    this.ctx.fillStyle = "rgba(0,0,0,0.15)";
    this.ctx.beginPath();
    this.ctx.ellipse(px + 20, py + 34, 12, 4, 0, 0, Math.PI * 2);
    this.ctx.fill();

    this.drawRect(px + 14, py + 6, 12, 26, "rgb(88,176,88)", "rgb(38,90,38)", 1);
    this.drawRect(px + 12, py + 10, 4, 14, "rgb(88,176,88)", "rgb(38,90,38)", 1);
    this.drawRect(px + 24, py + 12, 4, 12, "rgb(88,176,88)", "rgb(38,90,38)", 1);
    this.drawRect(px + 8, py + 14, 4, 9, "rgb(88,176,88)", "rgb(38,90,38)", 1);
    this.drawRect(px + 28, py + 14, 4, 9, "rgb(88,176,88)", "rgb(38,90,38)", 1);

    this.ctx.fillStyle = "rgb(54,126,54)";
    this.ctx.fillRect(px + 16, py + 8, 3, 22);
    this.ctx.fillRect(px + 20, py + 8, 2, 22);
    this.ctx.fillRect(px + 15, py + 14, 14, 2);

    this.ctx.fillStyle = "rgb(236,120,150)";
    this.ctx.beginPath();
    this.ctx.arc(px + 20, py + 5, 3, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = "rgb(240,240,200)";
    for (let i = 0; i < 5; i += 1) {
      this.ctx.fillRect(px + 17 + (i % 2) * 2, py + 10 + i * 4, 1, 1);
      this.ctx.fillRect(px + 10 + (i % 2) * 2, py + 15 + i * 3, 1, 1);
      this.ctx.fillRect(px + 30 + (i % 2) * 2, py + 15 + i * 3, 1, 1);
    }
  }

  drawUi() {
    const active = this.player.getActivePokemon();
    this.drawRect(0, 0, SCREEN_WIDTH, 84, "rgba(0,0,0,0.55)");
    this.drawText(`Team: ${this.player.pokemon_team.length}/6 | Pokeballs: ${this.player.pokeballs}`, 10, 24);

    if (active) {
      this.drawText(`${active.name} Lv.${active.level} | HP: ${active.current_hp}/${active.max_hp}`, 10, 48);
      this.drawText(`XP: ${active.current_xp}/${active.xp_to_level}`, 10, 70, COLORS.WHITE, 18);

      const barWidth = 200;
      const barHeight = 10;
      const percent = active.current_xp / active.xp_to_level;
      this.drawRect(180, 62, barWidth, barHeight, "transparent", COLORS.WHITE);
      this.drawRect(180, 62, barWidth * percent, barHeight, COLORS.BLUE);
    }

    if (this.message_timer > 0) {
      this.drawText(this.message, 400, 590, COLORS.YELLOW, 22, "center");
      this.message_timer -= 1;
    }
  }

  drawHpBar(x, y, currentHp, maxHp) {
    const width = 150;
    const height = 20;
    const p = currentHp / maxHp;
    let color = COLORS.RED;
    if (p > 0.5) color = COLORS.GREEN;
    else if (p > 0.2) color = COLORS.YELLOW;

    this.drawRect(x, y, width, height, COLORS.BLACK, COLORS.BLACK, 2);
    this.drawRect(x, y, width * p, height, color);
    this.drawRect(x, y, width, height, "transparent", COLORS.BLACK, 2);
  }

  drawXpBar(x, y, currentXp, xpToLevel, width = 150) {
    const height = 8;
    const p = Math.max(0, Math.min(1, currentXp / xpToLevel));
    this.drawRect(x, y, width, height, COLORS.WHITE, COLORS.BLACK, 1);
    this.drawRect(x, y, width * p, height, COLORS.BLUE);
    this.drawRect(x, y, width, height, "transparent", COLORS.BLACK, 1);
  }

  drawBattle() {
    this.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, COLORS.WHITE);
    this.drawRect(0, 300, SCREEN_WIDTH, 300, COLORS.GREEN);

    if (this.wild_pokemon) {
      const sprite = this.wild_pokemon.getSprite();
      if (sprite && !this.captureHideWild) {
        const wildSize = Math.max(1, Math.floor(120 * this.captureWildScale));
        const wildX = 380 + (120 - wildSize) / 2;
        const wildY = 80 + (120 - wildSize) / 2;
        this.ctx.drawImage(sprite, wildX, wildY, wildSize, wildSize);
      }
      const enemyLabel = this.inTrainerBattle ? `Trainer's ${this.wild_pokemon.name}` : `Wild ${this.wild_pokemon.name}`;
      this.drawText(`${enemyLabel} Lv.${this.wild_pokemon.level}`, 450, 220, COLORS.BLACK, 30);
      this.drawText(`HP: ${this.wild_pokemon.current_hp}/${this.wild_pokemon.max_hp}`, 450, 250, COLORS.BLACK, 22);
      this.drawHpBar(450, 280, this.wild_pokemon.current_hp, this.wild_pokemon.max_hp);
    }

    const active = this.player.getActivePokemon();
    if (active) {
      const sprite = active.getSprite();
      if (sprite) {
        this.ctx.drawImage(sprite, 50, 200, 120, 120);
      }
      this.drawText(`Your ${active.name} Lv.${active.level}`, 50, 330, COLORS.BLACK, 30);
      this.drawText(`HP: ${active.current_hp}/${active.max_hp}`, 50, 360, COLORS.BLACK, 22);
      this.drawHpBar(50, 390, active.current_hp, active.max_hp);
      this.drawXpBar(50, 415, active.current_xp, active.xp_to_level, 150);
      this.drawText(`XP ${active.current_xp}/${active.xp_to_level}`, 205, 423, COLORS.BLACK, 16);

      if (this.battleSwitchMode) {
        this.drawRect(30, 438, 740, 150, "rgba(255,255,255,0.92)", COLORS.BLACK, 2);
        this.drawText("Switch Pokemon (1-6)", 50, 465, COLORS.BLACK, 24);
        this.player.pokemon_team.forEach((pokemon, i) => {
          const status = pokemon.isAlive() ? `HP ${pokemon.current_hp}/${pokemon.max_hp}` : "Fainted";
          const color = pokemon.isAlive() ? COLORS.BLACK : COLORS.GRAY;
          this.drawText(`${i + 1} - ${pokemon.name} (${status})`, 50 + (i % 2) * 360, 495 + Math.floor(i / 2) * 28, color, 19);
        });
        if (!this.battleForcedSwitch) {
          this.drawText("ESC/Q - Cancel", 580, 578, COLORS.BLACK, 18);
        }
      } else if (active.moves.length) {
        let y = 450;
        this.drawText("Choose a move:", 50, y, COLORS.BLACK, 22);
        y += 30;
        active.moves.slice(0, 4).forEach((move, i) => {
          const moveData = MOVES[move] || { power: 0 };
          this.drawText(`${i + 1} - ${move} (Pow: ${moveData.power})`, 50, y, COLORS.BLACK, 20);
          y += 25;
        });

        const moveCount = active.moves.slice(0, 4).length;
        y = 450 + moveCount * 25 + 30;
        if (this.inTrainerBattle) {
          this.drawText("Trainer battle: no catch / no run", 50, y, COLORS.BLACK, 20);
          this.drawText("S - Switch Pokemon", 50, y + 25, COLORS.BLACK, 20);
        } else {
          this.drawText(`5/C - Catch (Pokeballs: ${this.player.pokeballs})`, 50, y, COLORS.BLACK, 20);
          this.drawText("6/R - Run", 50, y + 25, COLORS.BLACK, 20);
          this.drawText("S - Switch Pokemon", 50, y + 50, COLORS.BLACK, 20);
        }
      }
    }

    if (this.message_timer > 0) {
      this.drawRect(210, 555, 380, 35, COLORS.WHITE, COLORS.BLACK, 2);
      this.drawText(this.message, 400, 578, COLORS.BLACK, 20, "center");
      this.message_timer -= 1;
    }

    if (this.pokeballOverlay) {
      this.drawBallAt(
        this.pokeballOverlay.x,
        this.pokeballOverlay.y,
        this.pokeballOverlay.scale ?? 1,
        this.pokeballOverlay.alpha ?? 1,
        this.pokeballOverlay.rotation ?? 0
      );
    }
  }

  drawPokecenter() {
    this.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, COLORS.DARK_GREEN);
    this.drawRect(0, 0, SCREEN_WIDTH, 160, COLORS.PINK);
    this.drawRect(0, 160, SCREEN_WIDTH, SCREEN_HEIGHT - 160, COLORS.LIGHT_GRAY, COLORS.BLACK, 2);

    this.drawRect(150, 220, 500, 80, COLORS.RED, COLORS.BLACK, 2);

    this.ctx.beginPath();
    this.ctx.fillStyle = COLORS.WHITE;
    this.ctx.arc(400, 170, 18, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.strokeStyle = COLORS.BLACK;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    this.drawRect(392, 155, 16, 30, COLORS.RED);
    this.drawRect(395, 165, 10, 6, COLORS.WHITE);

    this.drawText("Pokemon Center", SCREEN_WIDTH / 2, 30, COLORS.BLACK, 42, "center");

    const lines = [
      "Press H to heal your Pokemon",
      "Press TAB to manage team",
      "Press ESC or Q to leave"
    ];

    let y = 350;
    for (const line of lines) {
      this.drawText(line, SCREEN_WIDTH / 2, y, COLORS.BLACK, 24, "center");
      y += 30;
    }

    if (this.message_timer > 0) {
      this.drawRect(220, 555, 360, 35, COLORS.WHITE, COLORS.BLACK, 2);
      this.drawText(this.message, SCREEN_WIDTH / 2, 578, COLORS.BLACK, 20, "center");
      this.message_timer -= 1;
    }
  }

  drawInventory() {
    this.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, COLORS.DARK_GREEN);
    this.drawText("Team Inventory", SCREEN_WIDTH / 2, 40, COLORS.WHITE, 42, "center");

    let y = 100;
    this.player.pokemon_team.forEach((pokemon, i) => {
      const selected = i === this.inventory_selected;
      this.drawRect(50, y, SCREEN_WIDTH - 100, 40, selected ? COLORS.WHITE : COLORS.LIGHT_GRAY, COLORS.BLACK, 2);
      this.drawText(
        `${i + 1}. ${pokemon.name} Lv.${pokemon.level} (HP: ${pokemon.current_hp}/${pokemon.max_hp})`,
        60,
        y + 26,
        COLORS.BLACK,
        20
      );
      y += 50;
    });

    const lines = ["UP/DOWN - Select Pokemon", "W/S - Move Pokemon up/down", "ESC/Q - Exit"];
    y = SCREEN_HEIGHT - 120;
    for (const line of lines) {
      this.drawText(line, 50, y, COLORS.WHITE, 22);
      y += 30;
    }
  }

  movePokemon(direction) {
    const newIndex = this.inventory_selected + direction;
    if (newIndex >= 0 && newIndex < this.player.pokemon_team.length) {
      const team = this.player.pokemon_team;
      [team[this.inventory_selected], team[newIndex]] = [team[newIndex], team[this.inventory_selected]];
      this.inventory_selected = newIndex;
      this.showMessage(`Swapped ${team[this.inventory_selected].name}!`, 60);
    }
  }

  movePlayer(dx, dy) {
    const newX = this.player.x + dx;
    const newY = this.player.y + dy;
    if (newX < 0) {
      if (this.currentBiome === "GRASSLAND") {
        const beachEntryY = Math.max(0, Math.min(this.map_height - 1, this.beachPierY));
        this.switchBiome("BEACH", this.map_width - 1, beachEntryY, "You reached the beach!");
        this.steps += 1;
        return;
      }

      if (this.currentBiome === "BEACH") {
        this.switchBiome("SNOW", this.map_width - 1, this.player.y, "You entered the snowy coast!");
        this.steps += 1;
        return;
      }
    } else if (newX >= this.map_width) {
      if (this.currentBiome === "BEACH") {
        this.switchBiome("GRASSLAND", 0, this.player.y, "You left the beach!");
        this.steps += 1;
        return;
      }

      if (this.currentBiome === "SNOW") {
        this.switchBiome("BEACH", 0, this.player.y, "You left the snow!");
        this.steps += 1;
        return;
      }
    }

    // Check for out of bounds and biome switching
    if (newY >= this.map_height) {
      if (this.currentBiome === "GRASSLAND") {
        this.switchBiome("DESERT", this.playerBiomePos.DESERT.x, 0, "You entered the desert!");
        this.steps += 1;
        return;
      }
    } else if (newY < 0) {
      if (this.currentBiome === "DESERT") {
        this.switchBiome("GRASSLAND", this.playerBiomePos.GRASSLAND.x, this.map_height - 1, "You left the desert!");
        this.steps += 1;
        return;
      }
    }

    // Normal movement
    if (newX >= 0 && newX < this.map_width && newY >= 0 && newY < this.map_height) {
      const tile = this.terrain[newY][newX];
      if (tile === "tree" || tile === "rock" || (tile === "water" && !this.hasBoat)) {
        this.showMessage(tile === "tree" ? "Boom in de weg!" : tile === "water" ? "Water in de weg! Versla de trainer voor een boot." : "Rots in de weg!", 70);
        return;
      }

      this.player.x = newX;
      this.player.y = newY;
      this.steps += 1;

      if (
        this.currentBiome === "BEACH"
        && !this.beachTrainerDefeated
        && this.player.x === this.beachTrainerPos.x
        && this.player.y === this.beachTrainerPos.y
      ) {
        this.startBeachTrainerBattle();
        return;
      }

      if (this.terrain[this.player.y][this.player.x] === "center") {
        this.playerBiomePos[this.currentBiome] = { x: newX, y: newY };
        this.last_overworld_pos = { x: newX, y: newY };
        this.state = "CENTER";
        this.showMessage("Welcome!", 120);
        return;
      }

      const encounterTiles = this.getEncounterTilesForBiome(this.currentBiome);
      if (encounterTiles.includes(this.terrain[this.player.y][this.player.x])) {
        const encounterRate = this.currentBiome === "BEACH" ? 0.18 : this.currentBiome === "SNOW" ? 0.16 : 0.15;
        if (Math.random() < encounterRate) this.startWildEncounter();
      }
    }
  }

  getMinimumPokemonLevel(pokemonName) {
    let minLevel = 1;
    for (const [baseName, [evolvedName, evolvedLevel]] of Object.entries(EVOLUTIONS)) {
      if (evolvedName === pokemonName) {
        minLevel = evolvedLevel;
        for (const [baseBaseName, [baseEvolvedName]] of Object.entries(EVOLUTIONS)) {
          if (baseEvolvedName === baseName) {
            break;
          }
        }
        break;
      }
    }
    return minLevel;
  }

  startWildEncounter() {
    const active = this.player.getActivePokemon();
    if (!active) return;

    this.captureHideWild = false;
    this.captureWildScale = 1;

    const playerLevel = active.level;
    const biomePokemon = BIOME_POKEMON[this.currentBiome] || [];
    const available = [];

    for (const name of biomePokemon) {
      if (this.pokemonWithSprites.size && !this.pokemonWithSprites.has(name)) continue;
      const minEvo = this.getMinimumPokemonLevel(name);
      if (playerLevel >= minEvo) available.push(name);
    }

    let pool = available;
    if (!pool.length) {
      pool = biomePokemon;
    }
    if (!pool.length) {
      pool = Object.keys(GEN4_POKEMON);
    }

    const pokemonName = pool[randInt(0, pool.length - 1)];
    const minPokemonLevel = this.getMinimumPokemonLevel(pokemonName);
    const minLevel = Math.max(minPokemonLevel, playerLevel - 5);
    const maxLevel = Math.max(minLevel, Math.min(playerLevel + 5, 50));
    const level = randInt(minLevel, maxLevel);

    this.wild_pokemon = new Pokemon(pokemonName, level, this.spriteCache);
    this.inTrainerBattle = false;
    this.battleSwitchMode = false;
    this.battleForcedSwitch = false;
    this.state = "BATTLE";
    this.showMessage(`Wild ${pokemonName} appeared!`, 120);
  }

  startBeachTrainerBattle() {
    if (this.beachTrainerDefeated) return;
    const active = this.player.getActivePokemon();
    if (!active) return;

    const trainerLevel = Math.max(8, Math.min(45, active.level + 2));
    this.wild_pokemon = new Pokemon("Floatzel", trainerLevel, this.spriteCache);
    this.inTrainerBattle = true;
    this.battleSwitchMode = false;
    this.battleForcedSwitch = false;
    this.state = "BATTLE";
    this.showMessage("Trainer Luca challenges you!", 140);
  }

  getActivePokemonIndex() {
    for (let i = 0; i < this.player.pokemon_team.length; i += 1) {
      if (this.player.pokemon_team[i].isAlive()) return i;
    }
    return -1;
  }

  hasAvailableSwitchTarget() {
    const activeIndex = this.getActivePokemonIndex();
    return this.player.pokemon_team.some((pokemon, i) => i !== activeIndex && pokemon.isAlive());
  }

  openBattleSwitchMenu(forced = false) {
    if (!this.hasAvailableSwitchTarget()) {
      this.showMessage("No other Pokemon can battle!", 120);
      return false;
    }

    this.battleSwitchMode = true;
    this.battleForcedSwitch = forced;
    this.showMessage(forced ? "Choose your next Pokemon (1-6)!" : "Switch Pokemon: press 1-6", 140);
    return true;
  }

  closeBattleSwitchMenu() {
    this.battleSwitchMode = false;
    this.battleForcedSwitch = false;
  }

  calculateBattleDamage(attacker, defender, moveName) {
    const moveData = MOVES[moveName] || {};
    const power = moveData.power ?? 0;
    if (power <= 0) {
      return { damage: 0, typeMult: 1.0, stab: 1.0, moveType: moveData.type || "Normal" };
    }

    const moveType = moveData.type || "Normal";
    const typeMult = getTypeEffectiveness(moveType, defender.type);
    const stab = attacker.type.includes(moveType) ? 1.5 : 1.0;
    const baseDamage = (((2 * attacker.level) / 5 + 2) * power * attacker.attack) / Math.max(1, defender.defense) / 50 + 2;
    const modifiedDamage = baseDamage * stab * typeMult;
    const damage = Math.max(1, Math.round(modifiedDamage) + randInt(-2, 2));

    return { damage, typeMult, stab, moveType };
  }

  async enemyBattleTurn() {
    const active = this.player.getActivePokemon();
    if (!active || !this.wild_pokemon || !this.wild_pokemon.isAlive()) return;

    if (this.wild_pokemon.moves.length) {
      const wildMove = this.wild_pokemon.moves[randInt(0, this.wild_pokemon.moves.length - 1)];
      const wildMoveData = MOVES[wildMove] || {};

      if (Math.random() * 100 > (wildMoveData.accuracy ?? 100)) {
        this.showMessage(`${this.inTrainerBattle ? "Trainer's" : "Wild"} ${this.wild_pokemon.name}'s ${wildMove} missed!`, 120);
      } else {
        const result = this.calculateBattleDamage(this.wild_pokemon, active, wildMove);
        if (result.damage > 0) {
          active.takeDamage(result.damage);
          if (result.typeMult >= 3.5) this.showMessage(`It's devastatingly effective! ${result.damage} damage!`, 120);
          else if (result.typeMult >= 1.5) this.showMessage(`It's super effective! ${result.damage} damage!`, 120);
          else if (result.typeMult <= 0.3) this.showMessage(`It's barely effective... ${result.damage} damage!`, 120);
          else if (result.typeMult < 1.0) this.showMessage(`It's not very effective... ${result.damage} damage!`, 120);
          else this.showMessage(`${this.inTrainerBattle ? "Trainer's" : "Wild"} ${this.wild_pokemon.name} used ${wildMove}! ${result.damage} damage!`, 120);
        } else {
          this.showMessage(`${this.inTrainerBattle ? "Trainer's" : "Wild"} ${this.wild_pokemon.name} used ${wildMove}!`, 120);
        }
      }
    } else {
      const damage = Math.max(1, (this.wild_pokemon.attack - Math.floor(active.defense / 2)) + randInt(-5, 5));
      active.takeDamage(damage);
      this.showMessage(`${this.inTrainerBattle ? "Trainer's" : "Wild"} ${this.wild_pokemon.name} dealt ${damage} damage!`, 120);
    }

    await sleep(1000);

    if (!active.isAlive()) {
      this.showMessage(`${active.name} fainted!`, 120);
      await sleep(1200);

      if (!this.player.getActivePokemon()) {
        this.sendToNearestPokecenter();
        return;
      }

      this.openBattleSwitchMenu(true);
    }
  }

  async switchBattlePokemon(targetIndex) {
    const team = this.player.pokemon_team;
    const activeIndex = this.getActivePokemonIndex();
    if (activeIndex < 0) return;
    if (targetIndex < 0 || targetIndex >= team.length) {
      this.showMessage("Invalid Pokemon slot!", 120);
      return;
    }

    const target = team[targetIndex];
    if (!target || !target.isAlive()) {
      this.showMessage("That Pokemon cannot battle!", 120);
      return;
    }

    const forced = this.battleForcedSwitch;

    if (targetIndex !== activeIndex) {
      [team[activeIndex], team[targetIndex]] = [team[targetIndex], team[activeIndex]];
      this.showMessage(`Go, ${team[activeIndex].name}!`, 120);
      await sleep(900);
    } else if (forced) {
      this.showMessage(`${target.name} is ready to continue!`, 120);
      await sleep(700);
    } else {
      this.showMessage(`${target.name} is already battling!`, 100);
      return;
    }

    this.closeBattleSwitchMenu();

    // Manual switches consume your turn. Forced switches after faint do not.
    if (!forced) {
      await this.enemyBattleTurn();
    }
  }

  async battleAttack(moveIndex) {
    const active = this.player.getActivePokemon();
    if (!active || moveIndex >= active.moves.length) {
      this.showMessage("Invalid move!", 120);
      return;
    }

    const moveName = active.moves[moveIndex];
    const moveData = MOVES[moveName] || {};

    if (Math.random() * 100 > (moveData.accuracy ?? 100)) {
      this.showMessage(`${moveName} missed!`, 120);
      await sleep(1000);
    } else {
      const result = this.calculateBattleDamage(active, this.wild_pokemon, moveName);
      if (result.damage > 0) {
        this.wild_pokemon.takeDamage(result.damage);

        if (result.typeMult >= 3.5) this.showMessage(`It's devastatingly effective! ${result.damage} damage!`, 120);
        else if (result.typeMult >= 1.5) this.showMessage(`It's super effective! ${result.damage} damage!`, 120);
        else if (result.typeMult <= 0.3) this.showMessage(`It's barely effective... ${result.damage} damage!`, 120);
        else if (result.typeMult < 1.0) this.showMessage(`It's not very effective... ${result.damage} damage!`, 120);
        else this.showMessage(`${active.name} used ${moveName}! ${result.damage} damage!`, 120);
      } else {
        this.showMessage(`${active.name} used ${moveName}!`, 120);
      }

      await sleep(1000);
    }

    if (!this.wild_pokemon.isAlive()) {
      const xpGain = this.wild_pokemon.level * 10;
      this.showMessage(`${this.inTrainerBattle ? "Trainer's" : "Wild"} ${this.wild_pokemon.name} fainted! +${xpGain} XP`, 120);
      await sleep(1000);

      const levelResult = active.gainXp(xpGain);
      for (const up of levelResult.levelUps) {
        this.showMessage(`LEVEL UP! ${up.name} Lv.${up.fromLevel} -> Lv.${up.toLevel}`, 150);
        await sleep(1200);
        this.showMessage(`Stats: HP +${up.hpGain} ATK +${up.attackGain} DEF +${up.defenseGain} SPD +${up.speedGain}`, 150);
        await sleep(1400);
      }

      for (const evo of levelResult.evolutions) {
        this.showMessage(`${evo.from} evolved into ${evo.to}!`, 150);
        await sleep(1500);
      }

      if (this.inTrainerBattle) {
        this.beachTrainerDefeated = true;
        if (!this.hasBoat) {
          this.hasBoat = true;
          this.showMessage("You won! Trainer Luca gave you a boat.", 180);
          await sleep(1400);
        } else {
          this.showMessage("You defeated Trainer Luca!", 140);
          await sleep(1000);
        }
        this.inTrainerBattle = false;
      }

      this.state = "EXPLORE";
      return;
    }

    await this.enemyBattleTurn();
  }

  async animatePokeballThrow() {
    const startX = 150;
    const startY = 300;
    const endX = 450;
    const endY = 150;

    for (let i = 0; i < 20; i += 1) {
      const t = i / 20;
      const x = startX + (endX - startX) * t;
      const y = startY + (endY - startY) * t - 80 * (t * (1 - t));

      if (i >= 14) {
        const shrinkProgress = (i - 14) / 6;
        this.captureWildScale = Math.max(0, 1 - shrinkProgress);
        this.captureHideWild = this.captureWildScale <= 0.05;
      }

      this.pokeballOverlay = {
        x,
        y,
        scale: 1,
        alpha: 1,
        rotation: i * 18
      };
      this.draw();

      await sleep(1000 / 60);
    }

    this.captureHideWild = true;
    this.captureWildScale = 0;
    this.pokeballOverlay = { x: endX, y: endY, scale: 1, alpha: 1, rotation: 0 };
  }

  async animatePokeballShake(success) {
    const ballX = 450;
    const ballY = 150;

    for (let shake = 0; shake < 3; shake += 1) {
      for (let i = 0; i < 5; i += 1) {
        const offset = -3 + i * 1.2;
        this.pokeballOverlay = { x: ballX + offset, y: ballY, scale: 1, alpha: 1, rotation: 0 };
        this.draw();
        await sleep(1000 / 30);
      }

      for (let i = 0; i < 5; i += 1) {
        const offset = 3 - i * 1.2;
        this.pokeballOverlay = { x: ballX + offset, y: ballY, scale: 1, alpha: 1, rotation: 0 };
        this.draw();
        await sleep(1000 / 30);
      }

      await sleep(200);
    }

    if (success) {
      for (let i = 0; i < 12; i += 1) {
        this.pokeballOverlay = { x: ballX, y: ballY, scale: 1, alpha: 1, rotation: 0 };
        this.draw();
        const radius = 8 + i * 3;
        this.ctx.beginPath();
        this.ctx.strokeStyle = COLORS.YELLOW;
        this.ctx.lineWidth = 3;
        this.ctx.arc(ballX, ballY, radius, 0, Math.PI * 2);
        this.ctx.stroke();
        await sleep(70);
      }
    } else {
      for (let i = 0; i < 10; i += 1) {
        this.pokeballOverlay = {
          x: ballX,
          y: ballY,
          scale: 1 + i * 0.15,
          alpha: Math.max(0, 1 - i * 0.1),
          rotation: 0
        };
        this.draw();
        await sleep(50);
      }

      this.captureHideWild = false;
      for (let i = 0; i <= 10; i += 1) {
        this.captureWildScale = i / 10;
        const ballScale = Math.max(0.2, 1 - i * 0.08);
        const ballAlpha = Math.max(0, 1 - i * 0.12);
        this.pokeballOverlay = { x: ballX, y: ballY, scale: ballScale, alpha: ballAlpha, rotation: 0 };
        this.draw();
        await sleep(45);
      }

      this.captureWildScale = 1;
    }
  }

  drawBallAt(x, y, scale = 1, alpha = 1, rotation = 0) {
    const sprite = this.pokeballSprite;
    this.ctx.save();
    this.ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    if (sprite) {
      const size = 30 * scale;
      this.ctx.translate(x, y);
      this.ctx.rotate((rotation * Math.PI) / 180);
      this.ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
    } else {
      this.ctx.beginPath();
      this.ctx.fillStyle = COLORS.RED;
      this.ctx.arc(x, y, 15 * scale, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.restore();
  }

  async tryCatch() {
    if (this.inTrainerBattle) {
      this.showMessage("You cannot catch a trainer's Pokemon!", 120);
      return;
    }

    if (this.player.pokeballs <= 0) {
      this.showMessage("No Pokeballs left!", 120);
      return;
    }

    this.player.pokeballs -= 1;
    await this.animatePokeballThrow();

    const catchRate = 1 - (this.wild_pokemon.current_hp / this.wild_pokemon.max_hp) * 0.7;
    const success = Math.random() < catchRate;

    await this.animatePokeballShake(success);

    if (success) {
      this.showMessage(`Caught ${this.wild_pokemon.name}!`, 180);

      const active = this.player.getActivePokemon();
      if (active) {
        const xpGain = this.wild_pokemon.level * 5;
        const levelResult = active.gainXp(xpGain);
        this.showMessage(`Gained ${xpGain} XP for catching!`, 120);
        await sleep(1000);

        for (const up of levelResult.levelUps) {
          this.showMessage(`LEVEL UP! ${up.name} Lv.${up.fromLevel} -> Lv.${up.toLevel}`, 150);
          await sleep(1200);
          this.showMessage(`Stats: HP +${up.hpGain} ATK +${up.attackGain} DEF +${up.defenseGain} SPD +${up.speedGain}`, 150);
          await sleep(1400);
        }

        for (const evo of levelResult.evolutions) {
          this.showMessage(`${evo.from} evolved into ${evo.to}!`, 150);
          await sleep(1500);
        }
      }

      if (!this.player.addPokemon(this.wild_pokemon)) {
        this.showMessage(`Team is full! ${this.wild_pokemon.name} was sent to PC.`, 180);
      }

      await sleep(2000);
      this.state = "EXPLORE";
      this.captureHideWild = false;
      this.captureWildScale = 1;
      this.pokeballOverlay = null;
      this.closeBattleSwitchMenu();
    } else {
      this.captureHideWild = false;
      this.captureWildScale = 1;
      this.pokeballOverlay = null;
      this.showMessage(`${this.wild_pokemon.name} broke free!`, 120);
      await sleep(1000);
      await this.enemyBattleTurn();
    }
  }

  async runFromBattle() {
    if (this.inTrainerBattle) {
      this.showMessage("You cannot run from a trainer battle!", 120);
      await sleep(900);
      return;
    }

    if (Math.random() < 0.7) {
      this.showMessage("Got away safely!", 120);
      await sleep(1000);
      this.closeBattleSwitchMenu();
      this.state = "EXPLORE";
    } else {
      this.showMessage("Can't escape!", 120);
      await sleep(1000);
      await this.enemyBattleTurn();
    }
  }

  async handleBattleInput(key) {
    if (this.inputLocked) return;
    this.inputLocked = true;

    try {
      const lower = key.toLowerCase();

      if (this.battleSwitchMode) {
        if (key >= "1" && key <= "6") {
          await this.switchBattlePokemon(Number(key) - 1);
        } else if (!this.battleForcedSwitch && (key === "Escape" || lower === "q")) {
          this.closeBattleSwitchMenu();
          this.showMessage("Switch cancelled.", 80);
        }
        return;
      }

      if (key === "1") await this.battleAttack(0);
      else if (key === "2") await this.battleAttack(1);
      else if (key === "3") await this.battleAttack(2);
      else if (key === "4") await this.battleAttack(3);
      else if (lower === "c" || key === "5") await this.tryCatch();
      else if (lower === "r" || key === "6") await this.runFromBattle();
      else if (lower === "s") this.openBattleSwitchMenu(false);
    } finally {
      this.inputLocked = false;
    }
  }

  bindKeys() {
    window.addEventListener("keydown", async (event) => {
      if (event.key === "Tab") event.preventDefault();

      if (this.state === "START") {
        if (event.key === "Enter" || event.key === " ") {
          this.titleReady = true;
        } else if ((event.key === "Escape" || event.key.toLowerCase() === "q") && this.titleReady) {
          this.titleReady = false;
        } else if (this.titleReady && event.key === "1") {
          this.startNewGame("Turtwig");
        } else if (this.titleReady && event.key === "2") {
          this.startNewGame("Chimchar");
        } else if (this.titleReady && event.key === "3") {
          this.startNewGame("Piplup");
        } else if (event.key.toLowerCase() === "l") {
          this.loadGame();
        }
        return;
      }

      if (this.state === "EXPLORE") {
        if (event.key === "ArrowUp") this.movePlayer(0, -1);
        else if (event.key === "ArrowDown") this.movePlayer(0, 1);
        else if (event.key === "ArrowLeft") this.movePlayer(-1, 0);
        else if (event.key === "ArrowRight") this.movePlayer(1, 0);
        else if (event.key.toLowerCase() === "h") {
          this.player.pokemon_team.forEach((p) => p.heal());
          this.showMessage("All Pokemon healed!", 120);
        } else if (event.key.toLowerCase() === "s") {
          this.saveGame();
        } else if (event.key.toLowerCase() === "l") {
          this.loadGame();
        } else if (event.key === "Tab") {
          this.prev_state = this.state;
          this.state = "INVENTORY";
          this.inventory_selected = 0;
        }
        return;
      }

      if (this.state === "CENTER") {
        if (event.key.toLowerCase() === "h") {
          this.player.pokemon_team.forEach((p) => p.heal());
          this.showMessage("Your Pokemon are fully healed!", 120);
        } else if (event.key === "Tab") {
          this.prev_state = this.state;
          this.state = "INVENTORY";
          this.inventory_selected = 0;
        } else if (event.key === "Escape" || event.key.toLowerCase() === "q") {
          const cx = this.pokecenter_pos.x;
          const cy = this.pokecenter_pos.y;
          let exitX = cx;
          let exitY = cy + 2;
          if (exitY >= this.map_height) {
            exitX = cx + 2;
            exitY = cy;
          }
          this.player.x = exitX;
          this.player.y = exitY;
          this.state = "EXPLORE";
        }
        return;
      }

      if (this.state === "INVENTORY") {
        if (event.key === "ArrowUp") this.inventory_selected = Math.max(0, this.inventory_selected - 1);
        else if (event.key === "ArrowDown") {
          this.inventory_selected = Math.min(this.player.pokemon_team.length - 1, this.inventory_selected + 1);
        } else if (event.key.toLowerCase() === "w") this.movePokemon(-1);
        else if (event.key.toLowerCase() === "s") this.movePokemon(1);
        else if (event.ctrlKey && event.key.toLowerCase() === "s") {
          event.preventDefault();
          this.saveGame();
        } else if (event.key === "Escape" || event.key.toLowerCase() === "q") this.state = this.prev_state;
        return;
      }

      if (this.state === "BATTLE") {
        await this.handleBattleInput(event.key);
      }
    });
  }

  draw() {
    if (this.state === "START") {
      this.startScreen();
    } else if (this.state === "EXPLORE") {
      this.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, COLORS.BLACK);
      this.drawMap();
    } else if (this.state === "BATTLE") {
      this.drawBattle();
    } else if (this.state === "CENTER") {
      this.drawPokecenter();
    } else if (this.state === "INVENTORY") {
      this.drawInventory();
    }
  }

  loop() {
    const frame = () => {
      this.draw();
      setTimeout(() => requestAnimationFrame(frame), 1000 / FPS);
    };
    frame();
  }
}

const canvas = document.getElementById("game");
const game = new Game(canvas);
game.init();
