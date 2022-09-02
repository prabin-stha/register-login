import { Link } from 'react-router-dom';

const NotFound = ({ buttonText }: { buttonText: string }) => {
	return (
		<section className='h-96 w-full flex flex-col justify-center items-center '>
			<h1 className='text-9xl font-extrabold text-[#1A2238] tracking-widest'>
				404
			</h1>
			<div className='bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute'>
				Page Not Found
			</div>
			<button className='mt-5'>
				<Link
					to='/home'
					className='relative inline-block text-sm font-medium text-white group'
				>
					<span className='absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0'></span>

					<span className='relative block px-8 py-3 bg-[#FF6A3D] border border-current'>
						<span>{buttonText}</span>
					</span>
				</Link>
			</button>
		</section>
	);
};

export { NotFound };
