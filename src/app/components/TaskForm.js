import { format } from 'date-fns';
import { useState } from 'react';
import { SquareCheckBig } from 'lucide-react'

export default function TaskForm( { formData, handleChange, handleSubmit, isModified = false, formType = 'Add' }) {
	const [ errors, setErrors ] = useState( {} );
	const localDate = format( new Date(), 'yyyy-MM-dd' ); // Get today's date.
	const dateInitValue = formType === 'Add' ? formData.date : formData.date.substring( 0, 10 ); // Initial value of date field based on form type.

	// Validate form fields for empty.
	const validateForm = ( data ) => {
		const validationErrors = {};

		if ( !data.title.trim() ) {
			validationErrors.title = "Task title is required";
		}

		if ( !data.date ) {
			validationErrors.date = "Date is required";
		}

		if ( !data.description.trim() ) {
			validationErrors.description = "Task description is required";
		}

		if ( data.hours <= 0 ) {
			validationErrors.hours = "Hours should be greater than 0";
		}

		return validationErrors;
	};

	// Validate form data
	const onSubmit = ( e ) => {
		e.preventDefault();
		const validationErrors = validateForm( formData );
		if ( Object.keys( validationErrors ).length === 0 ) {
			setErrors( {} ); // Clear any previous errors
			handleSubmit();
		} else {
			setErrors( validationErrors );
		}
	};

	return(
		<form onSubmit={ onSubmit } className='grid grid-cols-2 gap-x-5 gap-y-5 max-w-3xl'>
			<div className='grid gap-x-5 grid-cols-[120px_auto] col-span-2'>
				<label htmlFor='title'>Title</label>
				<div>
					<input type='text' id='title' name='title' value={ formData.title } placeholder='Project name - short description' onChange={ handleChange } />
					{ errors.title && <p className='form-input-error'>{ errors.title }</p> }
				</div>
			</div>
			<div className='grid gap-x-5 grid-cols-[120px_auto]'>
				<label htmlFor='date'>Date</label>
				<div>
					<input type='date' id='date' name='date' max={ localDate } value={ dateInitValue } onChange={ handleChange } />
					{ errors.date && <p className='form-input-error'>{ errors.date }</p> }
				</div>
			</div>
			<div className='grid gap-x-5 grid-cols-[60px_auto]'>
				<label htmlFor='hours'>Hours</label>
				<div>
					<input type='number' id='hours' name='hours' min="0.25" value={ formData.hours } step="0.25" onChange={ handleChange } />
					{ errors.hours && <p className='form-input-error'>{ errors.hours }</p> }
				</div>
			</div>
			<div className='grid gap-x-5 grid-cols-[120px_auto] col-span-2'>
				<label htmlFor='description'>Description</label>
				<div>	
					<textarea name='description' id='description' rows="5" onChange={ handleChange } value={ formData.description }></textarea>
					{ errors.description && <p className='form-input-error'>{ errors.description }</p> }
				</div>
			</div>
			<div className='grid gap-x-5 grid-cols-[120px_auto] col-span-2'>
				<div></div>
				<button type='submit' className='btn btn--icon' disabled={ formType === 'Edit' && !isModified }>
					{ formType === 'Edit' ? 'Update Task' : 'Create Task' }
					<SquareCheckBig size={ 18 } />
				</button>
			</div>
		</form>
	)
}
