import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const schema = {
  class: "Publication",
  vectorizer: "text2vec-huggingface",
  moduleConfig: {
    "text2vec-huggingface": {
      model: "sentence-transformers/all-MiniLM-L6-v2",
      apiKey: process.env.HUGGINGFACE_APIKEY
    }
  },
  properties: [
    { name: "title", dataType: ["text"] },
    { name: "source_url", dataType: ["text"] },
    { name: "pmcid", dataType: ["text"] },
    { name: "abstract", dataType: ["text"] }
  ]
};

async function createSchema() {
  try {
    const url = `${process.env.WEAVIATE_URL}/v1/schema`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.WEAVIATE_API_KEY}`
      },
      body: JSON.stringify(schema)
    });

    if (res.ok) {
      console.log("✅ Schema created successfully!");
    } else {
      const text = await res.text();
      console.log("⚠️ Schema creation failed:", text);
    }
  } catch (err) {
    console.error("⚠️ Error:", err);
  }
}

createSchema();
