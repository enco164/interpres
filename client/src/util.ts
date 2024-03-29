import ISO6391 from "iso-639-1";

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const readJsonFile = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file, "utf-8");
    reader.onload = () => {
      try {
        if (typeof reader.result === "string") {
          const parsed = JSON.parse(reader.result);
          return resolve(parsed);
        }
        return reject("not string file");
      } catch (e) {
        return reject(e);
      }
    };
    reader.onerror = (error) => reject(error);
  });

export const mapLngCodeToLngOption = (code: string) => ({
  name: ISO6391.getName(code),
  code,
});

export const allLngs = ISO6391.getAllCodes().map(mapLngCodeToLngOption);
