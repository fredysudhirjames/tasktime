import { getAllInvoices } from '@/lib/invoices'
import Link from 'next/link';
import { Fragment } from 'react';
import { Receipt } from 'lucide-react';

export default async function ViewInvoices() {
	const invoices = await getAllInvoices();

	if ( invoices.length === 0 ) {
		return(
			<Fragment>
				<Link href='/addInvoice' className='btn btn--icon'>
					Create Invoices
					<Receipt size={18}/>
				</Link>
				<div>No invoices found!</div>
			</Fragment>
		);
	}

	return(
		<div>
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
								</tr>
							);
						} )
					}
				</tbody>
			</table>
		</div>
	)
}
