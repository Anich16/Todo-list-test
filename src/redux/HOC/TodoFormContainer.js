import {connect} from "react-redux";
import TodoForm from "../../components/TodoForm";
import {addItemAC, addNewTextItemAC, newTextItemSelector} from "../TodoListReducer";

let mapStateToProps = (state) => {
    return {
        newTextItem: newTextItemSelector(state)
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        addNewText: (text) => {
            dispatch(addNewTextItemAC(text))
        },
        addItem: ()=> {
            dispatch(addItemAC())
        }
    }
};

const TodoFormContainer = connect(mapStateToProps, mapDispatchToProps)(TodoForm);
export default TodoFormContainer;