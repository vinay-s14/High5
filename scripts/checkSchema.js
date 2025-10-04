// checkSchema.js
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

async function checkSchema() {
  try {
    const response = await fetch(`${process.env.WEAVIATE_URL}/v1/schema/Publication`, {
      headers: {
        "Authorization": `Bearer ${process.env.WEAVIATE_API_KEY}`,
      },
    });
    
    if (response.ok) {
      const schema = await response.json();
      console.log("📋 Publication class properties:");
      schema.properties.forEach(prop => {
        console.log(`  - ${prop.name} (${prop.dataType.join(', ')})`);
      });
    } else {
      console.log("Failed to get schema:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

checkSchema();