/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("admin_users");

  const existing = collection.fields.getByName("created");
  if (existing) {
    if (existing.type === "autodate") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("created"); // exists with wrong type, remove first
  }

  collection.fields.add(new AutodateField({
    name: "created",
    onCreate: true,
    onUpdate: false
  }));

  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("admin_users");
    collection.fields.removeByName("created");
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})
