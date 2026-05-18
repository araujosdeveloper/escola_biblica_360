/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("posts");

  const record0 = new Record(collection);
    record0.set("title", "Introdu\u00e7\u00e3o \u00e0s Li\u00e7\u00f5es EBD");
    record0.set("slug", "introducao-licoes-ebd");
    record0.set("content", "Bem-vindo ao nosso portal de Li\u00e7\u00f5es de Escola B\u00edblica Dominical. Aqui voc\u00ea encontrar\u00e1 conte\u00fado educativo e inspirador para toda a fam\u00edlia.");
    record0.set("excerpt", "Conhe\u00e7a nosso portal de Li\u00e7\u00f5es EBD com conte\u00fado educativo para toda a fam\u00edlia.");
    record0.set("featured_image", "https://images.unsplash.com/photo-1507842217343-583f20270319?w=800");
    const record0_category_idLookup = app.findFirstRecordByFilter("categories", "slug='licoes-ebd'");
    if (!record0_category_idLookup) { throw new Error("Lookup failed for category_id: no record in 'categories' matching \"slug='licoes-ebd'\""); }
    record0.set("category_id", record0_category_idLookup.id);
    record0.set("author", "Pastor Jo\u00e3o");
    record0.set("date", "2024-01-15");
    record0.set("views", 245);
    record0.set("is_featured", true);
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
    record1.set("title", "Os Evangelhos: Mateus, Marcos, Lucas e Jo\u00e3o");
    record1.set("slug", "os-evangelhos-mateus-marcos-lucas-joao");
    record1.set("content", "Estudo aprofundado sobre os quatro evangelhos e suas caracter\u00edsticas \u00fanicas. Cada evangelho apresenta perspectivas diferentes sobre a vida e minist\u00e9rio de Jesus.");
    record1.set("excerpt", "Conhe\u00e7a as caracter\u00edsticas \u00fanicas de cada evangelho e suas perspectivas sobre Jesus.");
    record1.set("featured_image", "https://images.unsplash.com/photo-1507842217343-583f20270319?w=800");
    const record1_category_idLookup = app.findFirstRecordByFilter("categories", "slug='estudos-biblicos'");
    if (!record1_category_idLookup) { throw new Error("Lookup failed for category_id: no record in 'categories' matching \"slug='estudos-biblicos'\""); }
    record1.set("category_id", record1_category_idLookup.id);
    record1.set("author", "Pr. Maria Silva");
    record1.set("date", "2024-01-20");
    record1.set("views", 512);
    record1.set("is_featured", true);
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

  const record2 = new Record(collection);
    record2.set("title", "Escatologia: O Fim dos Tempos");
    record2.set("slug", "escatologia-fim-dos-tempos");
    record2.set("content", "Uma an\u00e1lise detalhada das profecias b\u00edblicas sobre os \u00faltimos dias, incluindo o arrebatamento, a tribula\u00e7\u00e3o e o mil\u00eanio.");
    record2.set("excerpt", "Entenda as profecias b\u00edblicas sobre os \u00faltimos dias e o retorno de Cristo.");
    record2.set("featured_image", "https://images.unsplash.com/photo-1507842217343-583f20270319?w=800");
    const record2_category_idLookup = app.findFirstRecordByFilter("categories", "slug='escatologia'");
    if (!record2_category_idLookup) { throw new Error("Lookup failed for category_id: no record in 'categories' matching \"slug='escatologia'\""); }
    record2.set("category_id", record2_category_idLookup.id);
    record2.set("author", "Dr. Carlos Mendes");
    record2.set("date", "2024-01-25");
    record2.set("views", 389);
    record2.set("is_featured", true);
    record2.set("status", "published");
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
    record3.set("title", "Serm\u00e3o: A Gra\u00e7a de Deus");
    record3.set("slug", "sermao-graca-de-deus");
    record3.set("content", "Um poderoso serm\u00e3o sobre como a gra\u00e7a de Deus transforma nossas vidas e nos capacita para vencer os desafios do dia a dia.");
    record3.set("excerpt", "Descubra como a gra\u00e7a de Deus pode transformar sua vida completamente.");
    record3.set("featured_image", "https://images.unsplash.com/photo-1507842217343-583f20270319?w=800");
    const record3_category_idLookup = app.findFirstRecordByFilter("categories", "slug='sermoes'");
    if (!record3_category_idLookup) { throw new Error("Lookup failed for category_id: no record in 'categories' matching \"slug='sermoes'\""); }
    record3.set("category_id", record3_category_idLookup.id);
    record3.set("author", "Pastor Pedro");
    record3.set("date", "2024-02-01");
    record3.set("views", 678);
    record3.set("is_featured", true);
    record3.set("status", "published");
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
    record4.set("title", "Conhecendo Nossos Professores");
    record4.set("slug", "conhecendo-nossos-professores");
    record4.set("content", "Conhe\u00e7a a equipe de professores dedicados que trabalham para levar conhecimento b\u00edblico de qualidade a nossa comunidade.");
    record4.set("excerpt", "Apresentamos os professores que dedicam seu tempo ao ensino b\u00edblico.");
    record4.set("featured_image", "https://images.unsplash.com/photo-1507842217343-583f20270319?w=800");
    const record4_category_idLookup = app.findFirstRecordByFilter("categories", "slug='professores'");
    if (!record4_category_idLookup) { throw new Error("Lookup failed for category_id: no record in 'categories' matching \"slug='professores'\""); }
    record4.set("category_id", record4_category_idLookup.id);
    record4.set("author", "Coordena\u00e7\u00e3o");
    record4.set("date", "2024-02-05");
    record4.set("views", 156);
    record4.set("is_featured", false);
    record4.set("status", "published");
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
    record5.set("title", "Hist\u00f3rias B\u00edblicas para Crian\u00e7as");
    record5.set("slug", "historias-biblicas-criancas");
    record5.set("content", "Cole\u00e7\u00e3o de hist\u00f3rias b\u00edblicas adaptadas para crian\u00e7as, com linguagem simples e ilustra\u00e7\u00f5es coloridas que facilitam o aprendizado.");
    record5.set("excerpt", "Hist\u00f3rias b\u00edblicas especialmente adaptadas para o p\u00fablico infantil.");
    record5.set("featured_image", "https://images.unsplash.com/photo-1507842217343-583f20270319?w=800");
    const record5_category_idLookup = app.findFirstRecordByFilter("categories", "slug='infantil'");
    if (!record5_category_idLookup) { throw new Error("Lookup failed for category_id: no record in 'categories' matching \"slug='infantil'\""); }
    record5.set("category_id", record5_category_idLookup.id);
    record5.set("author", "Tia Carla");
    record5.set("date", "2024-02-10");
    record5.set("views", 423);
    record5.set("is_featured", true);
    record5.set("status", "published");
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
    record6.set("title", "Mapa Mental: Os Dez Mandamentos");
    record6.set("slug", "mapa-mental-dez-mandamentos");
    record6.set("content", "Visualize os Dez Mandamentos atrav\u00e9s de um mapa mental interativo que facilita a memoriza\u00e7\u00e3o e compreens\u00e3o de cada mandamento.");
    record6.set("excerpt", "Aprenda os Dez Mandamentos com um mapa mental visual e interativo.");
    record6.set("featured_image", "https://images.unsplash.com/photo-1507842217343-583f20270319?w=800");
    const record6_category_idLookup = app.findFirstRecordByFilter("categories", "slug='mapas-mentais'");
    if (!record6_category_idLookup) { throw new Error("Lookup failed for category_id: no record in 'categories' matching \"slug='mapas-mentais'\""); }
    record6.set("category_id", record6_category_idLookup.id);
    record6.set("author", "Prof. Lucas");
    record6.set("date", "2024-02-15");
    record6.set("views", 234);
    record6.set("is_featured", false);
    record6.set("status", "published");
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
    record7.set("title", "Recursos para Download");
    record7.set("slug", "recursos-para-download");
    record7.set("content", "Acesse nossa biblioteca de recursos gratuitos incluindo apostilas, planilhas de estudo, e materiais complementares para aprofundar seus conhecimentos b\u00edblicos.");
    record7.set("excerpt", "Baixe gratuitamente apostilas e materiais de estudo b\u00edblico.");
    record7.set("featured_image", "https://images.unsplash.com/photo-1507842217343-583f20270319?w=800");
    const record7_category_idLookup = app.findFirstRecordByFilter("categories", "slug='downloads'");
    if (!record7_category_idLookup) { throw new Error("Lookup failed for category_id: no record in 'categories' matching \"slug='downloads'\""); }
    record7.set("category_id", record7_category_idLookup.id);
    record7.set("author", "Biblioteca");
    record7.set("date", "2024-02-20");
    record7.set("views", 567);
    record7.set("is_featured", true);
    record7.set("status", "published");
  try {
    app.save(record7);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record8 = new Record(collection);
    record8.set("title", "A Vida de Mois\u00e9s");
    record8.set("slug", "vida-de-moises");
    record8.set("content", "Estudo completo sobre a vida de Mois\u00e9s, desde seu nascimento at\u00e9 sua morte, incluindo seu papel como libertador do povo de Israel.");
    record8.set("excerpt", "Conhe\u00e7a a hist\u00f3ria inspiradora de Mois\u00e9s e seu papel na hist\u00f3ria b\u00edblica.");
    record8.set("featured_image", "https://images.unsplash.com/photo-1507842217343-583f20270319?w=800");
    const record8_category_idLookup = app.findFirstRecordByFilter("categories", "slug='estudos-biblicos'");
    if (!record8_category_idLookup) { throw new Error("Lookup failed for category_id: no record in 'categories' matching \"slug='estudos-biblicos'\""); }
    record8.set("category_id", record8_category_idLookup.id);
    record8.set("author", "Pr. Tiago");
    record8.set("date", "2024-02-25");
    record8.set("views", 345);
    record8.set("is_featured", false);
    record8.set("status", "published");
  try {
    app.save(record8);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record9 = new Record(collection);
    record9.set("title", "Serm\u00e3o: F\u00e9 que Move Montanhas");
    record9.set("slug", "sermao-fe-move-montanhas");
    record9.set("content", "Um inspirador serm\u00e3o sobre o poder da f\u00e9 e como ela nos capacita a superar qualquer obst\u00e1culo em nossas vidas.");
    record9.set("excerpt", "Descubra o poder transformador da f\u00e9 verdadeira em Deus.");
    record9.set("featured_image", "https://images.unsplash.com/photo-1507842217343-583f20270319?w=800");
    const record9_category_idLookup = app.findFirstRecordByFilter("categories", "slug='sermoes'");
    if (!record9_category_idLookup) { throw new Error("Lookup failed for category_id: no record in 'categories' matching \"slug='sermoes'\""); }
    record9.set("category_id", record9_category_idLookup.id);
    record9.set("author", "Pastor Ant\u00f4nio");
    record9.set("date", "2024-03-01");
    record9.set("views", 789);
    record9.set("is_featured", true);
    record9.set("status", "published");
  try {
    app.save(record9);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record10 = new Record(collection);
    record10.set("title", "Atividades Infantis: Colorindo a B\u00edblia");
    record10.set("slug", "atividades-infantis-colorindo-biblia");
    record10.set("content", "Atividades divertidas e educativas para crian\u00e7as, incluindo desenhos para colorir com temas b\u00edblicos que refor\u00e7am o aprendizado.");
    record10.set("excerpt", "Atividades l\u00fadicas para crian\u00e7as aprenderem sobre a B\u00edblia de forma divertida.");
    record10.set("featured_image", "https://images.unsplash.com/photo-1507842217343-583f20270319?w=800");
    const record10_category_idLookup = app.findFirstRecordByFilter("categories", "slug='infantil'");
    if (!record10_category_idLookup) { throw new Error("Lookup failed for category_id: no record in 'categories' matching \"slug='infantil'\""); }
    record10.set("category_id", record10_category_idLookup.id);
    record10.set("author", "Tia Carla");
    record10.set("date", "2024-03-05");
    record10.set("views", 612);
    record10.set("is_featured", false);
    record10.set("status", "published");
  try {
    app.save(record10);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record11 = new Record(collection);
    record11.set("title", "Mapa Mental: Frutos do Esp\u00edrito");
    record11.set("slug", "mapa-mental-frutos-espiritu");
    record11.set("content", "Explore os nove frutos do Esp\u00edrito Santo atrav\u00e9s de um mapa mental que mostra como cada fruto se manifesta em nossas vidas.");
    record11.set("excerpt", "Visualize os frutos do Esp\u00edrito Santo em um mapa mental educativo.");
    record11.set("featured_image", "https://images.unsplash.com/photo-1507842217343-583f20270319?w=800");
    const record11_category_idLookup = app.findFirstRecordByFilter("categories", "slug='mapas-mentais'");
    if (!record11_category_idLookup) { throw new Error("Lookup failed for category_id: no record in 'categories' matching \"slug='mapas-mentais'\""); }
    record11.set("category_id", record11_category_idLookup.id);
    record11.set("author", "Prof. Lucas");
    record11.set("date", "2024-03-10");
    record11.set("views", 298);
    record11.set("is_featured", true);
    record11.set("status", "published");
  try {
    app.save(record11);
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
