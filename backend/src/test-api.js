const BASE = process.env.API_URL || "http://localhost:5000/api";

let ownerToken = "";
let buyerToken = "";
let adminToken = "";
let propertyId = "";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function request(path, options = {}) {
  const response = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => ({}));
  return { status: response.status, data };
}

async function runTests() {
  console.log("Running TRECOM API tests...\n");

  const health = await request("/health");
  assert(health.status === 200 && health.data.success, "Health check failed");
  console.log("✓ Health check");

  const registerOwner = await request("/auth/register", {
    method: "POST",
    body: {
      name: "API Owner",
      email: `owner_${Date.now()}@trecom.ai`,
      phone: "9876501234",
      password: "owner123",
      role: "owner",
    },
  });
  assert(registerOwner.status === 201, "Owner registration failed");
  ownerToken = registerOwner.data.data.token;
  console.log("✓ Register owner");

  const registerBuyer = await request("/auth/register", {
    method: "POST",
    body: {
      name: "API Buyer",
      email: `buyer_${Date.now()}@trecom.ai`,
      phone: "9876505678",
      password: "buyer123",
      role: "buyer",
    },
  });
  assert(registerBuyer.status === 201, "Buyer registration failed");
  buyerToken = registerBuyer.data.data.token;
  console.log("✓ Register buyer");

  const me = await request("/auth/me", { token: ownerToken });
  assert(me.status === 200 && me.data.data.email, "Auth me failed");
  console.log("✓ GET /auth/me");

  const createProperty = await request("/properties", {
    method: "POST",
    token: ownerToken,
    body: {
      title: "Test 2 BHK in Whitefield",
      description: "API created property",
      purpose: "buy",
      propertyType: "Apartment",
      bhk: "2 BHK",
      price: 6500000,
      area: 1100,
      city: "Bengaluru",
      locality: "Whitefield",
      pincode: "560066",
      address: "Whitefield Main Road",
      furnishing: "Semi Furnished",
      possession: "Ready to Move",
      amenities: ["Parking", "Lift"],
      images: ["https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea"],
      projectName: "API Towers",
    },
  });
  assert(createProperty.status === 201, "Create property failed");
  propertyId = createProperty.data.data.id || createProperty.data.data._id;
  console.log("✓ POST /properties");

  const list = await request("/properties?page=1&limit=20&sort=price_low");
  assert(list.status === 200 && Array.isArray(list.data.data), "List properties failed");
  assert(list.data.pagination?.page === 1, "Pagination missing");
  console.log("✓ GET /properties with pagination and sort");

  const search = await request(
    "/properties/search?q=Whitefield"
  );
  assert(search.status === 200 && Array.isArray(search.data.properties), "Search failed");
  assert(search.data.search?.detected, "Search metadata missing");
  console.log("✓ GET /properties/search");

  const koramangalaSearch = await request(
    "/properties/search?q=2bhk%20in%20Koramangala"
  );
  assert(koramangalaSearch.status === 200, "Koramangala search failed");
  assert(
    koramangalaSearch.data.search.detected.bhk === "2 BHK",
    "BHK detection failed"
  );
  assert(
    koramangalaSearch.data.properties.length > 0,
    "Koramangala 2 BHK search returned no results"
  );
  console.log("✓ Natural language search: 2bhk in Koramangala");

  const suggestions = await request("/properties/suggestions?q=2bhk%20kor");
  assert(suggestions.status === 200 && Array.isArray(suggestions.data.data), "Suggestions failed");
  console.log("✓ GET /properties/suggestions");

  const priceSearch = await request(
    "/properties/search?minPrice=5000000&maxPrice=10000000"
  );
  assert(priceSearch.status === 200, "Price search failed");
  console.log("✓ Price range search");

  const details = await request(`/properties/${propertyId}`);
  assert(details.status === 200 && details.data.data.title, "Property details failed");
  assert(details.data.data.owner?.name, "Owner info missing in property details");
  console.log("✓ GET /properties/:id");

  const favoriteAdd = await request(`/favorites/${propertyId}`, {
    method: "POST",
    token: buyerToken,
  });
  assert(favoriteAdd.status === 201, "Add favorite failed");
  console.log("✓ POST /favorites/:propertyId");

  const duplicateFavorite = await request(`/favorites/${propertyId}`, {
    method: "POST",
    token: buyerToken,
  });
  assert(duplicateFavorite.status === 409, "Duplicate favorite should fail");
  console.log("✓ Duplicate favorite blocked");

  const favorites = await request("/favorites", { token: buyerToken });
  assert(favorites.status === 200 && favorites.data.data.length >= 1, "Get favorites failed");
  console.log("✓ GET /favorites");

  const enquiry = await request("/enquiries", {
    method: "POST",
    token: buyerToken,
    body: {
      propertyId,
      type: "contact",
      name: "API Buyer",
      phone: "9876505678",
      email: "buyer@trecom.ai",
      message: "Interested in this property",
    },
  });
  assert(enquiry.status === 201, "Create enquiry failed");
  console.log("✓ POST /enquiries");

  const visit = await request("/visits", {
    method: "POST",
    token: buyerToken,
    body: {
      propertyId,
      name: "API Buyer",
      phone: "9876505678",
      date: "2026-09-01",
      time: "11:00 AM",
      message: "Please confirm visit",
    },
  });
  assert(visit.status === 201, "Create visit failed");
  console.log("✓ POST /visits");

  const myProperties = await request("/properties/my", { token: ownerToken });
  assert(myProperties.status === 200 && myProperties.data.data.length >= 1, "My properties failed");
  console.log("✓ GET /properties/my");

  const myEnquiries = await request("/enquiries/my-properties", {
    token: ownerToken,
  });
  assert(myEnquiries.status === 200, "Owner enquiries failed");
  console.log("✓ GET /enquiries/my-properties");

  const invalidProperty = await request("/properties/not-a-valid-id");
  assert(invalidProperty.status === 400, "Invalid ID should return 400");
  console.log("✓ Invalid MongoDB ID handled");

  const unauthorized = await request("/properties", { method: "POST", body: {} });
  assert(unauthorized.status === 401, "Unauthorized create should fail");
  console.log("✓ Unauthorized request blocked");

  const validation = await request("/properties", {
    method: "POST",
    token: ownerToken,
    body: { title: "Missing required fields" },
  });
  assert(validation.status === 400, "Validation should fail");
  console.log("✓ Validation errors handled");

  const update = await request(`/properties/${propertyId}`, {
    method: "PUT",
    token: ownerToken,
    body: { price: 6700000 },
  });
  assert(update.status === 200, "Update property failed");
  console.log("✓ PUT /properties/:id");

  const forbiddenUpdate = await request(`/properties/${propertyId}`, {
    method: "PUT",
    token: buyerToken,
    body: { price: 1 },
  });
  assert(forbiddenUpdate.status === 403, "Forbidden update should fail");
  console.log("✓ Forbidden update blocked");

  const removeFavorite = await request(`/favorites/${propertyId}`, {
    method: "DELETE",
    token: buyerToken,
  });
  assert(removeFavorite.status === 200, "Remove favorite failed");
  console.log("✓ DELETE /favorites/:propertyId");

  const projects = await request("/projects");
  assert(projects.status === 200 && Array.isArray(projects.data.data), "Projects list failed");
  console.log("✓ GET /projects");

  const deleteProperty = await request(`/properties/${propertyId}`, {
    method: "DELETE",
    token: ownerToken,
  });
  assert(deleteProperty.status === 200, "Delete property failed");
  console.log("✓ DELETE /properties/:id");

  console.log("\nAll API tests passed.");
}

runTests().catch((error) => {
  console.error("\nAPI tests failed:", error.message);
  process.exit(1);
});
