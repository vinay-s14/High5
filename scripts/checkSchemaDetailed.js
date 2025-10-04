// checkSchemaDetailed.js
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

async function checkSchemaDetailed() {
  try {
    const response = await fetch(`${process.env.WEAVIATE_URL}/v1/schema/Publication`, {
      headers: {
        "Authorization": `Bearer ${process.env.WEAVIATE_API_KEY}`,
      },
    });
    
    if (response.ok) {
      const schema = await response.json();
      console.log("📋 Publication class detailed schema:");
      console.log(JSON.stringify(schema, null, 2));
    } else {
      console.log("Failed to get schema:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

checkSchemaDetailed();