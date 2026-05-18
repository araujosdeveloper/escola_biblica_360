/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("categories");

  const record0 = new Record(collection);
    record0.set("name", "EBD");
    record0.set("slug", "ebd");
    record0.set("description", "Estudos para Escola B\u00edblica Dominical");
    record0.set("icon", "\ud83d\udcda");
    record0.set("color", "#4F46E5");
    record0.set("seo_title", "EBD - Escola B\u00edblica Dominical");
    record0.set("seo_description", "Conte\u00fado e estudos para Escola B\u00edblica Dominical");
  try {
    app.save(record0);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record1 = new Record(collection);
    record1.set("name", "Estudos B\u00edblicos");
    record1.set("slug", "estudos-biblicos");
    record1.set("description", "Estudos profundos da B\u00edblia");
    record1.set("icon", "\ud83d\udcd6");
    record1.set("color", "#7C3AED");
    record1.set("seo_title", "Estudos B\u00edblicos");
    record1.set("seo_description", "Estudos b\u00edblicos profundos e detalhados");
  try {
    app.save(record1);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record2 = new Record(collection);
    record2.set("name", "Escatologia");
    record2.set("slug", "escatologia");
    record2.set("description", "Estudos sobre os \u00faltimos tempos");
    record2.set("icon", "\u23f0");
    record2.set("color", "#DC2626");
    record2.set("seo_title", "Escatologia");
    record2.set("seo_description", "Estudos sobre escatologia e os \u00faltimos tempos");
  try {
    app.save(record2);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }
}, (app) => {
  // Rollback: record IDs not known, manual cleanup needed
})
