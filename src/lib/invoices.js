export const getAllInvoices = async () => {
	try {
		const res = await fetch( `${ process.env.NEXT_PUBLIC_API_URL }/api/invoices`, { cache: 'no-store' } );
		if ( !res.ok ) {
			throw new Error( 'Failed to fetch invoices' );
		}
		return await res.json();
	} catch ( error ) {
		console.error( 'Error getting invoices: ', error );
		return [];
	}
}

export const createNewInvoice = async ( details ) => {
	try {
		const res = await fetch( `${ process.env.NEXT_PUBLIC_API_URL }/api/invoices`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify( details )
		} );
		// Get the response json
		const resJson = await res.json()

		// Throw error if the request failed.
		if ( !res.ok ) {
			throw new Error( resJson.error );
		}
		return resJson
	} catch ( error ) {
		// Error captured here.
		console.error( 'Error adding new Invoice:', error );
		return { error: 'Error adding new Invoice' };
	}
}
