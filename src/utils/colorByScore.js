export const getColorByScore = (score) => {
  // Define the start and end colors for the gradient
  console.log(score);
  const endColor = { r: 48, g: 198, b: 54 }; // green
  const middleColor = { r: 245, g: 135, b: 33 }; // orange
  const startColor = { r: 236, g: 57, b: 45 }; // red

  let r, g, b;

  if (score <= 50) {
    const t = score / 50;
    r = startColor.r + t * (middleColor.r - startColor.r);
    g = startColor.g + t * (middleColor.g - startColor.g);
    b = startColor.b + t * (middleColor.b - startColor.b);
  } else {
    const t = (score - 50) / 50;
    r = middleColor.r + t * (endColor.r - middleColor.r);
    g = middleColor.g + t * (endColor.g - middleColor.g);
    b = middleColor.b + t * (endColor.b - middleColor.b);
  }

  // Convert the RGB values to a hex color code
  const hexColor = `#${Math.round(r).toString(16).padStart(2, "0")}${Math.round(
    g
  )
    .toString(16)
    .padStart(2, "0")}${Math.round(b).toString(16).padStart(2, "0")}`;

  console.log(hexColor);

  return hexColor;
};
