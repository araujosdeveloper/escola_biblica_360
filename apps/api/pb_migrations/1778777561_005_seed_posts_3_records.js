/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("posts");

  const record0 = new Record(collection);
    record0.set("title", "Introdu\u00e7\u00e3o \u00e0 Escola B\u00edblica Dominical");
    record0.set("slug", "introducao-ebd");
    record0.set("excerpt", "Conhe\u00e7a os fundamentos e objetivos da Escola B\u00edblica Dominical");
    record0.set("content", "A Escola B\u00edblica Dominical \u00e9 uma institui\u00e7\u00e3o educacional crist\u00e3 que visa o ensino sistem\u00e1tico da B\u00edblia. Ela oferece oportunidades para o aprendizado cont\u00ednuo das Escrituras Sagradas, promovendo o crescimento espiritual e a comunh\u00e3o entre os crentes.");
    record0.set("featured_image", "https://via.placeholder.com/800x600?text=EBD");
    const record0_category_idLookup = app.findFirstRecordByFilter("categories", "slug='ebd'");
    if (!record0_category_idLookup) { throw new Error("Lookup failed for category_id: no record in 'categories' matching \"slug='ebd'\""); }
    record0.set("category_id", record0_category_idLookup.id);
    record0.set("author", "Escola B\u00edblica 360");
    record0.set("published_at", "2024-01-15");
    record0.set("status", "published");
    record0.set("is_featured", true);
    record0.set("seo_title", "Introdu\u00e7\u00e3o \u00e0 Escola B\u00edblica Dominical");
    record0.set("seo_description", "Aprenda sobre os fundamentos e objetivos da Escola B\u00edblica Dominical");
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
    record1.set("title", "Os Evangelhos: Vida e Ensinamentos de Jesus");
    record1.set("slug", "evangelhos-vida-jesus");
    record1.set("excerpt", "Estudo profundo dos quatro evangelhos e os ensinamentos de Jesus Cristo");
    record1.set("content", "Os quatro evangelhos - Mateus, Marcos, Lucas e Jo\u00e3o - nos apresentam a vida, os ensinamentos e a obra redentora de Jesus Cristo. Cada evangelho oferece uma perspectiva \u00fanica sobre a vida do Messias, complementando-se mutuamente para nos dar uma compreens\u00e3o completa de quem \u00e9 Jesus.");
    record1.set("featured_image", "https://via.placeholder.com/800x600?text=Evangelhos");
    const record1_category_idLookup = app.findFirstRecordByFilter("categories", "slug='estudos-biblicos'");
    if (!record1_category_idLookup) { throw new Error("Lookup failed for category_id: no record in 'categories' matching \"slug='estudos-biblicos'\""); }
    record1.set("category_id", record1_category_idLookup.id);
    record1.set("author", "Escola B\u00edblica 360");
    record1.set("published_at", "2024-01-15");
    record1.set("status", "published");
    record1.set("is_featured", true);
    record1.set("seo_title", "Os Evangelhos: Vida e Ensinamentos de Jesus");
    record1.set("seo_description", "Estudo profundo dos quatro evangelhos e os ensinamentos de Jesus Cristo");
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
    record2.set("title", "Escatologia: Os \u00daltimos Tempos");
    record2.set("slug", "escatologia-ultimos-tempos");
    record2.set("excerpt", "Compreenda as profecias sobre os \u00faltimos tempos e o retorno de Cristo");
    record2.set("content", "A escatologia \u00e9 o estudo das \u00faltimas coisas, incluindo o retorno de Cristo, o julgamento final e a eternidade. A B\u00edblia cont\u00e9m muitas profecias sobre os \u00faltimos tempos, especialmente nos livros de Daniel, Mateus 24, 1 Tessalonicenses e Apocalipse. Compreender essas profecias nos ajuda a viver com esperan\u00e7a e vigil\u00e2ncia.");
    record2.set("featured_image", "https://via.placeholder.com/800x600?text=Escatologia");
    const record2_category_idLookup = app.findFirstRecordByFilter("categories", "slug='escatologia'");
    if (!record2_category_idLookup) { throw new Error("Lookup failed for category_id: no record in 'categories' matching \"slug='escatologia'\""); }
    record2.set("category_id", record2_category_idLookup.id);
    record2.set("author", "Escola B\u00edblica 360");
    record2.set("published_at", "2024-01-15");
    record2.set("status", "published");
    record2.set("is_featured", true);
    record2.set("seo_title", "Escatologia: Os \u00daltimos Tempos");
    record2.set("seo_description", "Compreenda as profecias sobre os \u00faltimos tempos e o retorno de Cristo");
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
