import React from "react";
import style from "./styles/TodoList.module.scss";

const TodoList = (props) => {

    const changeTitle = (e, id) => {
      let value = e.target.value;
        props.changeTitleItem(id, value);
    };

    const findTasks = (task) => {
        if (props.statusSearch === false){
            props.changeSearch(true);
            props.changeTagToSearch(task)
        } else {
            props.changeSearch(false);
            props.changeTagToSearch("")
        }
    };

    return (
        <div>
            {
                props.todoList.map(i => {
                    return (
                    <li className={style.itemList} key={i.id}>
                        <div className={style.content}>
                            <div className={style.checkboxBlock}>
                                {
                                    i.done === false ?
                                        <span className={style.checkbox} onClick={()=> props.changeDone(i.id)}/>:
                                        <span className={style.isChecked} onClick={()=> props.changeDone(i.id)}>
                                            &#10004;
                                        </span>
                                }

                            </div>
                            {
                                i.edit === false ?
                                    <>
                                        <span className={i.done === false ? style.title : style.done}
                                              onDoubleClick={() => props.changeEdit(i.id)}>
                                            {i.title}
                                        </span>
                                        <button className={style.buttonDelete} onClick={() => props.deleteItem(i.id)}>
                                            &#10008;
                                        </button>
                                    </> :
                                    <>
                                    <div className={style.input}>
                                         <input type="text" className={style.inputTitle} value={i.title}
                                           onChange={(e) => changeTitle(e, i.id)} autoFocus/>
                                        <div className={style.inputBlock}>
                                            {
                                                i.title.split(" ").map(w => {
                                                    if (w.includes("#")) {
                                                        return <span className={style.backlight} key={w}>{w} </span>
                                                    } else {
                                                        return <span key={w}>{w} </span>
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>
                                        <button className= {style.buttonSave} onClick={()=> props.changeEdit(i.id)}>
                                            Save
                                        </button>
                                    </>
                            }



                        </div>
                        <div className={style.tagsBlock}>
                            {
                                i.tags.map( t => {
                                    return <p className={style.tag} key={t} onClick={() => findTasks(t)}>{t}</p>
                                })
                            }
                        </div>
                    </li>
                    )
                })
            }
        </div>
    )
};

export default TodoList;
