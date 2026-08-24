/**
 * Unit tests for natural-language search parser.
 * Run: node src/test-search.js
 */

const assert = require("assert");
const { parseSearchQuery, normalizeBHK } = require("./utils/searchParser");

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}`);
    console.error(`  ${error.message}`);
    process.exitCode = 1;
  }
}

test("normalizes 2bhk", () => {
  assert.strictEqual(normalizeBHK("2bhk in Koramangala"), "2 BHK");
});

test("parses 2bhk in Koramangala", () => {
  const parsed = parseSearchQuery("2bhk in Koramangala");
  assert.strictEqual(parsed.bhk, "2 BHK");
  assert.strictEqual(parsed.locality, "Koramangala");
});

test("parses 2 BHK in Koramangala", () => {
  const parsed = parseSearchQuery("2 BHK in Koramangala");
  assert.strictEqual(parsed.bhk, "2 BHK");
  assert.strictEqual(parsed.locality, "Koramangala");
});

test("parses 3bhk villa in Whitefield", () => {
  const parsed = parseSearchQuery("3bhk villa in Whitefield");
  assert.strictEqual(parsed.bhk, "3 BHK");
  assert.strictEqual(parsed.propertyType, "Villa");
  assert.strictEqual(parsed.locality, "Whitefield");
});

test("parses flat in koramangala as apartment", () => {
  const parsed = parseSearchQuery("2bhk flat in Koramangala");
  assert.strictEqual(parsed.bhk, "2 BHK");
  assert.strictEqual(parsed.propertyType, "Apartment");
  assert.strictEqual(parsed.locality, "Koramangala");
});

test("parses 1rk in Indiranagar", () => {
  const parsed = parseSearchQuery("1rk in Indiranagar");
  assert.strictEqual(parsed.bhk, "1 RK");
  assert.strictEqual(parsed.locality, "Indiranagar");
});

test("treats Bangalore and Bengaluru as same city", () => {
  const parsed = parseSearchQuery("2bhk apartment in Bangalore");
  assert.strictEqual(parsed.bhk, "2 BHK");
  assert.strictEqual(parsed.propertyType, "Apartment");
  assert.strictEqual(parsed.city, "Bengaluru");
});

test("extracts keywords from luxury home", () => {
  const parsed = parseSearchQuery("luxury home");
  assert.strictEqual(parsed.propertyType, "House");
  assert.ok(parsed.keywords.includes("luxury"));
});

test("parses commercial property in Mumbai", () => {
  const parsed = parseSearchQuery("commercial property in Mumbai");
  assert.strictEqual(parsed.city, "Mumbai");
  assert.strictEqual(parsed.commercial, true);
});

console.log("\nParser tests finished.");
