// import localFont from "next/font/local";
import Header from '@/components/Header';
import "./globals.scss";
import HeaderNav from '@/components/HeaderNav';
import { Inter, Roboto_Mono } from "next/font/google";

const inter = Inter({
	subsets: [ 'latin' ],
	display: 'swap',
	variable: '--font-inter',
});

const roboto = Roboto_Mono({
	subsets: [ 'latin' ],
	display: 'swap',
	variable: '--font-roboto',
});

export const metadata = {
	title: "Timesheet App",
	description: "Timesheet app to track tasks.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
		<body
			className={`${inter.variable} ${roboto.variable} font-body`}
		>
			<div className='content-wrap flex'>
				<HeaderNav />
				<div className='flex-1 ml-56'>
					<Header />
					<main className='p-8 pb-20 sm:p-20 lg:py-14'>
						{ children }
					</main>
				</div>
			</div>
		</body>
		</html>
	);
}
