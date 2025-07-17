// Prophetic Topics API endpoint for Cloudflare Pages Functions
export const onRequestGet: PagesFunction = async (context) => {
  try {
    const { DATABASE_URL } = context.env;
    
    if (!DATABASE_URL) {
      return new Response(JSON.stringify({ error: 'Database not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Return the prophetic topics data structure
    const propheticTopics = [
      {
        id: 1,
        title: "Will Israel Find True Peace?",
        description: "Explore biblical prophecies about Israel's future peace and security, examining current events and their prophetic significance.",
        status: "active",
        prophecyCount: 12,
        lastUpdated: "2025-07-05T15:13:58.386Z",
        iconColor: "from-royal to-navy",
        createdAt: "2025-07-05T15:13:58.386Z"
      },
      {
        id: 2,
        title: "The Third Temple",
        description: "Investigate prophecies surrounding the rebuilding of the Jewish Temple and current preparations being made in Jerusalem.",
        status: "pending",
        prophecyCount: 8,
        lastUpdated: "2025-07-05T15:13:58.386Z",
        iconColor: "from-gold to-yellow-600",
        createdAt: "2025-07-05T15:13:58.386Z"
      },
      {
        id: 3,
        title: "Signs of the End Times",
        description: "Examine global events and their correlation with biblical prophecies about the last days and Christ's return.",
        status: "trending",
        prophecyCount: 15,
        lastUpdated: "2025-07-05T15:13:58.386Z",
        iconColor: "from-warning to-red-600",
        createdAt: "2025-07-05T15:13:58.386Z"
      },
      {
        id: 4,
        title: "The Antichrist System",
        description: "Study prophecies about the end-times world leader and the global system that will emerge before Christ's return.",
        status: "active",
        prophecyCount: 10,
        lastUpdated: "2025-07-05T15:13:58.386Z",
        iconColor: "from-purple-500 to-purple-700",
        createdAt: "2025-07-05T15:13:58.386Z"
      },
      {
        id: 5,
        title: "Revival and Awakening",
        description: "Explore prophecies about end-times revival, global evangelization, and the great harvest of souls.",
        status: "active",
        prophecyCount: 7,
        lastUpdated: "2025-07-05T15:13:58.386Z",
        iconColor: "from-green-500 to-emerald-600",
        createdAt: "2025-07-05T15:13:58.386Z"
      },
      {
        id: 6,
        title: "Natural Disasters & Judgments",
        description: "Analyze prophetic warnings about natural disasters, climate events, and divine judgments in the last days.",
        status: "pending",
        prophecyCount: 9,
        lastUpdated: "2025-07-05T15:13:58.386Z",
        iconColor: "from-indigo-500 to-blue-600",
        createdAt: "2025-07-05T15:13:58.386Z"
      }
    ];

    return new Response(JSON.stringify(propheticTopics), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  } catch (error) {
    console.error('Prophetic Topics API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};