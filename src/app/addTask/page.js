'use client'

import { useState } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation'
import TaskForm from '../components/TaskForm';
import { addNewTask } from '../lib/tasks';
import Message from '../components/Message';

export default function AddTask() {
	const router = useRouter();
	const localDate = format( new Date(), 'yyyy-MM-dd' );

	// Initial state for the new task.
	const initTaskState = {
		title: '',
		date: localDate,
		hours: 0.25,
		description: ''
	}

	const [ formData, setFormData ] = useState(initTaskState)
	const [ successMessage, setSuccessMessage ] = useState( '' );
	const [ errorMessage, setErrorMessage ] = useState( '' );

	// Clear the success and error messages after the timer expires.
	const clearSuccessMessage = () => setSuccessMessage( '' );
	const clearErrorMessage = () => setErrorMessage( '' );

	// Handle input field change.
	const handleChange = (e) => {
		const {name, value} = e.target
		setFormData((prevState) => ({
			...prevState,
			[name]: value
		}))
	};

	// Handle form submission.
	const handleSubmit = async () => {
		// Reset messages
		setSuccessMessage( '' );
		setErrorMessage( '' );

		const newTask = await addNewTask( formData );
		// Handle error in new task.
		if ( newTask.error ) {
			setErrorMessage( newTask.error );
		} else {
			// If no errors found, clear the form and show success message.
			setFormData( initTaskState );
			setSuccessMessage( 'Task created successfully!' );
			router.refresh();
		}
	};

	return(
		<div className='space-y-8'>
			<h2 className='font-title text-2xl pb-5 border-b border-gray-300'>Create New Task</h2>

			{/* Display success or error messages */ }
			{ successMessage && <Message type="success" text={ successMessage } clearMessage={ clearSuccessMessage } /> }
			{ errorMessage && <Message type="error" text={ errorMessage } clearMessage={ clearErrorMessage } /> }

			<TaskForm formData={ formData } handleChange={ handleChange } handleSubmit={ handleSubmit } formType="Add" />
		</div>
	)
}
