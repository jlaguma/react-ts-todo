import React, { useEffect, useState } from 'react';

type FormElem = React.FormEvent<HTMLFormElement>;
interface Todo {
    text: string;
    complete: boolean;
}

export const Todos = () => {
    const [value, setValue] = useState<string>('');
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const saved_todos = localStorage.getItem('todos');
        if (saved_todos) {
            var _todos = JSON.parse(saved_todos);
            setTodos(_todos);
        } else {
            setTodos([]);
        }
    }, []);

    const handleSubmit = (e: FormElem): void => {
        e.preventDefault();
        addTodo(value);
        setValue('');
    };

    const addTodo = (text: string): void => {
        const newTodos: Todo[] = [...todos, { text: text, complete: false }];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const toggleTodo = (index: number): void => {
        const newTodos: Todo[] = [...todos];
        newTodos[index].complete = !newTodos[index].complete;
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const deleteTodo = (index: number): void => {
        const newTodos: Todo[] = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    return (
        <>
            <h2>TODO LIST</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                />
                <button type="submit">Add Todo</button>
            </form>
            <section>
                <ul>
                    {todos.map(
                        (t: Todo, i: number): JSX.Element => {
                            return (
                                <li key={i}>
                                    <span
                                        style={{
                                            textDecoration: t.complete
                                                ? 'line-through'
                                                : 'none',
                                        }}
                                    >
                                        {t.text}
                                    </span>{' '}
                                    <button
                                        type="button"
                                        onClick={() => toggleTodo(i)}
                                    >
                                        Toggle
                                    </button>{' '}
                                    <button
                                        type="button"
                                        onClick={() => deleteTodo(i)}
                                    >
                                        &times;
                                    </button>
                                </li>
                            );
                        }
                    )}
                </ul>
            </section>
        </>
    );
};

export default Todos;
