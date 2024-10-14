export function uploadMedia() {
  return new Promise<File>((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();
    input.addEventListener("change", processUpload, { once: true });
    input.accept =
      "image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm,video/ogg";

    function processUpload() {
      if (input.files && input.files.length > 0) {
        input.removeEventListener("change", processUpload);

        const file = input.files[0];

        const allowedImageTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        const allowedVideoTypes = ["video/mp4", "video/webm", "video/ogg"];
        if (
          allowedImageTypes.includes(file.type) ||
          allowedVideoTypes.includes(file.type)
        ) {
          resolve(file);
        }
      } else reject("Error uploading the file");
    }
  });
}
