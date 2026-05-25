/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("downloads");

  const record0 = new Record(collection);
    record0.set("title", "Mapa Mental - Livro de Apocalipse");
    record0.set("slug", "mapa-mental-apocalipse");
    record0.set("description", "Mapa mental visual do livro de Apocalipse");
    record0.set("category", "Escatologia");
    record0.set("published_at", "2024-01-15");
    record0.set("status", "published");
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
    record1.set("title", "Slides - Introdu\u00e7\u00e3o ao Novo Testamento");
    record1.set("slug", "slides-novo-testamento");
    record1.set("description", "Slides educativos sobre o Novo Testamento");
    record1.set("category", "Estudos B\u00edblicos");
    record1.set("published_at", "2024-01-15");
    record1.set("status", "published");
  try {
    app.save(record1);
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
