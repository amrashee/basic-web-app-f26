export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
  return ":)";
}

  if (query.toLowerCase().includes("age")) {
    return "67";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "amrashee";
  }

  if (query.toLowerCase().includes("which of the following numbers is the largest")) {
  const numbers = query.match(/\d+/g);

  if (numbers) {
    return Math.max(...numbers.map(Number)).toString();
  }
}
if (query.toLowerCase().includes(" plus ")) {

  const match = query.match(/(-?\d+)\s+plus\s+(-?\d+)/i);

  if (match) {

    const num1 = Number(match[1]);

    const num2 = Number(match[2]);

    return (num1 + num2).toString();

  }

}
const subtractionMatch = query.match(/(-?\d+)\s+minus\s+(-?\d+)/i);

if (subtractionMatch) {
  return String(Number(subtractionMatch[1]) - Number(subtractionMatch[2]));
}
if (query.toLowerCase().includes(" plus ")) {
  const numbers = query.match(/\d+/g);

  if (numbers) {
    return String(numbers.map(Number).reduce((sum, num) => sum + num, 0));
  }
}
if (query.toLowerCase().includes("which of the following numbers are primes")) {
  const numbers = query.match(/\d+/g)?.map(Number) ?? [];

  const isPrime = (num: number): boolean => {
    if (num < 2) return false;

    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }

    return true;
  };

  return numbers.filter(isPrime).join(", ");
}
  return "";
}