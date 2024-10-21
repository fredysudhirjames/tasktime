import Link from 'next/link';
import { Pencil } from 'lucide-react';
import RemoveTask from '@/app/components/RemoveTask';

export default function TasksTable( { tasks } ) {
	return(
		<table className='w-full border border-indigo-200'>
			<thead className='border-b border-gray-200 bg-indigo-300'>
				<tr>
					<td>Sl.no</td>
					<td>Date</td>
					<td>Task</td>
					<td>Hours</td>
					<td>Invoiced?</td>
					<td></td>
				</tr>
			</thead>
			<tbody>
				{
					tasks.map( ( task, index ) => {
						return (
							<tr key={ task._id } className='border-b border-gray-200'>
								<td>{ index + 1 }</td>
								<td>{ task.date.split( 'T' )[ 0 ] }</td>
								<td>{ task.title }</td>
								<td>{ task.hours }</td>
								<td>{ task.invoiced ? "yes" : "no" }</td>
								<td>
									<div className='flex items-center gap-x-2 justify-end'>
										{
											!task.invoiced &&
											<RemoveTask id={ task._id } />
										}
										<Link href={ `editTask/${ task._id }` } className='p-1'>
											<Pencil size={ 18 } className='hover:text-indigo-500 hover:scale-110' />
										</Link>
									</div>
								</td>
							</tr>
						)
					} )
				}
			</tbody>
		</table>
	)
}
