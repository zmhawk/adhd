// 获取横竖屏状态
export function getOrient(): "vertical" | "horizontal" {
  const { width, height } = window.screen;
  return width > height ? "horizontal" : "vertical";
}

// export function sortBy(array: object[], key: string | number) {
//   return array.sort((a, b) => {
//     return a[key] - b[key];
//   });
// }
