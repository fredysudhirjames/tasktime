import { Check, CircleX } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Message( { type, text, clearMessage } ) {
	const baseClasses = 'px-4 py-3 rounded-md text-sm font-medium flex items-center gap-x-3';
	const successClasses = 'bg-green-100 text-green-800 border border-green-400';
	const errorClasses = 'bg-red-100 text-red-800 border border-red-400';
	const messageClasses = type === 'success' ? `${ baseClasses } ${ successClasses }` : `${ baseClasses } ${ errorClasses }`;
	const [ visible, setVisible ] = useState( true );

	// Hide the success & error messages after 3 seconds
	useEffect( () => {
		const timer = setTimeout( () => {
			setVisible( false );
			if ( clearMessage ) clearMessage();
		}, 3000 );

		return () => clearTimeout( timer ); // Clean up the timer on component unmount.
	}, [ text, clearMessage ] )

	if ( !visible || !text ) return null;

	return(
		<div className={messageClasses}>
			{ type === 'success' && <Check size={ 16 } strokeWidth={ 3 } /> }
			{ type === 'error' && <CircleX size={ 16 } strokeWidth={ 3 } /> }
			{text}
		</div>
	)
}
