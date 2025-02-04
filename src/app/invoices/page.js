import { getAllInvoices } from '@/lib/invoices'
import Link from 'next/link';
import { Fragment } from 'react';
import { Receipt } from 'lucide-react';
import { getUninvoicedTasks } from '@/lib/tasks';

export default async function ViewInvoices() {
	const invoices = await getAllInvoices();
	const pendingTasks = await getUninvoicedTasks();
	const totalUninvoicedHours = pendingTasks.reduce( ( total, task ) => total + ( task.hours || 0 ), 0 );

	if ( totalUninvoicedHours === 0 && invoices.length === 0 ) {
		return(
			<div className='space-y-2'>
				<p className='text-xl font-medium'>Nothing to do here!!</p>
				<p>Go back to <Link href='/' className=' text-teal-700 underline underline-offset-2'>dashboard</Link> or create a <Link href='/addTask' className=' text-teal-700 underline underline-offset-2'>new task</Link></p>
			</div>
		)
	}

	if ( invoices.length === 0 ) {
		return(
			<div className='space-y-3'>
				<h6 className='text-lg'>No invoices found!</h6>
				<p>Total hours to be invoiced: <b>{ totalUninvoicedHours } { totalUninvoicedHours > 1 ? 'hrs' : 'hr' }</b></p>
				<Link href='/addInvoice' className='btn btn--icon'>
					Create Invoice
					<Receipt size={18}/>
				</Link>
				
			</div>
		);
	}

	return(
		<div>
			<div className='pb-8 mb-8 border-b border-black space-y-3 md:flex md:justify-between md:items-center'>
				<p>Pending hours to be invoiced: <b>{ totalUninvoicedHours } { totalUninvoicedHours > 1 ? 'hrs' : 'hr' }</b></p>
				{
					totalUninvoicedHours > 0 &&
					<Link href='/addInvoice' className='btn btn--icon'>
						Create Invoice
						<Receipt size={ 18 } />
					</Link>
				}
			</div>
			<h6 className='font-title font-medium text-lg mb-3'>All Invoices</h6>
			<table className='w-full border border-indigo-200'>
				<thead className='border-b border-gray-200 bg-indigo-300'>
					<tr>
						<td>Invoice #</td>
						<td>Date</td>
						<td>Rate</td>
						<td>Total Hours</td>
						<td>Amount</td>
						<td>Comments</td>
						<td>PDF</td>
					</tr>
				</thead>
				<tbody>
					{
						invoices.map( inv => {
							return(
								<tr key={ inv._id } className='border-b border-gray-200'>
									<td>{ inv.invoiceNo }</td>
									<td>{ inv.date.split( 'T' )[ 0 ] }</td>
									<td>${ inv.rate }</td>
									<td>{ inv.totalHours }</td>
									<td>${ inv.amount / 100 }</td>
									<td>{ inv.comments }</td>
									<td>
										{
											inv.invFile ? (
												<a href={ `/invoices/${ inv.invFile }` } target='_blank' rel='noopener noreferrer' className='text-teal-700 underline'>View</a>
											) : (
												<span className='text-gray-400'>No file</span>
											)
										}
									</td>
								</tr>
							);
						} )
					}
				</tbody>
			</table>
		</div>
	)
}
