export function uploadMedia() {
  return new Promise<FileList>((resolve, reject) => {
    const input = document.createElement("input");
    input.multiple = true;
    input.type = "file";
    input.click();
    input.addEventListener("change", processUpload, { once: true });
    input.accept =
      "image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm,video/ogg";

    function processUpload() {
      if (input.files && input.files.length > 0) {
        input.removeEventListener("change", processUpload);

        const files = input.files;

        const allowedImageTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        const allowedVideoTypes = ["video/mp4", "video/webm", "video/ogg"];

        for (const file of files) {
          if (
            !(
              allowedImageTypes.includes(file.type) ||
              allowedVideoTypes.includes(file.type)
            )
          )
            reject("Недопустимый формат файла");
        }
        resolve(files);
      } else reject("Error uploading the file");
    }
  });
}
