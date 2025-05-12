self.addEventListener("push", (event) => {
  console.log("Service worker pushing...");

  async function chainPromise() {
    await self.registration.showNotification("Ada laporan baru untuk Anda!", {
      body: "pengguna lain telah menambahkan cerita baru",
    });
  }

  event.waitUntil(chainPromise());
});
