'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getTaskDetails, updateTask } from '@/app/lib/tasks'
import ViewTask from '@/app/components/ViewTask'
import Message from '@/app/components/Message'
import TaskForm from '@/app/components/TaskForm'

export default function EditTask({params}) {
	const { id } = params
	const router = useRouter();
	const [ taskDetails, setTaskDetails ] = useState(null)
	const [ loadedTaskDetails, setLoadedTaskDetails ] = useState( null ) // Secondary state to compare the initial value and changed values.
	const [ error, setError ] = useState(null)
	const [ loading, setLoading ] = useState( true )
	const [ successMessage, setSuccessMessage ] = useState( '' );
	const [ errorMessage, setErrorMessage ] = useState( '' );
	const [ isModified, setIsModified ] = useState( false ) // State to manage the button visibility.

	// Get the task details by ID.
	useEffect(() => {
		async function fetchTask() {
			try {
				const task = await getTaskDetails( id )
				if ( !task.success ) {
					setError( task.message );
				} else {
					setTaskDetails( task.task );
					setLoadedTaskDetails( task.task );
				}
			} catch( err ) {
				setError( 'Unable to fetch task details' );
			}
			setLoading( false )
		}
		fetchTask()
	}, [id])

	// Handle input changes
	const handleChange = ( e ) => {
		const { name, value } = e.target
		setTaskDetails(prevState => ({
			...prevState,
			[name]: value
		}))

		// Check if the taskDetails has been modified.
		checkIsModified( { ...taskDetails, [ name ]: value } )
	}

	// Check if the form is modified compared to initial loadedTaskDetails
	const checkIsModified = ( updatedTaskDetails ) => {
		const isTaskModified = JSON.stringify( updatedTaskDetails ) !== JSON.stringify( loadedTaskDetails )
		setIsModified( isTaskModified )
	}

	// Handle form submit event
	const handleSubmit = async () => {
		try {
			const updatedTask = await updateTask( id, taskDetails );

			// If the success key is set to false or the response contains an error key, then the update failed.
			if ( !updatedTask.success || updatedTask.error ) {
				setErrorMessage( updatedTask.message || updatedTask.error );
			} else {
				setSuccessMessage( 'Task updated succesfully!' );
				setLoadedTaskDetails( updatedTask.updatedTask )
				setIsModified( false )
				router.refresh();
			}
		} catch ( err ) {
			setError( 'Failed to update task' );
		}
	}

	// Clear the success and error messages after the timer expires.
	const clearSuccessMessage = () => setSuccessMessage( '' );
	const clearErrorMessage = () => setErrorMessage( '' );

	// If loading or error, show messages.
	if ( loading ) return <div>Loading...</div>
	if ( error ) return <Message type="error" text={ error } />

	// Check if task details exists before rendering.
	if ( !taskDetails ) return <Message type="error" text="No task details found" />

	// If the task has already been invoiced, show the view tasks page
	if ( taskDetails.invoiced ) {
		return <ViewTask task={ taskDetails } />
	}

	return (
		<div className='space-y-3'>
			{/* Display success or error messages */ }
			{ successMessage && <Message type="success" text={ successMessage } clearMessage={ clearSuccessMessage } /> }
			{ errorMessage && <Message type="error" text={ errorMessage } clearMessage={ clearErrorMessage } /> }

			<div className='space-y-8'>
				<h2 className='font-title text-2xl pb-5 border-b border-gray-300'>Edit Task: { taskDetails._id }</h2>
				<TaskForm formData={ taskDetails } handleChange={ handleChange } handleSubmit={ handleSubmit } isModified={ isModified } formType="Edit" />
			</div>
		</div>
	)
}
