import zxcvbn from "zxcvbn";

// For memorable password generation
const adjectives = [
  "happy", "brave", "swift", "calm", "bright", "clever", "eager", "gentle",
  "noble", "proud", "quiet", "rapid", "sharp", "smart", "strong", "wild",
  "warm", "wise", "bold", "cool", "fair", "fine", "free", "glad", "good",
  "kind", "keen", "light", "lucky", "neat", "nice", "pure", "rich", "safe",
  "super", "true", "vast", "vivid", "young", "zesty",

  "ancient", "amber", "azure", "blazing", "brisk", "chill", "crisp", "daring",
  "deep", "divine", "dusty", "electric", "emerald", "endless", "fancy", "fierce",
  "fluent", "frozen", "golden", "grand", "grim", "hollow", "icy", "jolly",
  "lively", "lofty", "lunar", "magic", "mighty", "misty", "modern", "mystic",
  "nimble", "noisy", "odd", "open", "polished", "quick", "radiant", "raw",
  "restless", "rough", "royal", "rugged", "rustic", "sacred", "silent", "sleek",

  "smooth", "solar", "solid", "sparkling", "steady", "stormy", "sturdy",
  "subtle", "sunny", "swift", "tough", "tranquil", "urban", "vibrant", "vital",
  "wandering", "whispering", "wicked", "witty", "zen"
];

const nouns = [
  "tiger", "eagle", "river", "mountain", "forest", "ocean", "thunder",
  "crystal", "dragon", "phoenix", "falcon", "wolf", "bear", "lion", "hawk",
  "storm", "flame", "frost", "shadow", "moon", "star", "sun", "cloud",
  "wind", "rain", "snow", "fire", "stone", "tree", "leaf", "wave", "spark",
  "arrow", "blade", "crown", "shield", "sword", "tower", "castle", "knight",

  "valley", "desert", "island", "jungle", "meadow", "canyon", "cliff", "harbor",
  "lake", "waterfall", "volcano", "galaxy", "comet", "planet", "orbit", "nebula",
  "ember", "ash", "smoke", "lightning", "breeze", "horizon", "dawn", "dusk",
  "echo", "signal", "pulse", "core", "engine", "circuit", "code", "matrix",
  "vault", "key", "lock", "chain", "forge", "anvil", "hammer", "armor",
  "ranger", "hunter", "warrior", "guardian", "scout", "pilot", "captain",
  "voyager", "nomad", "wanderer", "sage", "oracle", "spirit", "ghost",
  "beacon", "lantern", "mirror", "portal", "path", "trail", "bridge",
  "summit", "peak", "ridge", "field", "grove", "branch", "root", "petal"
];

const verbs = [
  "runs", "flies", "jumps", "swims", "dances", "sings", "plays", "dreams",
  "rides", "climbs", "glides", "soars", "dives", "leaps", "flows", "grows",
  "shines", "sparks", "blooms", "roars", "howls", "strikes", "guards", "leads",

  "builds", "creates", "drives", "explores", "wanders", "searches", "finds",
  "discovers", "travels", "rises", "falls", "spins", "turns", "moves", "shifts",
  "breaks", "forms", "shapes", "holds", "keeps", "carries", "lifts", "pushes",
  "pulls", "opens", "closes", "locks", "unlocks", "protects", "defends",

  "attacks", "charges", "blazes", "burns", "freezes", "melts", "crashes",
  "echoes", "calls", "whispers", "shouts", "guides", "follows", "chases",
  "hunts", "gathers", "builds", "crafts", "forges", "designs", "tests",

  "measures", "calculates", "thinks", "learns", "adapts", "evolves"
];

export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;

}

export interface MemorableOptions {
  wordCount: number;
  includeNumbers: boolean;
  capitalize: boolean;
  separator: string;
  similarChacters: boolean; //TODO: Implement this option to include similar characters like 'l', '1', 'O', '0' , "A", "@" etc
}

//Avaialbe character sets for password generation
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function getRandomInt(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function getRandomElement<T>(array: T[]): T {
  return array[getRandomInt(array.length)];
}

function shuffleString(str: string): string {
  const arr = str.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = getRandomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

export function generateRandomPassword(options: PasswordOptions): string {
  let charset = ""; //total pool of characters to choose from
  let password = "";

  if (options.lowercase) charset += LOWERCASE;
  if (options.uppercase) charset += UPPERCASE;
  if (options.numbers) charset += NUMBERS;
  if (options.symbols) charset += SYMBOLS;

  //  default to lowercase
  if (charset === "") {
    charset = LOWERCASE;
  }

  // Ensure one character from each selected set
  if (options.lowercase) password += LOWERCASE[getRandomInt(LOWERCASE.length)];
  if (options.uppercase) password += UPPERCASE[getRandomInt(UPPERCASE.length)];
  if (options.numbers) password += NUMBERS[getRandomInt(NUMBERS.length)];
  if (options.symbols) password += SYMBOLS[getRandomInt(SYMBOLS.length)];


  while (password.length < options.length) {
    password += charset[getRandomInt(charset.length)];
  }

  // shuffle 
  return shuffleString(password).slice(0, options.length);
}

export function generateMemorablePassword(options: MemorableOptions): string {
  const parts: string[] = [];
  const wordLists = [adjectives, nouns, verbs];

  for (let i = 0; i < options.wordCount; i++) {
    let word = getRandomElement(wordLists[i % wordLists.length]); //get word - cycle through 0 1 2 for adjectives nouns verbs
    if (options.capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }

    parts.push(word);
  }

  if (options.includeNumbers) {
    parts.push(String(getRandomInt(1000)).padStart(3, "0"));
  }

  return parts.join(options.separator);
}

export interface PasswordStrength {
  score: number; // 0-4
  label: "Very Weak" | "Weak" | "Fair" | "Good" | "Strong";
  color: string;
  feedback: string[];
  crackTime: string;
  crackTimeSeconds: number;
}

export function evaluatePasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return {
      score: 0,
      label: "Very Weak",
      color: "strength-weak",
      feedback: ["Enter a password to check strength"],
      crackTime: "Instant",
      crackTimeSeconds: 0,
    };
  }


  const result = zxcvbn(password);

  // Map zxcvbn score (0-4) to our labels and colors
  const strengthMap: Record<number, { label: PasswordStrength["label"]; color: string }> = {
    0: { label: "Very Weak", color: "strength-weak" },
    1: { label: "Weak", color: "strength-weak" },
    2: { label: "Fair", color: "strength-fair" },
    3: { label: "Good", color: "strength-good" },
    4: { label: "Strong", color: "strength-strong" },
  };

  // zxcvbn feedback list
  const feedback: string[] = [];

  if (result.feedback.warning) {
    feedback.push(result.feedback.warning);
  }

  result.feedback.suggestions.forEach((suggestion) => {
    if (suggestion && !feedback.includes(suggestion)) {
      feedback.push(suggestion);
    }
  });

  // zxcvbn Docs: https://github.com/dropbox/zxcvbn?tab=readme-ov-file#usage
  // get crack time display string
  // other metric to consider result.guesses -> TODO:  add to hover tooltip over crackTime    

  const crackTime = result.crack_times_display.offline_slow_hashing_1e4_per_second as string;
  const crackTimeSeconds = result.crack_times_seconds.offline_slow_hashing_1e4_per_second as number;

  return {
    score: result.score,
    ...strengthMap[result.score],
    feedback: feedback.length > 0 ? feedback : ["Enter a longer password"],
    crackTime: formatCrackTime(crackTime),
    crackTimeSeconds,
  };
}

function formatCrackTime(time: string): string {
  // Capitalize first letter and clean up the display
  if (!time) return "Instant";
  return time.charAt(0).toUpperCase() + time.slice(1);
}
