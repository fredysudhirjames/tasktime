import Link from 'next/link';
import { getAllTasks, getTasksSummaryForHomepage } from '@/lib/tasks';
import { getTasksSummary } from '@/lib/summary';
import { FilePlus2, MoveRight } from 'lucide-react';
import TasksTable from '@/components/TasksTable';
import { Fragment } from 'react';

const Overview = ( {summary} ) => {
	if ( summary.length === 0 || summary.totalHours === 0 ) {
		return (
			<Fragment>
				<h6 className='font-title font-medium text-lg'>&nbsp;</h6>
				<p>No tasks yet. Create a new task!</p>
			</Fragment>
		)
	}

	return (
		<Fragment>
			<h6 className='font-title font-medium text-lg'>Overview</h6>
			<div className='p-3 border border-gray-300 rounded-md space-y-1 bg-indigo-100'>
				<p>Total hours: { summary.totalHours }</p>
				<p>Hours to be invoiced: { summary.pendingHours }</p>
			</div>
		</Fragment>
	)
}

export default async function Home() {
	const latestTasks = await getTasksSummaryForHomepage();
	const tasksSummary = await getTasksSummary();

	return (
		<div className="space-y-8">
			<div className='grid grid-cols-2 gap-x-10 border-b border-gray-400 pb-8'>
				<div className='space-y-2'>
					<Overview summary={ tasksSummary.summary } />
				</div>

				<div className='space-y-2'>
					<h6 className='font-title font-medium text-lg'>&nbsp;</h6>
					<Link href='addTask' className='btn btn--icon'>
						Add new task
						<FilePlus2 size={18}/>
					</Link>
				</div>
			</div>
			{
				latestTasks.tasks.length > 0 &&
				<div>
					<div className='flex justify-between items-center mb-3'>
						<h6 className='font-title font-medium text-lg'>Recent tasks</h6>
						<Link href='timesheet' className='link-with-arrow'><span>View all tasks</span> <MoveRight /></Link>
					</div>
					<TasksTable tasks={ latestTasks.tasks } />
				</div>
			}
		</div>
	);
}
