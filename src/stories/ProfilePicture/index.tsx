import RandomSeed from "random-seed";

// Copied from https://betterprogramming.pub/create-a-letter-picture-like-google-with-react-ae12a7a4390e
export const createImageFromInitials = (name: string | undefined) => {
  if (name == null) return undefined;

  const size = 100;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = canvas.height = size;

  const rand = RandomSeed.create(name);
  const backgrounds = [
    "#2c8bc3",
    "#c32cb0",
    "#3aef58",
    "#ea6a2c",
    "#ea2c6a",
    "#2cb6ea",
    "#504f98",
    "#bd2479",
    "#000080",
    "#800080",
    "#00FF00",
    "#800000",
  ];
  const color = backgrounds[rand(backgrounds.length)];
  const splitName = name.split(" ");

  if (context) {
    context.fillStyle = color;
    context.fillRect(0, 0, size, size);

    context.fillStyle = "#ffffff";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.font = `bold ${size / 2.2}px 'Segoe UI'`;
    if (splitName.length > 1) {
      context.fillText(
        splitName[0][0] + splitName[splitName.length - 1][0],
        size / 2,
        size / 2
      );
    } else {
      context.fillText(splitName[0][0], size / 2, size / 2);
    }
  }

  return canvas.toDataURL();
};
