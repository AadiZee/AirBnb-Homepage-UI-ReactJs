import React from 'react'

function BottomSectionItem({ title, subtitle }) {
  return (
	<div className='col-12 col-lg-4' style={{
		padding: '0.7rem 0'
	}}>
		<div className='d-flex flex-column align-items-start justify-content-between w-100'>
			<div className='' style={{
				fontSize: '1.05rem',
				fontWeight: '600'
			}}>
				{title}
			</div>
			<div className='' style={{
				fontSize: '1.05rem',
				fontWeight: '500',
				color: 'rgba(0, 0, 0, 0.5)'
			}}>
				{subtitle}
			</div>
		</div>
	</div>
  )
}

export default BottomSectionItem