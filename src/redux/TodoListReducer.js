import {createSelector} from "reselect";

//const
const ADD_ITEM = "TODO_LIST/ADD_ITEM";
const DELETE_ITEM = "TODO_LIST/DELETE_ITEM";
const CHANGE_DONE_STATUS = "TODO_LIST/CHANGE_DONE_STATUS";
const CHANGE_EDIT_STATUS = "TODO_LIST/CHANGE_EDIT_STATUS";
const ADD_NEW_TEXT_ITEM = "TODO_LIST/ADD_NEW_TEXT_ITEM";
const CHANGE_TITLE_ITEM = "TODO_LIST/CHANGE_TITLE_ITEM";
const CHANGE_SEARCH_STATUS = "TODO_LIST/CHANGE_SEARCH_STATUS";
const CHANGE_TAG_TO_SEARCH = "TODO_LIST/CHANGE_TAG_TO_SEARCH";

let initialState = {
    list: [
        {
            id: 1,
            done: false,
            title: "Run test task",
            tags: [],
            edit: false
        },
        {
            id: 2,
            done: false,
            title: "Take a walk in the #park with #family",
            tags: ["park", "family"],
            edit: false
        },
        {
            id: 3,
            done: false,
            title: "Find a new #job",
            tags: ["job"],
            edit: false
        }
    ],
    newTextItem: "",
    count: 1,
    tagsList: ["park", "family", "job"],
    searchStatus: false,
    tagToSearch: ""

};

const findTags = (string) => {
    let arr = string.split(" ");
    let tagsArr = arr.filter( i => {
        if (i.includes("#", 0)) {
            return i;
        }
    });
    tagsArr = tagsArr.map (i => {
        return i.slice(1)
    });
    return tagsArr;
};

let TodoListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_TEXT_ITEM: {
            return {...state, newTextItem: action.text}
        }

        case ADD_ITEM: {
            let newItem = {
                id: ++state.count,
                done: false,
                title: state.newTextItem,
                tags: findTags(state.newTextItem),
                edit: false
            };
            let newTagsList = [...state.tagsList];
            for (let i = 0; i < newItem.tags.length; i++){
                if (newTagsList.indexOf(newItem.tags[i]) === -1){
                    newTagsList.push(newItem.tags[i])
                }
            }
            return {...state, list: [...state.list, newItem], tagsList: newTagsList, newTextItem: ""}
        }

        case DELETE_ITEM: {
            let newList = state.list.filter( i => {
                if (i.id !== action.id){
                    return i
                }
            });
            return {...state, list: newList}
        }

        case CHANGE_EDIT_STATUS: {
            let newList = state.list.map( i => {
                if (i.id === action.id) {
                    return {...i, edit: !i.edit}
                }
                return i;
            });
            return {...state, list: newList}
        }

        case CHANGE_TITLE_ITEM: {
            const tagsArr = findTags(action.text);
            let newList = state.list.map(i => {
                if (i.id === action.id) {
                    return {...i, title: action.text, tags: tagsArr}
                }
                return i;
            });
            return {...state, list: newList}
        }

        case CHANGE_DONE_STATUS: {
            let newList = state.list.map(i => {
                if (i.id === action.id) {
                    return {...i, done: !i.done}
                }
                return i;
            });
            return {...state, list: newList}
        }

        case CHANGE_SEARCH_STATUS: {
            return {...state, searchStatus: action.status}
        }

        case CHANGE_TAG_TO_SEARCH: {
            return {...state, tagToSearch: action.text}
        }

        default:
            return state;
    }
};

// actionCreators
export const addNewTextItemAC = (text) => ({type: ADD_NEW_TEXT_ITEM, text});
export const addItemAC = () => ({type: ADD_ITEM});
export const deleteItemAC = (id) => ({type: DELETE_ITEM, id});
export const changeEditAC = (id) => ({type: CHANGE_EDIT_STATUS, id});
export const changeTitleItemAC = (id, text) => ({type: CHANGE_TITLE_ITEM, id, text});
export const changeDoneAC = (id) => ({type: CHANGE_DONE_STATUS, id});
export const changeSearchAC = (status) => ({type: CHANGE_SEARCH_STATUS, status});
export const changeTagToSearchAC = (text) => ({type: CHANGE_TAG_TO_SEARCH, text});

// selectors
export const todoListSelector = (state) => {
    return state.todoList.list.map(t => t)
};
export const inputTitleSelector = (state) => state.todoList.inputTitle;
export const searchStatusSelector = (state) => state.todoList.searchStatus;
export const newTextItemSelector = (state) => state.todoList.newTextItem;
export const tagToSearchSelector = (state) => state.todoList.tagToSearch;



// reselectors
export const searchTodoList = createSelector(
    tagToSearchSelector,
    todoListSelector,
    (tag, todoList) => {
        if (tag === ""){
            return todoList
        } else {
            let newTodoList = todoList.filter( t => {
                if (t.tags.includes(tag)){
                    return t
                }
            });
            return newTodoList
        }
    }
);
export default TodoListReducer;