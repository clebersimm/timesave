import { DataTable, Text } from "react-native-paper";
import StatusIcon from "./StatusIcon";
import { Pressable, View } from "react-native";
import StatusEnum from "@/src/shared/StatusEnum";

const items = [
    { key: 1, task: 'Lavar a louça', status: StatusEnum.ONGOING, tag: 'casa' },
    { key: 2, task: 'Estudar modulo backend', status: StatusEnum.STOPED, tag: 'estudo, PUC' },
    { key: 3, task: 'Fazer a prova do modulo 1 da pós, necessário entregar até sexta de tarde senão pode ter que fazer a materia de novo', status: StatusEnum.PENDING, tag: 'estudo' },
    { key: 4, task: 'Fazer o trabalho escrito do SIC', status: StatusEnum.PENDING, tag: 'estudo, mestrado' },
    { key: 5, task: 'Arrumar muro dos fundos. Necessário chamar o pedreiro', status: StatusEnum.PENDING, tag: 'casa, obra, externo' },
    { key: 6, task: 'Esta é uma tarefa com uma descrição muito longa que excede 255 caracteres. Esta descrição é apenas um exemplo para demonstrar como lidar com tarefas que possuem descrições extremamente longas. A descrição continua e continua, adicionando mais e mais texto para garantir que ultrapasse o limite de 255 caracteres.', status: StatusEnum.PENDING, tag: 'exemplo' },
];

export default function TodoTable() {
    const handleIconPress = (key: number) => {
        console.log('Icon pressed', key);
    }
    return (<DataTable>
        <DataTable.Header>
            <DataTable.Title><></></DataTable.Title>
            <DataTable.Title style={{ flex: 3, justifyContent: "flex-start" }}>Task</DataTable.Title>
            <DataTable.Title style={{ justifyContent: "center" }} >Tags</DataTable.Title>
        </DataTable.Header>
        {items.map((item) => (
            <DataTable.Row key={item.key}>
                <DataTable.Cell style={{ flex: 0.5 }}>
                    <Pressable onPress={() => handleIconPress(item.key)}>
                        <StatusIcon status={item.status} />
                    </Pressable>
                </DataTable.Cell>
                <DataTable.Cell style={{
                    flex: 5,
                    justifyContent: 'flex-start'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start'
                    }}>

                        <View>
                            <Text>{item.task}</Text>
                        </View>
                    </View>
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                    <Text>{item.tag}</Text>
                </DataTable.Cell>
            </DataTable.Row>
        ))}
    </DataTable>)
}