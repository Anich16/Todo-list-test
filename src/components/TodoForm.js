import React from "react";
import style from "./styles/TodoForm.module.scss";

const TodoForm = (props) => {

    const addText = (e) => {
        let value = e.target.value;
        props.addNewText(value);
    };

    return (
        <div className={style.todoForm}>
            <input placeholder='Default value' value={props.newTextItem}
                   className={style.editField} onChange={addText}/>
            <button className={style.buttonAdd} onClick={props.addItem}>Add</button>
        </div>
    )
};

export default TodoForm;
