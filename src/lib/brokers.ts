export type Broker = {
  id: string;
  name: string;
  photo: string;
  brokerCode: string;
  rating: number;
  reviews: number;
  locations: string[];
  speciality: string;
  phone: string;
  since: string;
  about: string;
  postedPropertyIds: number[];
};

export const brokers: Broker[] = [
  {
    id: "arjun-mehta",
    name: "Arjun Mehta",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    brokerCode: "TC-BR-1023",
    rating: 4.8,
    reviews: 214,
    locations: ["Electronic City", "Attibele"],
    speciality: "Apartments & Plots",
    phone: "+91 90000 10231",
    since: "2019",
    about:
      "Arjun specialises in Electronic City and Attibele, helping first-time buyers and investors find verified homes and plotted developments.",
    postedPropertyIds: [1, 6, 12],
  },
  {
    id: "neha-sharma",
    name: "Neha Sharma",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    brokerCode: "TC-BR-1188",
    rating: 4.9,
    reviews: 332,
    locations: ["Whitefield", "Indiranagar"],
    speciality: "Luxury & Rentals",
    phone: "+91 90000 11882",
    since: "2017",
    about:
      "Neha focuses on premium and rental inventory across Whitefield and Indiranagar, with a strong track record of satisfied tenants and buyers.",
    postedPropertyIds: [3, 8, 11],
  },
  {
    id: "rahul-verma",
    name: "Rahul Verma",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    brokerCode: "TC-BR-1205",
    rating: 4.7,
    reviews: 178,
    locations: ["Sarjapur Road", "Hosur Road"],
    speciality: "Villas & New Projects",
    phone: "+91 90000 12053",
    since: "2020",
    about:
      "Rahul works closely with developers on Sarjapur and Hosur Road, guiding buyers through new-launch and villa purchases.",
    postedPropertyIds: [2, 4, 7],
  },
  {
    id: "sara-thomas",
    name: "Sara Thomas",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    brokerCode: "TC-BR-1340",
    rating: 4.6,
    reviews: 121,
    locations: ["Anekal", "MG Road"],
    speciality: "Plots & Commercial",
    phone: "+91 90000 13404",
    since: "2021",
    about:
      "Sara handles plotted and commercial opportunities, with a focus on Anekal land parcels and MG Road office spaces.",
    postedPropertyIds: [5, 10],
  },
  {
    id: "vikram-singh",
    name: "Vikram Singh",
    photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80",
    brokerCode: "TC-BR-1411",
    rating: 4.8,
    reviews: 256,
    locations: ["Whitefield", "Electronic City"],
    speciality: "Resale & Investment",
    phone: "+91 90000 14115",
    since: "2018",
    about:
      "Vikram helps clients build long-term portfolios, combining resale homes with high-growth investment opportunities.",
    postedPropertyIds: [3, 1, 9],
  },
  {
    id: "kavya-nair",
    name: "Kavya Nair",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
    brokerCode: "TC-BR-1502",
    rating: 4.9,
    reviews: 198,
    locations: ["Sarjapur Road", "Indiranagar"],
    speciality: "Family Homes & Rentals",
    phone: "+91 90000 15026",
    since: "2019",
    about:
      "Kavya is known for patient, family-first guidance across Sarjapur and Indiranagar, from rentals to owned homes.",
    postedPropertyIds: [9, 11],
  },
];

export function getBroker(id: string): Broker | undefined {
  return brokers.find((b) => b.id === id);
}
