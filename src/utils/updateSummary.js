import Summary from '@/backend/model/summary';

export const updateSummary = async (hours, invoiced) => {
	const summary = ( await Summary.findOne() ) || new Summary();
	summary.totalHours += hours;
	if ( ! invoiced ) {
		summary.pendingHours += hours;
	}
	
	await summary.save();
}
