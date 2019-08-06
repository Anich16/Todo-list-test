import {connect} from "react-redux";
import TodoList from "../../components/TodoList";
import {
    changeDoneAC, changeEditAC, changeSearchAC, changeTagToSearchAC, changeTitleItemAC,
    deleteItemAC, inputTitleSelector, searchTodoList, searchStatusSelector} from "../TodoListReducer";

let mapStateToProps = (state) => {
    return {
        todoList: searchTodoList(state),
        inputTitle: inputTitleSelector(state),
        statusSearch: searchStatusSelector(state)
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        deleteItem: (id) => {
            dispatch(deleteItemAC(id))
        },
        changeEdit: (id) => {
            dispatch(changeEditAC(id))
        },
        changeTitleItem: (id, text) => {
            dispatch(changeTitleItemAC(id, text))
        },
        changeDone: (id) => {
            dispatch(changeDoneAC(id))
        },
        changeSearch: (status) => {
            dispatch(changeSearchAC(status))
        },
        changeTagToSearch: (text) => {
            dispatch(changeTagToSearchAC(text))
        }
    }
};

const TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList);
export default TodoListContainer;
