const {
  company: { bs, companyName, catchPhrase },
  commerce: { productName, productDescription },
  date: { soon },
  finance: { bitcoinAddress },
  name: { firstName, lastName, jobTitle },
  image: { avatar, food },
  internet: { url },
  lorem: { paragraph, paragraphs, slug },
} = require("faker");
const fs = require("fs");

const TOTAL_FUNDS_IN_MIA = 1000000;

function generateFundingGoal(maximum = 100000) {
  return Math.ceil(Math.random() * maximum);
}

function generateLabels(maximum = 5) {
  const labels = [];

  const founderTypes = [
    "latinx founders",
    "asian founders",
    "black founders",
    "veteran founders",
    "minority founders",
    "female founders",
  ];

  if (Math.random() > 0.5) {
    labels.push(founderTypes[Math.floor(Math.random() * founderTypes.length)]);
  }

  const industries = [
    "education",
    "healthcare",
    "crypto",
    "finance",
    "logistics",
    "travel & hospitality",
    "advertising",
    "work & productivity",
    "media & entertainment",
    "eco-friendly",
    "food & beverage",
    "communication",
    "real estate",
    "services",
    "consumer goods",
  ];

  labels.push(industries[Math.floor(Math.random() * industries.length)]);

  if (Math.random() > 0.5) {
    labels.push(industries[Math.floor(Math.random() * industries.length)]);
  }

  return labels;
}

function generatePerks(maximum = 3) {
  const perks = [];
  const count = Math.ceil(Math.random() * maximum);

  for (let i = 0; i < count; i++) {
    perks.push({
      imageUrl: food(),
      name: productName(),
      description: productDescription(),
      total: count,
      claimed: Math.ceil(Math.random() * count),
    });
  }

  return perks;
}

function generateParagraphs() {
  return paragraphs().split("\n \r");
}

function generateTeam(maximum = 5) {
  const team = [];
  const count = Math.ceil(Math.random() * maximum);

  for (let i = 0; i < count; i++) {
    team.push({
      imageUrl: avatar(),
      firstName: firstName(),
      lastName: lastName(),
      title: jobTitle(),
    });
  }

  return team;
}

function generateCollection(item, maximum) {
  const collection = [];
  const count = Math.ceil(Math.random() * maximum);
  for (let i = 0; i < count; i++) {
    collection.push(item());
  }
  return collection;
}

function generateData(count = 25) {
  const projects = [];

  for (let id = 1; id < count; id++) {
    projects.push({
      id,
      logo: "https://source.unsplash.com/200x200/?icon",
      images: [
        "https://source.unsplash.com/800x600/?miami",
        "https://source.unsplash.com/800x600/?miami",
        "https://source.unsplash.com/800x600/?miami",
        "https://source.unsplash.com/800x600/?startup",
        "https://source.unsplash.com/800x600/?startup",
        "https://source.unsplash.com/800x600/?startup",
      ],
      title: companyName(),
      tagline: `${catchPhrase()} and ${bs()}`,
      description: paragraph(),
      slug: slug(),
      fundingGoal: generateFundingGoal(),
      votes: generateCollection(bitcoinAddress, 1000),
      perks: generatePerks(),
      labels: generateLabels(),
      solutionDescription: generateParagraphs(),
      problemDescription: generateParagraphs(),
      businessModelDescription: generateParagraphs(),
      businessModelCharts: [
        "https://source.unsplash.com/800x600/?charts",
        "https://source.unsplash.com/800x600/?charts",
        "https://source.unsplash.com/800x600/?charts",
      ],
      marketDescription: generateParagraphs(),
      marketReports: generateCollection(url, 5),
      team: generateTeam(),
      websiteUrl: url(),
      twitterUrl: url(),
      whitepapers: generateCollection(url, 6),
    });
  }

  const funds = projects.reduce(
    (result, { votes }) => {
      return {
        ...result,
        totalVotes: result.totalVotes + votes.length,
      };
    },
    {
      deadline: soon(30),
      total: TOTAL_FUNDS_IN_MIA,
      totalVotes: 0,
    }
  );

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    project.fundingRaised = Math.floor(
      (project.votes.length / funds.totalVotes) * funds.total
    );
  }

  return {
    funds,
    projects,
  };
}

fs.writeFileSync("db.json", JSON.stringify(generateData(), null, "\t"));
