import fetch from "node-fetch";
import { parse } from "csv-parse/sync";
import dotenv from "dotenv";
dotenv.config();

const CSV_URL = process.env.CSV_URL;
const WEAVIATE_URL = process.env.WEAVIATE_URL;
const API_KEY = process.env.WEAVIATE_API_KEY;

async function downloadCSV(url) {
  console.log("📥 Downloading CSV from:", url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download CSV: ${res.status} ${res.statusText}`);
  const text = await res.text();
  console.log("📄 CSV downloaded, length:", text.length);
  return text;
}

async function createPublicationClass() {
  console.log("🔄 Creating Publication class without vectorizer...");
  
  const classObj = {
    class: "Publication",
    description: "Scientific publications about space biology",
    vectorizer: "none", // Disable vectorization
    properties: [
      {
        name: "title",
        dataType: ["text"],
        description: "Publication title"
      },
      {
        name: "pmcid",
        dataType: ["text"],
        description: "PMC ID"
      },
      {
        name: "source_url",
        dataType: ["text"],
        description: "Source URL"
      },
      {
        name: "abstract",
        dataType: ["text"],
        description: "Publication abstract"
      }
    ]
  };

  try {
    // Try to delete the class if it exists
    await fetch(`${WEAVIATE_URL}/v1/schema/Publication`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
      },
    }).catch(() => {}); // Ignore errors if class doesn't exist

    // Create the class
    const res = await fetch(`${WEAVIATE_URL}/v1/schema`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(classObj),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Failed to create class: ${error}`);
    }

    console.log("✅ Publication class created successfully");
    return true;
  } catch (error) {
    console.error("❌ Failed to create class:", error.message);
    return false;
  }
}

async function ingestRow(row, index) {
  const link = row.Link || "";
  let pmcid = "";
  
  const pmcMatch = link.match(/PMC(\d+)/);
  if (pmcMatch) {
    pmcid = `PMC${pmcMatch[1]}`;
  }

  const cleanData = {
    title: (row.Title || "").trim(),
    pmcid: pmcid,
    source_url: link.trim(),
    abstract: "" // Your CSV doesn't have abstracts
  };

  if (!cleanData.title) {
    console.log(`⏭️ Skipping row ${index}: No title`);
    return false;
  }

  const data = {
    class: "Publication",
    properties: cleanData,
  };

  try {
    const res = await fetch(`${WEAVIATE_URL}/v1/objects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.log(`❌ Failed to insert row ${index}: "${cleanData.title.substring(0, 60)}..."`);
      console.log(`   Status: ${res.status} ${res.statusText}`);
      return false;
    } else {
      console.log(`✅ Inserted [${index + 1}]: ${cleanData.title.substring(0, 60)}...`);
      return true;
    }
  } catch (error) {
    console.log(`💥 Network error on row ${index}:`, error.message);
    return false;
  }
}

async function ingestCSV() {
  try {
    // Create the class first
    const classCreated = await createPublicationClass();
    if (!classCreated) {
      console.error("❌ Cannot proceed without proper class setup");
      return;
    }

    // Download CSV
    const csvData = await downloadCSV(CSV_URL);
    
    // Parse CSV
    let records;
    try {
      records = parse(csvData, {
        columns: true,
        skip_empty_lines: true,
        bom: true,
        trim: true,
      });
      console.log("📊 CSV parsed successfully");
    } catch (parseError) {
      console.error("❌ CSV parsing failed:", parseError);
      return;
    }

    console.log(`📄 Total rows parsed: ${records.length}`);
    
    // Ingest records
    let successCount = 0;
    let failCount = 0;
    
    // Test with just first 10 records first
    const testRecords = records.slice(0, 10);
    console.log(`🧪 Testing with first ${testRecords.length} records...`);
    
    for (let i = 0; i < testRecords.length; i++) {
      const success = await ingestRow(testRecords[i], i);
      if (success) successCount++;
      else failCount++;
      
      await new Promise(r => setTimeout(r, 100));
    }

    console.log(`🎉 Test completed! Success: ${successCount}, Failed: ${failCount}`);
    
    // If test was successful, ingest the rest
    if (successCount > 0) {
      console.log(`🚀 Proceeding with remaining ${records.length - testRecords.length} records...`);
      
      for (let i = testRecords.length; i < records.length; i++) {
        const success = await ingestRow(records[i], i);
        if (success) successCount++;
        else failCount++;
        
        await new Promise(r => setTimeout(r, 50));
        
        // Progress update
        if ((i + 1) % 20 === 0) {
          console.log(`📊 Progress: ${i + 1}/${records.length} (${successCount} ✅ ${failCount} ❌)`);
        }
      }
    }

    console.log(`🎉 Ingestion completed! Success: ${successCount}, Failed: ${failCount}, Total: ${records.length}`);
    
  } catch (err) {
    console.error("💥 Ingestion failed:", err);
  }
}

ingestCSV();