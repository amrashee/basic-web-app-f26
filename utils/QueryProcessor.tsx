export default function QueryProcessor(query: string): string {
  const lowerQuery = query.toLowerCase();

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

      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
          return false;
        }
      }

      return true;
    };

    return numbers.filter(isPrime).join(", ");
  }

  // Addition - supports multiple numbers
  if (lowerQuery.includes(" plus ")) {
    const numbers = query.match(/-?\d+/g);

    if (numbers) {
      return String(
        numbers.map(Number).reduce((sum, num) => sum + num, 0)
      );
    }
  }

  // Subtraction
  const subtractionMatch = query.match(
    /(-?\d+)\s+minus\s+(-?\d+)/i
  );

  if (subtractionMatch) {
    return String(
      Number(subtractionMatch[1]) - Number(subtractionMatch[2])
    );
  }

  // Exponentiation - supports very large numbers
  const powerMatch = query.match(
    /(\d+)\s+to the power of\s+(\d+)/i
  );

  if (powerMatch) {
    const base = BigInt(powerMatch[1]);
    const exponent = BigInt(powerMatch[2]);

    return (base ** exponent).toString();
  }

  return "";
}