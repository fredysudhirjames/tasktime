'use client'

import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUninvoicedTasks } from '@/lib/tasks';
import Link from 'next/link';
import { createNewInvoice } from '@/lib/invoices';
import { useRouter } from 'next/navigation';

export default function AddInvoice() {
	const [ uninvoicedTasks, setUninvoicedTasks ] = useState( [] );
	const [ formData, setFormData ] = useState( {
		rate: 10,
		comments: '',
		totalHours: 0,
		tasks: [],
	} );
	const router = useRouter();

	useEffect( () => {
		const fetchUninvoicedTasks = async () => {
			const tasks = await getUninvoicedTasks();
			const totalUninvoicedHours = tasks.reduce( ( total, task ) => total + ( task.hours || 0 ), 0 );
			const associatedTaskIds = tasks.map( task => task._id );
			setUninvoicedTasks( tasks );
			setFormData( ( prevData ) => ( { ...prevData, totalHours: totalUninvoicedHours, tasks: associatedTaskIds } ) );
		};

		fetchUninvoicedTasks();
	}, [] );

	if ( formData.totalHours <= 0 ) {
		return(
			<div className='space-y-2'>
				<p className='text-xl font-medium'>Nothing to Invoice!</p>
				<p>Add a <Link href='addTask' className=' text-teal-700 underline underline-offset-2'>new task</Link> first to generate an Invoice</p>
			</div>
		)
	}

	// Handle input change.
	const handleChange = ( e ) => {
		const {name, value} = e.target;

		setFormData((prevState) => ({
			...prevState,
			[name]: value
		}))
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newInvoice = await createNewInvoice( formData );
		// Redirect if the invoice was created successfully
		if ( !newInvoice.error ) {
			router.push( '/invoices' );
		}
	}

	return(
		<div className='space-y-8'>
			<h2 className='font-title text-2xl pb-5 border-b border-gray-300'>Create New Invoice</h2>
			<form className='grid gap-5 max-w-3xl' onSubmit={handleSubmit}>
				<div className='grid gap-x-5 grid-cols-[120px_auto]'>
					<label htmlFor='rate'>Hourly rate</label>
					<div>
						<input type='number' id='rate' name='rate' min="10" step="5" placeholder='10' value={formData.rate} onChange={handleChange}/>
					</div>
				</div>
				<div className='grid gap-x-5 grid-cols-[120px_auto] row-start-2'>
					<label htmlFor='comments'>Comments</label>
					<div>
						<textarea name='comments' id='comments' rows="8" value={formData.comments} onChange={handleChange}></textarea>
					</div>
				</div>
				<div className='grid gap-x-5 grid-cols-[120px_auto]'>
					<div></div>
					<button type='submit' className='btn btn--icon'>
						Create Invoice
						<CirclePlus size={ 18 } />
					</button>
				</div>
			</form>
		</div>
	)
}
