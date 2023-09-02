import { Show } from "solid-js";
export function Todo({ todo, index, onInputChage, onTextChange, onRemove }) {
  return (
    <>
      <input
        type="checkbox"
        class="w-5"
        checked={todo.completed}
        onChange={onInputChage}
      />
      <span
        class="py-2 px-4 "
        onDblClick={(e) => {
          e.preventDefault();
          e.target.setAttribute("contenteditable", true);
          e.target.focus();
        }}
        onBlur={(e) => {
          e.target.removeAttribute("contenteditable");
          onTextChange(e.target.innerText);
        }}
      >
        <Show when={todo.completed} fallback={todo.text}>
          <s style="pointer-events: none">{todo.text}</s>
        </Show>
      </span>

      {todo.completed && <button onClick={onRemove}>❌</button>}
    </>
  );
}
