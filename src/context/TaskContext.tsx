import React, { useEffect, useState } from "react";
import { TaskHistoryOutput, TaskInput, TaskOutput, taskService } from "../services/TaskService";

interface TaskContextProps {
    tasks: TaskOutput[];
    completedTasks: TaskOutput[];
    totalCredit: number;
    getTotalCredit: () => Promise<void>;
    fetchTasks: () => Promise<void>;
    addTask: (input: TaskInput) => Promise<void>;
    getTaskById: (taskId: number) => Promise<void>;
    task: TaskOutput | null;
    executeTask: (taskId: number) => Promise<void>;
    completeTask: (taskId: number) => Promise<void>;
    getTaskHistoryByTaskId: (taskId: number) => Promise<void>;
    taskHistory: TaskHistoryOutput[];
    taskCredit: number;
    calculateTaskCredit: (taskId: number) => Promise<void>;
    totalDebit: number;
    getTotalDebit: () => Promise<void>;
    fetchCompletedTasks: () => Promise<void>;
    deleteTask: (taskId: number) => Promise<void>;
}

const TaskContext = React.createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<TaskOutput[]>([]);
    const [totalCredit, setTotalCredit] = useState<number>(0);
    const [task, setTask] = useState<TaskOutput | null>(null);
    const [taskHistory, setTaskHistory] = useState<TaskHistoryOutput[]>([]);
    const [taskCredit, setTaskCredit] = useState<number>(0);
    const [totalDebit, setTotalDebit] = useState<number>(0);
    const [completedTasks, setCompletedTasks] = useState<TaskOutput[]>([]);

    const fetchTasks = async () => {
        try {
            const fetchedTasks = await taskService.getTasks();
            setTasks(fetchedTasks);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    };

    const fetchCompletedTasks = async () => {
        try {
            const completedTasks = await taskService.getCompletedTasks();
            setCompletedTasks(completedTasks);
        } catch (error) {
            console.error("Failed to fetch completed tasks:", error);
        }
    };

    const addTask = async (input: TaskInput) => {
        try {
            const newTaskOutput = await taskService.addTask(input);
            if (!newTaskOutput) {
                throw new Error("Failed to add task");
            }
            setTasks((prevTasks) => [...prevTasks, newTaskOutput]);
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    const getTotalCredit = async () => {
        try {
            const totalCredit = await taskService.getTotalCredit();
            if (totalCredit === undefined) {
                throw new Error("Failed to fetch total credit");
            }
            setTotalCredit(totalCredit);
        } catch (error) {
            setTotalCredit(0);
        }
    };

    const getTotalDebit = async () => {
        try {
            const totalDebit = await taskService.getTotalDebit();
            if (totalDebit === undefined) {
                throw new Error("Failed to fetch total credit");
            }
            setTotalDebit(totalDebit);
        } catch (error) {
            setTotalDebit(0);
        }
    };

    const getTaskById = async (taskId: number) => {
        try {
            const taskById = await taskService.getTaskById(Number(taskId));
            if (!taskById) {
                throw new Error("Failed to fetch task by ID");
            }
            setTask(taskById);
        } catch (error) {
            console.error("Failed to fetch task by ID:", error);
        }
    };

    const getTaskHistoryByTaskId = async (taskId: number) => {
        const taskHistory = await taskService.getTaskHistoryByTaskId(taskId);
        if (!taskHistory) {
            setTaskHistory([]);
        } else {
            setTaskHistory(taskHistory);
        }
    }

    const calculateTaskCredit = async (taskId: number) => {
        const taskCredit = await taskService.calculateTaskCredit(taskId);
        if (!taskCredit) {
            setTaskCredit(0);
        } else {
            setTaskCredit(taskCredit);
        }
    }

    const executeTask = async (taskId: number) => {
        const output = await taskService.executeTask(Number(taskId));
        if (!output) {
            throw new Error("Failed to execute task");
        }
        Promise.all([
            getTaskById(taskId),
            getTaskHistoryByTaskId(taskId),
            calculateTaskCredit(taskId),
        ]);
    }

    const deleteTask = async (taskId: number) => {
        await taskService.deleteTask(Number(taskId));
        await fetchTasks();
    }

    const completeTask = async (taskId: number) => {
        const output = await taskService.completeTask(Number(taskId));
        if (!output) {
            throw new Error("Failed to complete task");
        }
        await Promise.all([
            getTaskById(taskId),
            calculateTaskCredit(taskId),
            getTotalCredit(),
            getTotalDebit(),
            fetchTasks(),
            fetchCompletedTasks(),
        ]);
    }

    useEffect(() => {
        fetchTasks();
        getTotalCredit();
        getTotalDebit();
    }, []);

    const value = {
        tasks,
        fetchTasks,
        addTask,
        getTotalCredit,
        totalCredit,
        getTaskById,
        task,
        executeTask,
        completeTask,
        getTaskHistoryByTaskId,
        taskHistory,
        taskCredit,
        calculateTaskCredit,
        totalDebit,
        getTotalDebit,
        completedTasks,
        fetchCompletedTasks,
        deleteTask
    };

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export const useTaskContext = (): TaskContextProps => {
    const context = React.useContext(TaskContext);
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
};