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

  return "";
}