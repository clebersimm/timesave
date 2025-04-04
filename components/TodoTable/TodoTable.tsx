import { Button, List, Portal, Text } from "react-native-paper";
import { FlatList, View } from "react-native";
import StatusEnum from "@/src/shared/StatusEnum";
import ActionButton from "./ActionButton";
import { Dialog } from "react-native-paper";
import { useState } from "react";
import { Link } from "expo-router";
import { TodoTableItem } from "./TodoTableItem";

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

    return (
        <>
            <View style={{ flex: 1, padding: 16 }}>
                <FlatList data={items}
                    keyExtractor={(item) => item.key.toString()}
                    renderItem={({ item }) => (
                        <TodoTableItem
                            item={item}
                            onPress={() => handleIconPress(item.key)}
                        />
                    )}>
                </FlatList>
            </View>
        </>);
}