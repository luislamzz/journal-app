import { fileUpload } from "../../src/helpers/fileUpload";

describe("Pruebas en fileUpload", () => {

  test("debe de subir el archivo correctamente a cloudinary", async () => {

    const imageUrl = 'https://static.wikia.nocookie.net/house-of-mouse/images/b/b8/Dumbo.png/revision/latest?cb=20140417201238&path-prefix=es';

    const resp = await fetch(imageUrl);
    const myblob = await resp.blob();
    const file = new File([myblob], "foto.png");

    console.log(myblob);
    console.log(file);

    const url = await fileUpload(file);

    expect(typeof url).toBe("string");
  });
});