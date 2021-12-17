import { atom, selector } from "recoil"
import { todoListState } from './todoState'
export const todoListFilterState = atom({
    key: 'todoListFilterState',
    default: 'Show all',
})


export const filteredTodoListState = selector({
    key: 'filteredTodoListState',
    get: ({ get }) => {
        const filter = get(todoListFilterState);
        const list = get(todoListState)

        switch (filter) {
            case 'Show completed':
                return list.filter((item) => item.isComplete);
            case 'Show Uncompleted':
                return list.filter((item) => !item.isComplete)
            default:
                return list;
        }
    }
})

export const todoListStatsState = selector({
    key: 'todoStatsState',
    get: ({ get }) => {
        const todoList = get(todoListState)
        const totalNum = todoList.length;
        const totalCompletedNum = todoList.filter((item) => item.isComplete).length
        const totalUncompletedNum = totalNum - totalCompletedNum
        const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum * 100

        return {
            totalNum,
            totalCompletedNum,
            totalUncompletedNum,
            percentCompleted
        }
    }
})