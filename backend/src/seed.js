require("dotenv").config();

const connectDB = require("./config/db");
const User = require("./models/User");
const Property = require("./models/Property");
const Project = require("./models/Project");

const img = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=85`;

function property(data) {
  return {
    furnishing: "Semi Furnished",
    possession: "Ready to Move",
    amenities: ["Parking", "Lift", "Security"],
    images: [img("1600566753086-00f18fb6b3ea")],
    verified: true,
    postedBy: "Owner",
    ...data,
  };
}

async function seed() {
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    Property.deleteMany({}),
    Project.deleteMany({}),
  ]);

  const admin = await User.create({
    name: "TRECOM Admin",
    email: "admin@trecom.ai",
    phone: "9844422668",
    password: "admin123",
    role: "admin",
  });

  const owner = await User.create({
    name: "Rahul Verma",
    email: "owner@trecom.ai",
    phone: "9876543210",
    password: "owner123",
    role: "owner",
  });

  await User.create({
    name: "Test Buyer",
    email: "buyer@trecom.ai",
    phone: "9123456780",
    password: "buyer123",
    role: "buyer",
  });

  const properties = await Property.insertMany([
    property({
      title: "Premium 2 BHK Apartment in Koramangala",
      description: "Beautiful premium apartment in the heart of Koramangala.",
      purpose: "BUY",
      propertyType: "Apartment",
      bhk: "2 BHK",
      price: 9200000,
      area: 1180,
      city: "Bengaluru",
      locality: "Koramangala",
      address: "5th Block, Koramangala",
      ownerId: owner._id,
    }),
    property({
      title: "2 BHK Flat for Sale in Koramangala",
      description: "Well ventilated flat close to Forum Mall.",
      purpose: "BUY",
      propertyType: "Apartment",
      bhk: "2 BHK",
      price: 8800000,
      area: 1100,
      city: "Bengaluru",
      locality: "Koramangala",
      address: "6th Block, Koramangala",
      ownerId: owner._id,
    }),
    property({
      title: "Modern 2 BHK Home, Koramangala",
      description: "Modern home with premium fittings and great sunlight.",
      purpose: "BUY",
      propertyType: "Apartment",
      bhk: "2 BHK",
      price: 9500000,
      area: 1220,
      city: "Bengaluru",
      locality: "Koramangala",
      address: "Koramangala 4th Block",
      ownerId: owner._id,
    }),
    property({
      title: "3 BHK Apartment in Koramangala",
      description: "Spacious 3 BHK near Sony World signal.",
      purpose: "BUY",
      propertyType: "Apartment",
      bhk: "3 BHK",
      price: 13500000,
      area: 1650,
      city: "Bengaluru",
      locality: "Koramangala",
      address: "Koramangala 1st Block",
      ownerId: owner._id,
    }),
    property({
      title: "1 BHK Apartment in Koramangala",
      description: "Compact 1 BHK ideal for young professionals.",
      purpose: "BUY",
      propertyType: "Apartment",
      bhk: "1 BHK",
      price: 6200000,
      area: 680,
      city: "Bengaluru",
      locality: "Koramangala",
      address: "Koramangala 7th Block",
      ownerId: owner._id,
    }),
    property({
      title: "2 BHK Apartment in HSR Layout",
      description: "Bright apartment in Sector 2 HSR Layout.",
      purpose: "BUY",
      propertyType: "Apartment",
      bhk: "2 BHK",
      price: 8400000,
      area: 1150,
      city: "Bengaluru",
      locality: "HSR Layout",
      address: "HSR Layout Sector 2",
      ownerId: owner._id,
    }),
    property({
      title: "Modern 2 BHK Apartment in Whitefield",
      description: "Spacious apartment near ITPL with excellent connectivity.",
      purpose: "BUY",
      propertyType: "Apartment",
      bhk: "2 BHK",
      price: 7800000,
      area: 1250,
      city: "Bengaluru",
      locality: "Whitefield",
      address: "ITPL Main Road, Whitefield",
      projectName: "Green Valley Residency",
      ownerId: owner._id,
    }),
    property({
      title: "Luxury 3 BHK Villa in Whitefield",
      description: "Premium villa with private garden and clubhouse access.",
      purpose: "BUY",
      propertyType: "Villa",
      bhk: "3 BHK",
      price: 18500000,
      area: 2400,
      city: "Bengaluru",
      locality: "Whitefield",
      address: "Whitefield Main Road",
      amenities: ["Parking", "Garden", "Security", "Clubhouse"],
      ownerId: owner._id,
      postedBy: "Agent",
    }),
    property({
      title: "2 BHK Apartment in Indiranagar",
      description: "Well-maintained apartment close to metro.",
      purpose: "RENT",
      propertyType: "Apartment",
      bhk: "2 BHK",
      price: 35000,
      area: 1100,
      city: "Bengaluru",
      locality: "Indiranagar",
      address: "100 Feet Road, Indiranagar",
      ownerId: owner._id,
    }),
    property({
      title: "1 RK Studio in Indiranagar",
      description: "Compact studio apartment for singles.",
      purpose: "RENT",
      propertyType: "Studio",
      bhk: "1 RK",
      price: 18000,
      area: 420,
      city: "Bengaluru",
      locality: "Indiranagar",
      address: "CMH Road, Indiranagar",
      ownerId: owner._id,
    }),
    property({
      title: "4 BHK Villa in Bengaluru",
      description: "Luxury independent villa with premium finishes.",
      purpose: "BUY",
      propertyType: "Villa",
      bhk: "4 BHK",
      price: 32000000,
      area: 3200,
      city: "Bengaluru",
      locality: "Hebbal",
      address: "Hebbal Kempapura",
      ownerId: owner._id,
      postedBy: "Builder",
    }),
    property({
      title: "Residential Plot in Bengaluru",
      description: "East facing plot in developing neighbourhood.",
      purpose: "PLOTS",
      propertyType: "Plot",
      bhk: "",
      price: 4500000,
      area: 2400,
      city: "Bengaluru",
      locality: "Yelahanka",
      address: "Yelahanka New Town",
      ownerId: owner._id,
    }),
    property({
      title: "2 BHK Apartment in Hyderabad",
      description: "Apartment in Gachibowli IT corridor.",
      purpose: "BUY",
      propertyType: "Apartment",
      bhk: "2 BHK",
      price: 7200000,
      area: 1080,
      city: "Hyderabad",
      locality: "Gachibowli",
      address: "Gachibowli Main Road",
      ownerId: owner._id,
    }),
    property({
      title: "Independent House in Pune",
      description: "Spacious house in Kharadi with garden.",
      purpose: "BUY",
      propertyType: "House",
      bhk: "3 BHK",
      price: 16500000,
      area: 2100,
      city: "Pune",
      locality: "Kharadi",
      address: "Kharadi Bypass Road",
      ownerId: owner._id,
    }),
    property({
      title: "Commercial Office Space in Mumbai",
      description: "Grade A office space in BKC with modern amenities.",
      purpose: "COMMERCIAL",
      propertyType: "Office",
      bhk: "",
      price: 25000000,
      area: 3200,
      city: "Mumbai",
      locality: "Bandra Kurla Complex",
      address: "BKC Road",
      furnishing: "Fully Furnished",
      ownerId: owner._id,
      postedBy: "Builder",
    }),
    property({
      title: "Luxury Apartment in Mumbai",
      description: "Beautiful luxury apartment with sea-facing views.",
      purpose: "BUY",
      propertyType: "Apartment",
      bhk: "3 BHK",
      price: 42000000,
      area: 1850,
      city: "Mumbai",
      locality: "Powai",
      address: "Hiranandani Gardens, Powai",
      ownerId: owner._id,
    }),
    property({
      title: "2 BHK Apartment in BTM Layout",
      description: "Affordable 2 BHK near metro and shopping.",
      purpose: "BUY",
      propertyType: "Apartment",
      bhk: "2 BHK",
      price: 6900000,
      area: 980,
      city: "Bengaluru",
      locality: "BTM Layout",
      address: "BTM 2nd Stage",
      ownerId: owner._id,
    }),
  ]);

  await Project.create({
    name: "Prestige Lakeside Habitat",
    developer: "Prestige Group",
    city: "Bengaluru",
    locality: "Whitefield",
    startingPrice: 9500000,
    configurations: ["2 BHK", "3 BHK", "4 BHK"],
    possession: "Under Construction",
    image: img("1600607688969-a5bfcd646154"),
    description: "Premium gated community with lake view homes.",
    amenities: ["Clubhouse", "Swimming Pool", "Gym", "Security"],
    verified: true,
    createdBy: admin._id,
  });

  console.log("Seed completed successfully");
  console.log("Admin: admin@trecom.ai / admin123");
  console.log("Owner: owner@trecom.ai / owner123");
  console.log("Buyer: buyer@trecom.ai / buyer123");
  console.log(`Properties seeded: ${properties.length}`);

  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
