import { Button, Dialog, Portal, Text } from "react-native-paper";

interface DialogProps {
    showHideDialog: Function,
    visible: boolean
}

export default function DialogNewActity({ showHideDialog, visible }: DialogProps) {
    return (<Portal>
        <Dialog visible={visible}>
            <Dialog.Title>Nova atividade</Dialog.Title>
            <Dialog.Content>
                <Text>Cadastrar nova atividade</Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={() => showHideDialog()}>Salvar</Button>
            </Dialog.Actions>
        </Dialog>
    </Portal>)
}