import { Button } from "react-native-paper";

export interface DeleteButtonProps {
    deleteHandler: Function;
}

const DeleteButton = ({ deleteHandler }: DeleteButtonProps) => {
    return (
        <Button
            icon="trash-can"
            buttonColor="#ba000d"
            mode="contained"
            onPress={() => deleteHandler()}
        >
            Delete
        </Button>
    );
}

export default DeleteButton;