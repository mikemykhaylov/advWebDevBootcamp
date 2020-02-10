export default function generateColorArray(colorsNumber) {
  const colors = [];
  for (let i = 0; i < colorsNumber * 2; i += 2) {
    const color = `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, "0")}`;
    colors[i] = {
      color,
      opened: false,
      key: i
    };
    colors[i + 1] = {
      color,
      opened: false,
      key: i + 1
    };
  }
  for (let i = colors.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [colors[i], colors[j]] = [colors[j], colors[i]];
  }
  return colors;
}
