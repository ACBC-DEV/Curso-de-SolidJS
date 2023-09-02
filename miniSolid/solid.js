let context = [];
export function createSignal(value) {
  const subscribers = new Set();
  const read = () => {
    const observer = context[context.length - 1];
    if (observer) subscribers.add(observer);
    return value;
  };
  const write = (newValue) => {
    if (typeof newValue === "function") newValue = newValue(value);

    value = newValue;
  };
  return [read, write];
}
export function createEffect(fn) {
  context.push(fn);
  fn();
  context.pop();
}
