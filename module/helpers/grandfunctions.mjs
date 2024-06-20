export function fancyLog(object) {
  const label = `PTU | ${object.constructor.name}`;
  console.group(label);
  console.dir(object);
  console.groupEnd(label);
};
