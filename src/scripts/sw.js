self.addEventListener("push", (event) => {
  console.log("Service worker pushing...");

  async function chainPromise() {
    await self.registration.showNotification("Ada laporan baru untuk Anda!", {
      body: "pengguna lain telah menambahkan cerita baru",
    });
  }

  event.waitUntil(chainPromise());
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response || caches.match("./index.html") 
        );
      })
    );
  }
});
