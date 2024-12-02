import {
	FaFacebookSquare,
	FaInstagramSquare,
	FaTwitterSquare
} from "react-icons/fa"

import { PiGlobeSimpleBold } from "react-icons/pi";

const footerData = {
	sectionRight: {
		icon:  <PiGlobeSimpleBold className='mb-1' style={{
					width: '1.25rem',
					height: '1.25rem'
				}} />,
		title: {
			language: 'English',
			country: 'US'
		},
		currency: '$ USD',
		icons: [
			<FaFacebookSquare className='' style={{
				height: '1.45rem',
				width: '1.45rem'
			}} />,

			<FaTwitterSquare className='mx-1' style={{
				height: '1.45rem',
				width: '1.45rem'
			}} />,

			<FaInstagramSquare className='' style={{
				height: '1.45rem',
				width: '1.45rem'
			}} />
		]

	},
	sectionLeft: [
		'Terms',
		'Sitemap',
		'Privacy',
		'Your Privacy Choices'
	],
	sectionMiddle: '© 2024 Airbnb, Inc.'
}

export default footerData;