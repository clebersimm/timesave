import { Button, List, Portal, Text } from "react-native-paper";
import { FlatList, View } from "react-native";
import StatusEnum from "@/src/shared/StatusEnum";
import ActionButton from "./ActionButton";
import { Dialog } from "react-native-paper";
import { useState } from "react";

const items = [
    { key: 1, task: 'Lavar a louça', status: StatusEnum.ONGOING, tag: 'casa' },
    { key: 2, task: 'Estudar modulo backend', status: StatusEnum.STOPED, tag: 'estudo, PUC' },
    { key: 3, task: 'Fazer a prova do modulo 1 da pós, necessário entregar até sexta de tarde senão pode ter que fazer a materia de novo', status: StatusEnum.PENDING, tag: 'estudo' },
    { key: 4, task: 'Fazer o trabalho escrito do SIC', status: StatusEnum.PENDING, tag: 'estudo, mestrado' },
    { key: 5, task: 'Arrumar muro dos fundos. Necessário chamar o pedreiro', status: StatusEnum.PENDING, tag: 'casa, obra, externo' },
    { key: 6, task: 'Esta é uma tarefa com uma descrição muito longa que excede 255 caracteres. Esta descrição é apenas um exemplo para demonstrar como lidar com tarefas que possuem descrições extremamente longas. A descrição continua e continua, adicionando mais e mais texto para garantir que ultrapasse o limite de 255 caracteres.', status: StatusEnum.PENDING, tag: 'exemplo' },
];

export default function TodoTable() {

    const [visible, setVisible] = useState(false);
    const [dialogContent, setDialogContent] = useState({ task: '', tag: '' });

    const handleIconPress = (key: number) => {
        console.log('Icon pressed', key);
    }

    const handleShowDialogDetails = (task: string, tag: string) => {
        setDialogContent({ task, tag });
        setVisible(true);
    }

    const hideDialog = () => {
        setVisible(false);
    };

    return (
        <>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Detalhes</Dialog.Title>
                    <Dialog.Content>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <View>
                                <Text>{dialogContent.task}</Text>
                            </View>
                            <View>
                                <Text>Tags: {dialogContent.tag}</Text>
                            </View>
                        </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancelar</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <View style={{ flex: 1, padding: 16 }}>
                <FlatList data={items}
                    keyExtractor={(item) => item.key.toString()}
                    renderItem={({ item }) => (
                        <List.Item
                            key={item.key}
                            title={item.task}
                            description={item.tag}
                            onPress={() => handleShowDialogDetails(item.task, item.tag)}
                            style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
                            titleStyle={{ fontSize: 16, fontWeight: 'bold' }}
                            descriptionStyle={{ fontSize: 14, color: '#666' }}
                            right={() => (
                                <ActionButton
                                    status={item.status}
                                    onPress={() => handleIconPress(item.key)}
                                />
                            )}
                            titleNumberOfLines={5}
                            descriptionNumberOfLines={1}
                            titleEllipsizeMode="tail"
                            descriptionEllipsizeMode="tail"
                        />
                    )}>
                </FlatList>
            </View>
        </>);
}