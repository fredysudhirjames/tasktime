export const getTasksSummary = async () => {
	try {
		const res = await fetch( `${ process.env.NEXT_PUBLIC_API_URL }/api/summary`, { cache: 'no-store' } );
		if ( !res.ok ) {
			throw new Error( 'Failed to fetch summary' );
		}
		return await res.json();
	} catch ( error ) {
		console.error( 'Error getting tasks summary: ', error );
		return [];
	}
}
