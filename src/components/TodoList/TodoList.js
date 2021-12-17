import React, { useState } from 'react';
import { useSetRecoilState, useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import TodoListFilters, { TodoListStats } from '../TodoFilter/TodoFilter'
import { todoListState, replaceItemAtIndex, removeItemAtIndex, getId, userListState } from '../todoState'
import { filteredTodoListState } from '../filterState'

function TodoItemCreator() {
    const [inputValue, setInputValue] = useState('')
    const setTodoList = useSetRecoilState(todoListState)
    const addItem = () => {
        setTodoList((oldTodoList) => [
            ...oldTodoList,
            {
                id: getId(),
                text: inputValue,
                isComplete: false,
            },
        ]);
        setInputValue('');
    };

    const onChange = ({ target: { value } }) => {
        setInputValue(value);
    };

    return (
        <div>
            <input type='text' value={inputValue} onChange={onChange} />
            <button onClick={addItem}>ADD</button>
        </div>
    )
}

function TodoItem({ item }) {
    const [todoList, setTodoList] = useRecoilState(todoListState)
    const index = todoList.findIndex((ListItem) => ListItem === item)
    const editItemText = ({ target: { value } }) => {
        const newList = replaceItemAtIndex(todoList, index, {
            ...item,
            text: value,
        });

        setTodoList(newList)
    }

    const toggleItemCompletion = () => {
        const newList = replaceItemAtIndex(todoList, index, {
            ...item,
            isComplete: !item.isComplete
        })
        setTodoList(newList)
    }

    const deleteItem = () => {
        const newList = removeItemAtIndex(todoList, index);

        setTodoList(newList)
    }
    return (
        <div>
            <input type="text" value={item.text} onChange={editItemText} />
            <input
                type="checkbox"
                checked={item.isComplete}
                onChange={toggleItemCompletion}
            />
            <button onClick={deleteItem}>X</button>
        </div>
    );
}
function TodoList() {
    const todoList = useRecoilValue(filteredTodoListState);
    return (
        <div>
            <TodoListStats />
            <TodoListFilters />
            <TodoItemCreator />
            {todoList.map((todoItem) => (
                <TodoItem key={todoItem.id} item={todoItem} />
            ))}
        </div>
    )
}

export default TodoList;
