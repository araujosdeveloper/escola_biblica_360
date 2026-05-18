
/**
 * POCKETBASE MIGRATIONS DOCUMENTATION & TEMPLATE
 * 
 * Migrations in PocketBase allow you to version-control your database schema.
 * 
 * HOW TO USE:
 * 1. Do not write these files manually unless necessary.
 * 2. Make your schema changes in the PocketBase Admin UI (Settings > Collections).
 * 3. Export the migrations: Settings > Backups > Export collections.
 * 4. Place the generated `.js` files in this `pb_migrations` directory.
 * 5. PocketBase will automatically execute new migrations when it starts up.
 */

migrate((db) => {
  // This is a template showing the structure of a PocketBase migration.
  // The 'up' migration logic goes here.
  
  /* Example of creating a collection programmatically:
  const collection = new Collection({
    "id": "example12345678",
    "name": "example_collection",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "text_field_1",
        "name": "title",
        "type": "text",
        "required": true,
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
  });

  return Dao(db).saveCollection(collection);
  */
}, (db) => {
  // The 'down' (rollback) migration logic goes here.
  
  /* Example of rolling back a collection:
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("example_collection");
  return dao.deleteCollection(collection);
  */
});
