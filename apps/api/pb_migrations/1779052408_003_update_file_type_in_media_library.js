/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("media_library");
  const field = collection.fields.getByName("file_type");
  field.values = ["image", "pdf", "video", "document"];
  return app.save(collection);
}, (app) => {
  try {
  const collection = app.findCollectionByNameOrId("media_library");
  const field = collection.fields.getByName("file_type");
  if (!field) { console.log("Field not found, skipping revert"); return; }
  field.values = ["image", "pdf", "document"];
  return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection or field not found, skipping revert");
      return;
    }
    throw e;
  }
})
