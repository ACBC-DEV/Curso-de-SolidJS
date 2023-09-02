import logo from "./logo.svg";
import styles from "./App.module.css";
import { createSignal, createEffect, createMemo } from "solid-js";

function App() {
  const [count, setCount] = createSignal(0);
  //Signals derived
  const doubleCount = () => count() * 2;
  // Signals Memorizados
  const isDivisibleBythree = createMemo(() => count() % 3 === 0);
  createEffect(() => {
    console.log("Count Changed " + count());
  });
  createEffect(() => {
    console.log("Is divisible by 3 " + isDivisibleBythree());
  });
  return (
    <div class={styles.App}>
      <h1> Count: {count()}</h1>
      <h2>Double Count: {doubleCount()} </h2>
      <h2>Is Disivible by three: {isDivisibleBythree() ? "Yes" : "No"}</h2>
      <button onClick={() => setCount(count() + 1)}>+</button>
    </div>
  );
}

export default App;
