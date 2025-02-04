export const getAllTasks = async () => {
	try {
		const res = await fetch( `${ process.env.NEXT_PUBLIC_API_URL}/api/tasks`, { cache: 'no-store' } );
		if ( !res.ok ) {
			throw new Error( 'Failed to fetch Tasks' );
		}
		return await res.json();
	} catch ( error ) {
		console.error( 'Error loading tasks:', error );
		return [];
	}
};

export const addNewTask = async ( taskData ) => {
	try {
		const res = await fetch( `${ process.env.NEXT_PUBLIC_API_URL }/api/tasks`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify( taskData )
		} );
		// Get the response json
		const resJson = await res.json()
		// Throw error if the request failed.
		if ( !res.ok ) {
			throw new Error( resJson.error );
		}
		return resJson
	} catch (error) {
		// Error captured here.
		console.error( 'Error adding new task:', error );
		return { error: 'Error adding new task' };
	}
}

export const updateTask = async ( id, taskData ) => {
	try {
		const res = await fetch( `${ process.env.NEXT_PUBLIC_API_URL }/api/tasks/${id}`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify( taskData )
		} );
		return await res.json();
	} catch ( error ) {
		// Error captured here.
		console.error( 'Error updating task:', error );
		return { error: 'Error updating task' };
	}
}

export const getTasksSummaryForHomepage = async () => {
	try {
		const res = await fetch( `${ process.env.NEXT_PUBLIC_API_URL}/api/tasks/summary`, { cache: 'no-store' } );
		if ( !res.ok ) {
			throw new Error( 'Failed to fetch Tasks summary' );
		}
		return await res.json();
	} catch ( error ) {
		console.error( 'Error fetching tasks summary:', error );
		return [];
	}
}

export const getTaskDetails = async( id ) => {
	try {
		const res = await fetch( `${ process.env.NEXT_PUBLIC_API_URL }/api/tasks/${id}`, { cache: 'no-store' } );
		if ( !res.ok ) {
			throw new Error( 'Failed to fetch Task details' );
		}
		return await res.json();
	} catch ( error ) {
		console.error( 'Error fetching task:', error );
		return [];
	}
}

export const removeTask = async( id ) => {
	try {
		const res = await fetch( `${ process.env.NEXT_PUBLIC_API_URL }/api/tasks/${ id }`, { method: 'DELETE' } );
		if ( !res.ok ) {
			throw new Error( 'Failed to delete task' );
		}
		return await res.json();
	} catch ( error ) {
		console.error( 'Error deleting task:', error );
		return { error: 'Error deleting task' };
	}
}

export const getUninvoicedTasks = async() => {
	try {
		const res = await fetch( `${ process.env.NEXT_PUBLIC_API_URL }/api/tasks/pendingTasks`, { cache: 'no-store' } );
		if ( !res.ok ) {
			throw new Error( 'Failed to fetch Tasks summary' );
		}
		return await res.json();
	} catch ( error ) {
		console.error( 'Error fetching task:', error );
		return [];
	}
}
