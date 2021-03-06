import * as type from "../constants/action-types"
import * as itemApi from "../../api/dataApi";
import {Alert} from "react-native";

// export function addItem(payload) {
//     return { type: type.ADD_ITEM, payload }
// };
export function loadItemsSuccess(items) {
    return {type: type.FETCH_ITEMS, items}
};

export function fetchItems() {
    return function (dispatch) {
        return itemApi.getItems().then(items => {
            dispatch(loadItemsSuccess(items));
        })
        // .catch(error => {
        //     alert(error.message);
        // });
    }
}

export function addItem(photo, body) {
    return function (dispatch) {
        return itemApi.addItem(photo, body).then((resp) => {
            let item=resp.data;
            console.log(item);
            if (item != null) {
                Alert.alert('Success', 'Account Added ');
                dispatch({type: type.ADD_ITEM, item});
            } else
                Alert.alert('Error', 'An error occurred when creating account');

        }).catch(error => {
            console.log(error);
            Alert.alert('Error', 'Add Account Failed',
                [
                    {text: "OK", onPress: () => console.log("OK Pressed")}
                ],
                {cancelable: true}
            );
        });
    }
}

export function deleteItem(id) {
    return function (dispatch) {
        return itemApi.deleteItem(id).then(response => {
            dispatch({type: type.DELETE_ITEM, id});
        }).catch(error => {
            //throw error;
        });
    }
}

