/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("categories");

  const record0 = new Record(collection);
    record0.set("name", "Li\u00e7\u00f5es EBD");
    record0.set("slug", "licoes-ebd");
    record0.set("icon", "BookOpen");
    record0.set("color", "#1D4ED8");
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
    record1.set("icon", "Bible");
    record1.set("color", "#0F172A");
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
    record2.set("icon", "Zap");
    record2.set("color", "#D4A017");
  try {
    app.save(record2);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record3 = new Record(collection);
    record3.set("name", "Serm\u00f5es");
    record3.set("slug", "sermoes");
    record3.set("icon", "Mic");
    record3.set("color", "#1D4ED8");
  try {
    app.save(record3);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record4 = new Record(collection);
    record4.set("name", "Professores");
    record4.set("slug", "professores");
    record4.set("icon", "Users");
    record4.set("color", "#0F172A");
  try {
    app.save(record4);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record5 = new Record(collection);
    record5.set("name", "Infantil");
    record5.set("slug", "infantil");
    record5.set("icon", "Heart");
    record5.set("color", "#D4A017");
  try {
    app.save(record5);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record6 = new Record(collection);
    record6.set("name", "Mapas Mentais");
    record6.set("slug", "mapas-mentais");
    record6.set("icon", "Map");
    record6.set("color", "#1D4ED8");
  try {
    app.save(record6);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record7 = new Record(collection);
    record7.set("name", "Downloads");
    record7.set("slug", "downloads");
    record7.set("icon", "Download");
    record7.set("color", "#0F172A");
  try {
    app.save(record7);
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
