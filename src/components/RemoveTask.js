'use client'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { removeTask } from '@/lib/tasks'

export default function RemoveTask( { id } ) {
	const router = useRouter();

	const deleteTask = async () => {
		const confirmed = confirm( 'Do you want to proceed with deleting?' );

		if ( confirmed ) {
			const res = await removeTask( id );
			
			if ( res.success && res.deletedTask !== null ) {
				router.refresh();
			} else {
				alert( 'Unable to delete task!' )
			}
		}
	}
	return(
		<button onClick={deleteTask}>
			<Trash2 size={ 18 } className='text-red-600 hover:text-red-800 hover:scale-110' />
		</button>
	)
}
