export default function QueryProcessor(query: string): string {
  const lowerQuery = query.toLowerCase().trim();

  // Shakespeare
  if (lowerQuery.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  // Andrew ID
  if (lowerQuery.includes("andrew id")) {
    return "amrashee";
  }

  // Name
  if (lowerQuery.includes("name")) {
    return ":)";
  }

  // Age
  if (lowerQuery.includes("age")) {
    return "67";
  }

  // Largest number
  if (lowerQuery.includes("which of the following numbers is the largest")) {
    const numbers = query.match(/-?\d+/g);

    if (numbers) {
      return String(Math.max(...numbers.map(Number)));
    }
  }

  // Prime numbers
  if (lowerQuery.includes("which of the following numbers are primes")) {
    const numbers = query.match(/\d+/g)?.map(Number) ?? [];

    const isPrime = (num: number): boolean => {
      if (num < 2) return false;

      for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
      }

      return true;
    };

    return numbers.filter(isPrime).join(", ");
  }

  // Scrabble score
  if (lowerQuery.includes("scrabble score of")) {
    const match = lowerQuery.match(/scrabble score of ([a-z]+)/);

    if (match) {
      const scores: Record<string, number> = {
        a: 1, b: 3, c: 3, d: 2, e: 1,
        f: 4, g: 2, h: 4, i: 1, j: 8,
        k: 5, l: 1, m: 3, n: 1, o: 1,
        p: 3, q: 10, r: 1, s: 1, t: 1,
        u: 1, v: 4, w: 4, x: 8, y: 4, z: 10
      };

      const word = match[1];

      const total = [...word].reduce(
        (sum, letter) => sum + scores[letter],
        0
      );

      return String(total);
    }
  }

  // Anagram
  if (lowerQuery.includes("anagram of")) {
    const match = lowerQuery.match(
      /anagram of ([a-z]+):\s*(.+)\?/
    );

    if (match) {
      const original = match[1];

      const options = match[2]
        .split(",")
        .map(word => word.trim());

      const sortLetters = (word: string): string =>
        word.toLowerCase().split("").sort().join("");

      const answer = options.find(
        word => sortLetters(word) === sortLetters(original)
      );

      return answer ?? "";
    }
  }

  // Exponentiation
  const powerMatch = lowerQuery.match(
    /(\d+)\s+to the power of\s+(\d+)/
  );

  if (powerMatch) {
    const base = BigInt(powerMatch[1]);
    const exponent = BigInt(powerMatch[2]);

    return (base ** exponent).toString();
  }

  // Arithmetic: addition, subtraction, multiplication
  const arithmeticMatch = lowerQuery.match(
    /^what is (.+)\?$/
  );

  if (arithmeticMatch) {
    const expression = arithmeticMatch[1]
      .replace(/\bplus\b/g, "+")
      .replace(/\bminus\b/g, "-")
      .replace(/\bmultiplied by\b/g, "*")
      .replace(/\s+/g, "");

    // Only allow numbers and arithmetic operators
    if (/^\d+(?:[+\-*]\d+)+$/.test(expression)) {
      const tokens = expression.match(/\d+|[+\-*]/g);

      if (tokens) {
        // First calculate multiplication
        const values: (number | string)[] = [];

        for (let i = 0; i < tokens.length; i++) {
          if (tokens[i] === "*") {
            const previous = Number(values.pop());
            const next = Number(tokens[++i]);

            values.push(previous * next);
          } else {
            values.push(
              /^[+\-]$/.test(tokens[i])
                ? tokens[i]
                : Number(tokens[i])
            );
          }
        }

        // Then calculate addition and subtraction
        let result = Number(values[0]);

        for (let i = 1; i < values.length; i += 2) {
          const operator = values[i];
          const next = Number(values[i + 1]);

          if (operator === "+") result += next;
          if (operator === "-") result -= next;
        }

        return String(result);
      }
    }
  }

  return "";
}