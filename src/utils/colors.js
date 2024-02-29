const generateColors = (startColor, steps = 6) => {
  const colorListLight = [];
  const colorListDark = [];
  const startRGB = hexToRgb(startColor);

  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1);
    const color = interpolateColor([255, 255, 255], startRGB, ratio); // Interpolamos con blanco para suavizar
    colorListLight.push(rgbToHex(color));
  }

  // Generar colores ascendentes con nombres específicos
  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1);
    const color = interpolateColor(startRGB, [0, 0, 0], ratio);
    colorListDark.push(rgbToHex(color));
  }

  return {
    light: colorListLight.reverse(),
    dark: colorListDark,
  };
};

export default generateColors;

const hexToRgb = (hex) => {
  // Asignar #222 si hex es undefined
  hex = hex || "#fffff";

  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
};

const rgbToHex = (rgb) => {
  return (
    "#" +
    ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)
  );
};

const interpolateColor = (startRGB, endRGB, ratio) => {
  const result = [];
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(startRGB[i] + ratio * (endRGB[i] - startRGB[i]));
  }
  return result;
};
