import Link from 'next/link'
import { LayoutDashboard, Sheet, WalletCards } from 'lucide-react'
import { metadata } from '@/app/layout'

export default function HeaderNav() {
	return(
		<aside className='sidebar w-56 fixed h-screen border-r border-gray-200 shadow-lg'>
			<h2 className='font-title font-medium text-lg px-3 py-4 border-b border-gray-200'>{ metadata.title }</h2>
			<nav className='px-2 py-3'>
				<ul className='font-title space-y-3'>
					<li className='text-sm'>
						<Link href='/' className='flex items-center gap-x-2.5 px-2 py-2 rounded-md hover:bg-indigo-500/60 hover:text-white transition-all duration-500 hover:shadow-lg'>
							<LayoutDashboard className='text-base' />Dashboard
						</Link>
					</li>
					<li className='text-sm'>
						<Link href='/timesheet' className='flex items-center gap-x-2.5 px-2 py-2 rounded-md hover:bg-indigo-500/60 hover:text-white transition-all duration-500 hover:shadow-lg'>
							<Sheet className='text-base' />Timesheet
						</Link>
					</li>
					<li className='text-sm'>
						<Link href='/invoices' className='flex items-center gap-x-2.5 px-2 py-2 rounded-md hover:bg-indigo-500/60 hover:text-white transition-all duration-500 hover:shadow-lg'>
							<WalletCards className='text-base' />Invoices
						</Link>
					</li>
				</ul>
			</nav>
		</aside>
	)
}
