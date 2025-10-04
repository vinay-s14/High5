import { client } from "../utils/weaviateClient.js";

async function createSchema() {
  try {
    // Check if the class already exists
    const existing = await client.schema.getter().do();

    if (existing.classes?.find(c => c.class === "Publication")) {
      console.log("✅ Class already exists");
      return;
    }

    const schema = {
      class: "Publication",
      vectorizer: "text2vec-huggingface",
      moduleConfig: {
        "text2vec-huggingface": {
          model: "sentence-transformers/all-MiniLM-L6-v2",
          apiKey: process.env.HUGGINGFACE_APIKEY,
        },
      },
      properties: [
        { name: "title", dataType: ["text"] },
        { name: "source_url", dataType: ["text"] },
        { name: "pmcid", dataType: ["text"] },
        { name: "abstract", dataType: ["text"] },
      ],
    };

    await client.schema.classCreator().withClass(schema).do();
    console.log("✅ Schema created successfully");
  } catch (err) {
    console.error("⚠️ Schema creation failed:", err.message || err);
  }
}

createSchema();
