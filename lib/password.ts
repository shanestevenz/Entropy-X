// Word lists for memorable passwords
const adjectives = [
  "happy", "brave", "swift", "calm", "bright", "clever", "eager", "gentle",
  "noble", "proud", "quiet", "rapid", "sharp", "smart", "strong", "wild",
  "warm", "wise", "bold", "cool", "fair", "fine", "free", "glad", "good",
  "kind", "keen", "light", "lucky", "neat", "nice", "pure", "rich", "safe",
  "super", "true", "vast", "vivid", "young", "zesty"
];

const nouns = [
  "tiger", "eagle", "river", "mountain", "forest", "ocean", "thunder",
  "crystal", "dragon", "phoenix", "falcon", "wolf", "bear", "lion", "hawk",
  "storm", "flame", "frost", "shadow", "moon", "star", "sun", "cloud",
  "wind", "rain", "snow", "fire", "stone", "tree", "leaf", "wave", "spark",
  "arrow", "blade", "crown", "shield", "sword", "tower", "castle", "knight"
];

const verbs = [
  "runs", "flies", "jumps", "swims", "dances", "sings", "plays", "dreams",
  "rides", "climbs", "glides", "soars", "dives", "leaps", "flows", "grows",
  "shines", "sparks", "blooms", "roars", "howls", "strikes", "guards", "leads"
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
}

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
  let charset = "";
  let password = "";

  if (options.lowercase) charset += LOWERCASE;
  if (options.uppercase) charset += UPPERCASE;
  if (options.numbers) charset += NUMBERS;
  if (options.symbols) charset += SYMBOLS;

  // If no options selected, default to lowercase
  if (charset === "") {
    charset = LOWERCASE;
  }

  // Ensure at least one character from each selected category
  if (options.lowercase) password += LOWERCASE[getRandomInt(LOWERCASE.length)];
  if (options.uppercase) password += UPPERCASE[getRandomInt(UPPERCASE.length)];
  if (options.numbers) password += NUMBERS[getRandomInt(NUMBERS.length)];
  if (options.symbols) password += SYMBOLS[getRandomInt(SYMBOLS.length)];

  // Fill the rest
  while (password.length < options.length) {
    password += charset[getRandomInt(charset.length)];
  }

  // Shuffle to avoid predictable positions
  return shuffleString(password).slice(0, options.length);
}

export function generateMemorablePassword(options: MemorableOptions): string {
  const parts: string[] = [];
  const wordLists = [adjectives, nouns, verbs];
  
  for (let i = 0; i < options.wordCount; i++) {
    let word = getRandomElement(wordLists[i % wordLists.length]);
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
  label: "Weak" | "Fair" | "Good" | "Strong";
  color: string;
  feedback: string[];
}

export function evaluatePasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  if (!password) {
    return {
      score: 0,
      label: "Weak",
      color: "strength-weak",
      feedback: ["Enter a password to check strength"],
    };
  }

  // Length scoring
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (password.length < 8) feedback.push("Use at least 8 characters");

  // Character variety scoring
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  const varietyCount = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;
  if (varietyCount >= 3) score++;
  if (varietyCount === 4) score++;

  if (!hasUpper) feedback.push("Add uppercase letters");
  if (!hasLower) feedback.push("Add lowercase letters");
  if (!hasNumber) feedback.push("Add numbers");
  if (!hasSymbol) feedback.push("Add symbols");

  // Check for common patterns
  if (/^[a-zA-Z]+$/.test(password)) {
    feedback.push("Avoid using only letters");
    score = Math.max(0, score - 1);
  }
  if (/^[0-9]+$/.test(password)) {
    feedback.push("Avoid using only numbers");
    score = Math.max(0, score - 1);
  }
  if (/(.)\1{2,}/.test(password)) {
    feedback.push("Avoid repeated characters");
    score = Math.max(0, score - 1);
  }

  // Normalize score to 0-4
  score = Math.min(4, Math.max(0, score));

  const strengthMap: Record<number, Pick<PasswordStrength, "label" | "color">> = {
    0: { label: "Weak", color: "strength-weak" },
    1: { label: "Weak", color: "strength-weak" },
    2: { label: "Fair", color: "strength-fair" },
    3: { label: "Good", color: "strength-good" },
    4: { label: "Strong", color: "strength-strong" },
  };

  return {
    score,
    ...strengthMap[score],
    feedback: feedback.length > 0 ? feedback : ["Great password!"],
  };
}
