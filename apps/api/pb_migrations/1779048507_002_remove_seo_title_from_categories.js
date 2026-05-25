/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("categories");
  collection.fields.removeByName("seo_title");
  return app.save(collection);
}, (app) => {
  try {

  const collection = app.findCollectionByNameOrId("categories");
  collection.fields.add(new TextField({
    name: "seo_title",
    required: false
  }));
  return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})
