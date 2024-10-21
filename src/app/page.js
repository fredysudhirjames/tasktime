import Link from 'next/link';
import { getAllTasks, getTasksSummaryForHomepage } from './lib/tasks';
import { FilePlus2 } from 'lucide-react';
import TasksTable from './components/TasksTable';

export default async function Home() {
	const { tasks } = await getAllTasks();
	const latestTasks = await getTasksSummaryForHomepage();

	let totalHours = 0;
	let tobeInvoicedHours = 0;
	// Get the data for overview from the tasks details.
	if ( tasks.length > 0 ) {
		const { tobeInvoicedHoursCalc, totalHoursCalc } = tasks.reduce(
			( acc, current ) => {
				acc.totalHoursCalc += current.hours || 0
				if ( ! current.invoiced ) {
					acc.tobeInvoicedHoursCalc += current.hours || 0
				}

				return acc
			},
			{ tobeInvoicedHoursCalc: 0, totalHoursCalc: 0 }
		)
		totalHours = totalHoursCalc
		tobeInvoicedHours = tobeInvoicedHoursCalc
	}

	return (
		<div className="space-y-8">
			<div className='grid grid-cols-2 gap-x-10 border-b border-gray-400 pb-8'>
				<div className='space-y-2'>
					<h6 className='font-title font-medium text-lg'>Overview</h6>
					<div className='p-3 border border-gray-300 rounded-md space-y-1 bg-indigo-100'>
						<p>Total hours: { totalHours }</p>
						<p>Hours to be invoiced: { tobeInvoicedHours }</p>
					</div>
				</div>

				<div className='space-y-2'>
					<h6 className='font-title font-medium text-lg'>&nbsp;</h6>
					<Link href='addTask' className='btn btn--icon'>
						Add new task
						<FilePlus2 size={18}/>
					</Link>
				</div>
			</div>
			<div>
				<h6 className='font-title font-medium text-lg mb-3'>Recent tasks</h6>
				<TasksTable tasks={ latestTasks.tasks }/>
			</div>
		</div>
	);
}
