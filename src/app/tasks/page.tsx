'use client';
import { Button, Divider, Group, Stack, TextInput, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { TaskCard } from "./components/task-card";

export type Task = {
    description: string;
    done: boolean;
}

export default function TasksPage() {

    const [task, setTask] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>(() => {
        // Cargar tareas del localStorage
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        // Guardar tareas en localStorage cuando cambien
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (task.trim() !== "") {
            setTasks([
                ...tasks,
                {
                    description: task,
                    done: false
                }
            ]);
            setTask(""); // Limpiar input
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            addTask();
        }
    };

    const markTaskDone = (index: number) => {
        const newTasks = tasks.map((task, i) => {
            if (i === index) {
                task.done = !task.done
            }
            return task;
        });

        setTasks(newTasks);
    };


    const deleteTask = (index: number) => {
        const newTasks = tasks.filter((task, i) => i !== index);
        setTasks(newTasks);
    };


    return (
        <Stack
            style={{ 
                maxWidth: '800px', 
                width: '90%', 
                margin: '0 auto', 
                padding: '20px' 
            }}
        >
            <Group wrap="wrap" style={{ width: '100%' }}>
                <TextInput
                    style={{ flex: 1, minWidth: '200px' }}
                    size="md"
                    label="¿Cuál es la siguiente tarea?"
                    withAsterisk
                    description="Ingresa la siguiente tarea que deseas realizar"
                    placeholder="Describe tu tarea"
                    value={task}
                    onChange={(event) => setTask(event.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <Button 
                    onClick={addTask} 
                    color="blue" 
                    variant="outline"
                    disabled={task.trim() === ""}
                    style={{ marginTop: '24px' }}
                >
                    Agregar tarea
                </Button>
            </Group>
            <Title order={2}>
                Tareas {tasks?.length}:
            </Title>
            <Divider />
            <Stack>
                {
                    tasks?.map((task, index) => (
                        <TaskCard
                            key={index}
                            task={task}
                            index={index}
                            handleCheck={markTaskDone}
                            handleDelete={deleteTask}
                        />
                    ))
                }
            </Stack>
        </Stack>
    );
}