
import { useRecoilState, useRecoilValue } from 'recoil'
import { todoListFilterState, todoListStatsState } from '../filterState'
export default function TodoListFilters() {
    const [filter, setFilter] = useRecoilState(todoListFilterState)

    const updateFilter = ({ target: { value } }) => {
        setFilter(value)
    }

    return (
        <>
            Filter:
            <select value={filter} onChange={updateFilter}>
                <option value={'Show All'}>All</option>
                <option value={'Show Completed'}>Completed</option>
                <option value={'Show Uncompleted'}>Uncompleted</option>
            </select>
        </>
    )
}

export function TodoListStats() {
    const {
        totalNum,
        totalCompletedNum,
        totalUncompletedNum,
        percentCompleted,
    } = useRecoilValue(todoListStatsState);

    const formattedPercentCompleted = Math.round(percentCompleted);

    return (
        <ul>
            <li>Total items: {totalNum}</li>
            <li>Items completed: {totalCompletedNum}</li>
            <li>Items not completed: {totalUncompletedNum}</li>
            <li>Percent completed: {formattedPercentCompleted}</li>
        </ul>
    );
}