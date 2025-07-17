import { db } from "./db";
import { biblicalEvents, propheticTopics } from "@shared/schema";

async function seedDatabase() {
  console.log("🌱 Seeding database...");

  // Check if data already exists
  const existingEvents = await db.select().from(biblicalEvents).limit(1);
  if (existingEvents.length > 0) {
    console.log("✅ Database already has data, skipping seed.");
    return;
  }

  // Biblical Events
  const sampleBiblicalEvents = [
    {
      title: "Israel becomes a nation",
      description: "The restoration of Israel as a nation",
      scriptureReference: "Isaiah 66:8",
      status: "fulfilled",
      fulfillmentDate: "May 14, 1948",
      category: "Israel"
    },
    {
      title: "Jerusalem under Jewish control",
      description: "Jerusalem no longer trampled by Gentiles",
      scriptureReference: "Luke 21:24",
      status: "fulfilled",
      fulfillmentDate: "June 7, 1967",
      category: "Israel"
    },
    {
      title: "The Third Temple",
      description: "Rebuilding of the Jewish Temple",
      scriptureReference: "Ezekiel 40-48",
      status: "unfulfilled",
      fulfillmentDate: null,
      category: "End Times"
    },
    {
      title: "Global persecution of Christians",
      description: "Increase in Christian persecution worldwide",
      scriptureReference: "Matthew 24:9",
      status: "in_progress",
      fulfillmentDate: null,
      category: "End Times"
    },
    {
      title: "Knowledge shall increase",
      description: "Rapid advancement in technology and knowledge",
      scriptureReference: "Daniel 12:4",
      status: "fulfilled",
      fulfillmentDate: "20th-21st Century",
      category: "End Times"
    },
    {
      title: "Wars and rumors of wars",
      description: "Increase in global conflicts and tensions",
      scriptureReference: "Matthew 24:6",
      status: "in_progress",
      fulfillmentDate: null,
      category: "End Times"
    }
  ];

  // Prophetic Topics
  const sampleTopics = [
    {
      title: "Will Israel Find True Peace?",
      description: "Explore biblical prophecies about Israel's future peace and security, examining current events and their prophetic significance.",
      status: "active",
      prophecyCount: 12,
      iconColor: "from-royal to-navy"
    },
    {
      title: "The Third Temple",
      description: "Investigate prophecies surrounding the rebuilding of the Jewish Temple and current preparations being made in Jerusalem.",
      status: "pending",
      prophecyCount: 8,
      iconColor: "from-gold to-yellow-600"
    },
    {
      title: "Signs of the End Times",
      description: "Examine global events and their correlation with biblical prophecies about the last days and Christ's return.",
      status: "trending",
      prophecyCount: 15,
      iconColor: "from-warning to-red-600"
    },
    {
      title: "The Antichrist System",
      description: "Study prophecies about the end-times world leader and the global system that will emerge before Christ's return.",
      status: "active",
      prophecyCount: 10,
      iconColor: "from-purple-500 to-purple-700"
    },
    {
      title: "Revival and Awakening",
      description: "Explore prophecies about end-times revival, global evangelization, and the great harvest of souls.",
      status: "active",
      prophecyCount: 7,
      iconColor: "from-green-500 to-emerald-600"
    },
    {
      title: "Natural Disasters & Judgments",
      description: "Analyze prophetic warnings about natural disasters, climate events, and divine judgments in the last days.",
      status: "pending",
      prophecyCount: 9,
      iconColor: "from-indigo-500 to-blue-600"
    }
  ];

  try {
    console.log("📜 Inserting biblical events...");
    await db.insert(biblicalEvents).values(sampleBiblicalEvents);
    
    console.log("🔍 Inserting prophetic topics...");
    await db.insert(propheticTopics).values(sampleTopics);
    
    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seedDatabase().catch(console.error);