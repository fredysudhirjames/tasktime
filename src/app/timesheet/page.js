import { getAllTasks } from '@/lib/tasks';
import TasksTable from '@/components/TasksTable';

export default async function ViewTimesheet() {
	const { tasks } = await getAllTasks();

	return(
		<div>
			<h6 className='font-title font-medium text-lg mb-3'>All tasks</h6>
			<TasksTable tasks={tasks} />
		</div>
	)
}
