import { openDB } from "idb";

const DB_NAME = "StoryArchiveDB";
const STORE_NAME = "stories";

export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: "id" });
    }
  },
});

export async function getAllStoriesFromDB() {
  const db = await openDB(DB_NAME, 1);
  const stories = await db.getAll(STORE_NAME);

  return stories.map((story) => ({
    ...story,
    photoUrl: URL.createObjectURL(story.photoBlob),
  }));
}

export async function deleteStoryFromDB(storyId) {
  const db = await openDB(DB_NAME, 1);
  await db.delete(STORE_NAME, storyId);
}
