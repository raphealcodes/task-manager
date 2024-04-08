import { TaskDTO } from "../models/task-interface";

export const statusData: any = ['pending', 'in progress', 'completed'];
export const priorityData: any = ['low', 'medium', 'high'];

export const initialData: TaskDTO[] = [
  {
   id: 1,
   title: 'Take Interview',
   description: 'scheduling this task for my interview',
   due_date: '07/04/2024',
   priority: 'low',
   status: 'pending'
  },
  {
    id: 2,
    title: 'Japa',
    description: 'scheduling this task for my Japa',
    due_date: '08/04/2024',
    priority: 'medium',
    status: 'completed'
   },
   {
    id: 3,
    title: 'meet the CTO',
    description: 'scheduling this task to meet the CTO',
    due_date: '07/04/2024',
    priority: 'high',
    status: 'in progress'
   }
]
