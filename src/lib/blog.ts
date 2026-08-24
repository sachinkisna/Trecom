export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  body: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "bangalore-real-estate-2026-outlook",
    title: "Bangalore Real Estate 2026: What Buyers Should Watch",
    category: "Market Trends",
    date: "Aug 12, 2026",
    readTime: "6 min read",
    excerpt:
      "From metro expansion to emerging corridors, here's what is shaping Bangalore's property market this year.",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1400&q=85",
    body: [
      "Bangalore's real estate market continues to attract both end-users and investors, driven by steady IT hiring, infrastructure upgrades and a maturing suburban network.",
      "Metro phase expansions are reshaping demand, pulling buyer interest toward previously under-served corridors. Locations near upcoming stations are seeing earlier price discovery.",
      "For buyers, the key is to balance aspirational locations with practical factors: commute, schools, water and long-term resale demand.",
      "Plotted developments remain popular with buyers who want to build custom homes, while ready-to-move apartments appeal to those prioritising certainty.",
      "Whatever you choose, verify approvals, compare locality prices and understand the total cost of ownership before committing.",
    ],
  },
  {
    slug: "rent-vs-buy-bangalore",
    title: "Rent vs Buy in Bangalore: A Practical Guide",
    category: "Guides",
    date: "Jul 28, 2026",
    readTime: "5 min read",
    excerpt:
      "Should you rent or buy? We break down the trade-offs with a Bangalore-specific lens.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=85",
    body: [
      "The rent-versus-buy decision depends on your horizon, finances and lifestyle. There is no single right answer.",
      "If you expect to move within a few years, renting often preserves flexibility and avoids transaction costs.",
      "If you plan to stay long-term, buying can build equity and lock in housing costs, though it requires upfront capital and EMIs.",
      "A useful check: compare annual rent to the interest component of a home loan on a similar property. The gap informs the trade-off.",
      "Use TRECOM to compare verified listings side by side and speak with our team before deciding.",
    ],
  },
  {
    slug: "understanding-trecom-trust-score",
    title: "Understanding the TRECOM Trust Score",
    category: "Product",
    date: "Jul 10, 2026",
    readTime: "4 min read",
    excerpt:
      "How we build confidence into every listing with the TRECOM Trust Score.",
    image:
      "https://images.unsplash.com/photo-1554435493-93422e8220c8?auto=format&fit=crop&w=1400&q=85",
    body: [
      "The TRECOM Trust Score is our way of summarising how much verified information is available about a listing.",
      "It considers owner verification, property details, location clarity and document review where applicable.",
      "A higher score doesn't guarantee an outcome, but it helps you compare listings more confidently.",
      "We continually refine the score as more information becomes available, so check back when shortlisting.",
    ],
  },
  {
    slug: "home-loan-checklist-first-time-buyers",
    title: "Home Loan Checklist for First-Time Buyers",
    category: "Finance",
    date: "Jun 22, 2026",
    readTime: "7 min read",
    excerpt:
      "A simple, step-by-step checklist to prepare for your first home loan.",
    image:
      "https://images.unsplash.com/photo-1565374790320-7a6f1b46514e?auto=format&fit=crop&w=1400&q=85",
    body: [
      "Start by assessing your budget: factor in down payment, EMIs, stamp duty and moving costs.",
      "Check your credit score early — a stronger score can unlock better interest rates.",
      "Keep documents ready: identity, address, income proof and bank statements.",
      "Compare lenders on interest rate, processing fees and prepayment flexibility, not just the headline rate.",
      "Our home-loan guidance team can help you navigate the process end to end.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
