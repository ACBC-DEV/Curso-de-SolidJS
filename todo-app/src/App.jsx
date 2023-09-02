import { For, Show, createEffect, createMemo, createSignal } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { ButtonDarkMode } from "./components/ButtonDarkMode";
import { Todo } from "./components/Todo";

function App() {
  const todoLs = JSON.parse(window.localStorage.getItem("todos"));

  const [newItem, setNewItem] = createSignal("");
  const [todos, setTodos] = createStore(
    todoLs ?? [
      { text: "Abrazaar pinguino", completed: true },
      { text: "Abrazaar nos", completed: true },
      { text: "Abrazaar pinguino", completed: false },
    ]
  );

  function removeTodo(index) {
    setTodos(produce((todos) => todos.splice(index, 1)));
  }
  function addTodo() {
    if (newItem()) {
      setTodos(
        produce((todos) => todos.push({ text: newItem(), completed: false }))
      );
    }

    setNewItem("");
  }

  const completedCount = createMemo(
    () => todos.filter((t) => t.completed).length
  );

  createEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  });
  return (
    <>
      <div class="w-full h-full min-h-screen flex flex-col items-center dark:bg-black dark:text-white">
        <ButtonDarkMode />

        <h1 class="text-4xl my-32  text-center ">Solid Todo App</h1>
        <div class="flex flex-col items-center justify-center md:flex-row">
          <input
            class="border-4 border-black rounded-3xl bg-transparent py-2 px-4 my-3 w-3/5 dark:text-white dark:border-white"
            type="text"
            value={newItem()}
            onInput={(e) => setNewItem(e.target.value)}
          />
          <button
            class="px-5 py-1 mx-2 border-4 border-black rounded-3xl dark:border-white"
            onClick={() => addTodo()}
          >
            Add
          </button>
        </div>

        <section class="flex flex-col my-2 md:items-start md:flex-row">
          <ul class="flex flex-col mb-4 border-4 p-4  border-black mx-4 rounded-3xl dark:border-white">
            <li class="border-4 border-black rounded-3xl  p-2 dark:border-white">
              <span>TodoApp</span>
            </li>

            <For each={todos} fallback="Add a new Todo">
              {(todo, index) => (
                <Show when={!todo.completed}>
                  <li
                    class="grid grid-cols-2
                    mx-2 border-4 my-2 border-black rounded-3xl px-3 dark:border-white"
                  >
                    <Todo
                      todo={todo}
                      index={index()}
                      onInputChage={() => {
                        setTodos(
                          produce((todos) => {
                            todos[index()].completed =
                              !todos[index()].completed;
                          })
                        );
                      }}
                      onTextChange={(text) => {
                        setTodos(
                          produce((todos) => {
                            todos[index()].text = text;
                          })
                        );
                      }}
                      onRemove={() => removeTodo(index())}
                    />
                  </li>{" "}
                </Show>
              )}
            </For>
          </ul>
          <ul class="flex flex-col  border-4 p-4 border-black mx-4 rounded-3xl dark:border-white">
            <li class="border-4 border-black rounded-3xl  p-2 dark:border-white">
              <span>Completed</span>
            </li>
            <For each={todos} fallback="completed void">
              {(todo, index) => (
                <Show when={todo.completed}>
                  <li class="grid grid-cols-3  mx-2 border-4 my-2 border-black rounded-3xl px-3 dark:border-white">
                    <Todo
                      todo={todo}
                      index={index()}
                      onInputChage={() => {
                        setTodos(
                          produce((todos) => {
                            todos[index()].completed =
                              !todos[index()].completed;
                          })
                        );
                      }}
                      onTextChange={(text) => {
                        setTodos(
                          produce((todos) => {
                            todos[index()].text = text;
                          })
                        );
                      }}
                      onRemove={() => removeTodo(index())}
                    />
                  </li>
                </Show>
              )}
            </For>
          </ul>
        </section>

        <p class="text-sm mt-4 border-4 border-black rounded-3xl w-fit py-2 px-4  mb-2 dark:border-white">
          Completed count: {completedCount}
        </p>
      </div>
    </>
  );
}
export default App;
