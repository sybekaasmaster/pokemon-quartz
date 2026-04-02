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
  Croagunk: ["Toxicroak", 37]
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
  "Rock Slide": { power: 75, accuracy: 90, type: "Rock" }
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
  Toxicroak: ["Poison Powder", "Sludge Bomb", "Close Combat"]
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
  Toxicroak: { type: "Poison/Fighting", hp: 83, attack: 106, defense: 65, speed: 85 }
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
      if (effectiveness.strong_against.includes(t)) multiplier *= 1.5;
      else if (effectiveness.weak_to.includes(t)) multiplier *= 0.5;
    }
    return multiplier;
  }

  if (effectiveness.strong_against.includes(defenderType)) return 1.5;
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
    this.ctx = canvas.getContext("2d");
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

    this.map_width = 20;
    this.map_height = 15;
    this.terrain = [];
    this.generateMap();

    this.pokemonWithSprites = new Set(Object.keys(GEN4_POKEMON));
  }

  async init() {
    await this.preloadSprites();
    this.bindKeys();
    this.loop();
  }

  async preloadSprites() {
    const files = [
      "pokemon bsdp character.png",
      "pokeball.png",
      "Pokecenter.png",
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

  generateMap() {
    this.terrain = [];
    for (let y = 0; y < this.map_height; y += 1) {
      const row = [];
      for (let x = 0; x < this.map_width; x += 1) {
        row.push(Math.random() < 0.3 ? "grass" : "path");
      }
      this.terrain.push(row);
    }

    const cx = this.pokecenter_pos.x;
    const cy = this.pokecenter_pos.y;
    this.terrain[cy][cx] = "center";
    if (cx + 1 < this.map_width) this.terrain[cy][cx + 1] = "center";
    if (cy + 1 < this.map_height) this.terrain[cy + 1][cx] = "center";
    if (cy + 1 < this.map_height && cx + 1 < this.map_width) this.terrain[cy + 1][cx + 1] = "center";

    for (let y = 0; y < this.map_height; y += 1) {
      for (let x = 0; x < this.map_width; x += 1) {
        if (x === this.player.x && y === this.player.y) continue;
        if (this.terrain[y][x] === "center") continue;
        if (Math.random() < 0.12) this.terrain[y][x] = "tree";
      }
    }
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
    this.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, COLORS.BLUE);
    this.drawText("POKEMON GEN 4 ADVENTURE", SCREEN_WIDTH / 2, 150, COLORS.YELLOW, 40, "center");

    const lines = [
      "Choose your starter Pokemon:",
      "1 - Turtwig (Grass)",
      "2 - Chimchar (Fire)",
      "3 - Piplup (Water)",
      "",
      "Arrow keys to move",
      "Walk in tall grass to find wild Pokemon!"
    ];

    let y = 250;
    for (const line of lines) {
      this.drawText(line, SCREEN_WIDTH / 2, y, COLORS.WHITE, 24, "center");
      y += 30;
    }
  }

  drawMap() {
    for (let y = 0; y < this.map_height; y += 1) {
      for (let x = 0; x < this.map_width; x += 1) {
        const px = x * TILE_SIZE;
        const py = y * TILE_SIZE;
        const tile = this.terrain[y][x];

        if (tile === "grass") {
          this.drawRect(px, py, TILE_SIZE, TILE_SIZE, COLORS.DARK_GREEN, COLORS.BLACK);
        } else if (tile === "tree") {
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
        } else if (tile === "center") {
          const cx = this.pokecenter_pos.x;
          const cy = this.pokecenter_pos.y;
          if (x === cx && y === cy && this.pokecenterSprite) {
            this.ctx.drawImage(this.pokecenterSprite, cx * TILE_SIZE, cy * TILE_SIZE, 80, 80);
          } else if (!this.pokecenterSprite) {
            this.drawRect(px, py, TILE_SIZE, TILE_SIZE, COLORS.RED, COLORS.BLACK);
          }
        } else {
          this.drawRect(px, py, TILE_SIZE, TILE_SIZE, COLORS.GREEN, COLORS.BLACK);
        }
      }
    }

    const playerX = this.player.x * TILE_SIZE;
    const playerY = this.player.y * TILE_SIZE;
    if (this.player.sprite) {
      this.ctx.drawImage(this.player.sprite, playerX, playerY, TILE_SIZE, TILE_SIZE);
    } else {
      this.ctx.beginPath();
      this.ctx.fillStyle = COLORS.RED;
      this.ctx.arc(playerX + TILE_SIZE / 2, playerY + TILE_SIZE / 2, TILE_SIZE / 3, 0, Math.PI * 2);
      this.ctx.fill();
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
      this.drawText(`Wild ${this.wild_pokemon.name} Lv.${this.wild_pokemon.level}`, 450, 220, COLORS.BLACK, 30);
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

      if (active.moves.length) {
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
        this.drawText(`5/C - Catch (Pokeballs: ${this.player.pokeballs})`, 50, y, COLORS.BLACK, 20);
        this.drawText("6/R - Run", 50, y + 25, COLORS.BLACK, 20);
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

    if (newX >= 0 && newX < this.map_width && newY >= 0 && newY < this.map_height) {
      if (this.terrain[newY][newX] === "tree") {
        this.showMessage("Boom in de weg!", 60);
        return;
      }

      this.player.x = newX;
      this.player.y = newY;
      this.steps += 1;

      if (this.terrain[this.player.y][this.player.x] === "center") {
        this.last_overworld_pos = { x: newX, y: newY };
        this.state = "CENTER";
        this.showMessage("Welcome!", 120);
        return;
      }

      if (this.terrain[this.player.y][this.player.x] === "grass") {
        if (Math.random() < 0.15) this.startWildEncounter();
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
    const available = [];

    for (const name of Object.keys(GEN4_POKEMON)) {
      if (this.pokemonWithSprites.size && !this.pokemonWithSprites.has(name)) continue;
      const minEvo = this.getMinimumPokemonLevel(name);
      if (playerLevel >= minEvo) available.push(name);
    }

    let pool = available;
    if (!pool.length) {
      const evolvedTargets = new Set(Object.values(EVOLUTIONS).map((v) => v[0]));
      pool = Object.keys(GEN4_POKEMON).filter((n) => !evolvedTargets.has(n));
    }

    const pokemonName = pool[randInt(0, pool.length - 1)];
    const minPokemonLevel = this.getMinimumPokemonLevel(pokemonName);
    const minLevel = Math.max(minPokemonLevel, playerLevel - 5);
    const maxLevel = Math.max(minLevel, Math.min(playerLevel + 5, 50));
    const level = randInt(minLevel, maxLevel);

    this.wild_pokemon = new Pokemon(pokemonName, level, this.spriteCache);
    this.state = "BATTLE";
    this.showMessage(`Wild ${pokemonName} appeared!`, 120);
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
      const power = moveData.power ?? 0;
      if (power > 0) {
        const typeMult = getTypeEffectiveness(moveData.type || "Normal", this.wild_pokemon.type);
        const stab = active.type.includes(moveData.type || "Normal") ? 1.5 : 1.0;
        const baseDamage = ((2 * active.level / 5 + 2) * power * active.attack / this.wild_pokemon.defense / 50 + 2);
        let damage = Math.floor(baseDamage * stab * typeMult);
        damage += randInt(-10, 10);
        damage = Math.max(1, damage);

        this.wild_pokemon.takeDamage(damage);

        if (typeMult > 1.0) this.showMessage(`${moveName} was super effective! ${damage} damage!`, 120);
        else if (typeMult < 1.0) this.showMessage(`It's not very effective... ${damage} damage!`, 120);
        else this.showMessage(`${active.name} used ${moveName}! ${damage} damage!`, 120);
      } else {
        this.showMessage(`${active.name} used ${moveName}!`, 120);
      }

      await sleep(1000);
    }

    if (!this.wild_pokemon.isAlive()) {
      const xpGain = this.wild_pokemon.level * 10;
      this.showMessage(`Wild ${this.wild_pokemon.name} fainted! +${xpGain} XP`, 120);
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
      this.state = "EXPLORE";
      return;
    }

    if (this.wild_pokemon.moves.length) {
      const wildMove = this.wild_pokemon.moves[randInt(0, this.wild_pokemon.moves.length - 1)];
      const wildMoveData = MOVES[wildMove] || {};

      if (Math.random() * 100 > (wildMoveData.accuracy ?? 100)) {
        this.showMessage(`Wild ${this.wild_pokemon.name}'s ${wildMove} missed!`, 120);
      } else {
        const power = wildMoveData.power ?? 0;
        if (power > 0) {
          const typeMult = getTypeEffectiveness(wildMoveData.type || "Normal", active.type);
          const stab = this.wild_pokemon.type.includes(wildMoveData.type || "Normal") ? 1.5 : 1.0;
          const baseDamage = ((2 * this.wild_pokemon.level / 5 + 2) * power * this.wild_pokemon.attack / active.defense / 50 + 2);
          let damage = Math.floor(baseDamage * stab * typeMult);
          damage += randInt(-10, 10);
          damage = Math.max(1, damage);
          active.takeDamage(damage);
          this.showMessage(`Wild ${this.wild_pokemon.name} used ${wildMove}! ${damage} damage!`, 120);
        } else {
          this.showMessage(`Wild ${this.wild_pokemon.name} used ${wildMove}!`, 120);
        }
      }
    } else {
      const damage = Math.max(1, (this.wild_pokemon.attack - Math.floor(active.defense / 2)) + randInt(-5, 5));
      active.takeDamage(damage);
      this.showMessage(`Wild ${this.wild_pokemon.name} dealt ${damage} damage!`, 120);
    }

    await sleep(1000);

    if (!active.isAlive()) {
      this.showMessage(`${active.name} fainted!`, 120);
      await sleep(1500);
      if (!this.player.getActivePokemon()) {
        this.showMessage("All Pokemon fainted! Game Over!", 180);
        await sleep(3000);
        this.state = "START";
        this.player.pokemon_team = [];
      } else {
        this.state = "EXPLORE";
      }
    }
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
    } else {
      this.captureHideWild = false;
      this.captureWildScale = 1;
      this.pokeballOverlay = null;
      this.showMessage(`${this.wild_pokemon.name} broke free!`, 120);
      await sleep(1000);
      const active = this.player.getActivePokemon();
      if (active && this.wild_pokemon.isAlive()) {
        const damage = Math.max(1, (this.wild_pokemon.attack - Math.floor(active.defense / 2)) + randInt(-5, 5));
        active.takeDamage(damage);
        this.showMessage(`Wild ${this.wild_pokemon.name} dealt ${damage} damage!`, 120);
      }
    }
  }

  async runFromBattle() {
    if (Math.random() < 0.7) {
      this.showMessage("Got away safely!", 120);
      await sleep(1000);
      this.state = "EXPLORE";
    } else {
      this.showMessage("Can't escape!", 120);
      await sleep(1000);
      const active = this.player.getActivePokemon();
      if (active) {
        const damage = Math.max(1, (this.wild_pokemon.attack - Math.floor(active.defense / 2)) + randInt(-5, 5));
        active.takeDamage(damage);
        this.showMessage(`Wild ${this.wild_pokemon.name} dealt ${damage} damage!`, 120);
      }
    }
  }

  async handleBattleInput(key) {
    if (this.inputLocked) return;
    this.inputLocked = true;

    try {
      if (key === "1") await this.battleAttack(0);
      else if (key === "2") await this.battleAttack(1);
      else if (key === "3") await this.battleAttack(2);
      else if (key === "4") await this.battleAttack(3);
      else if (key.toLowerCase() === "c" || key === "5") await this.tryCatch();
      else if (key.toLowerCase() === "r" || key === "6") await this.runFromBattle();
    } finally {
      this.inputLocked = false;
    }
  }

  bindKeys() {
    window.addEventListener("keydown", async (event) => {
      if (event.key === "Tab") event.preventDefault();

      if (this.state === "START") {
        if (event.key === "1") {
          this.player.addPokemon(new Pokemon("Turtwig", 5, this.spriteCache));
          this.state = "EXPLORE";
          this.showMessage("You chose Turtwig!", 120);
        } else if (event.key === "2") {
          this.player.addPokemon(new Pokemon("Chimchar", 5, this.spriteCache));
          this.state = "EXPLORE";
          this.showMessage("You chose Chimchar!", 120);
        } else if (event.key === "3") {
          this.player.addPokemon(new Pokemon("Piplup", 5, this.spriteCache));
          this.state = "EXPLORE";
          this.showMessage("You chose Piplup!", 120);
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
        else if (event.key === "Escape" || event.key.toLowerCase() === "q") this.state = this.prev_state;
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
      this.drawUi();
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
