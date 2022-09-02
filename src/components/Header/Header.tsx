import { Link } from 'react-router-dom';

const Header = ({
	show,
	onButtonClick,
}: {
	show: string;
	onButtonClick: () => void;
}) => {
	return (
		<header className='sticky top-0 text-gray-600 body-font z-10 bg-gray-100'>
			<div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
				<Link
					to='/home'
					className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'
				>
					<span className='ml-3 text-2xl sm:ml-0'>Nemo</span>
				</Link>
				<nav className='md:ml-auto flex flex-wrap items-center text-base justify-center text-center'>
					<Link
						to='/create'
						className='md:mr-5 sm:mr-0 hover:text-gray-900'
					>
						Create Blog
					</Link>
				</nav>
				<button
					onClick={onButtonClick}
					className='inline-flex items-center bg-indigo-500 text-white border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 transition-colors rounded text-base mt-4 md:mt-0'
				>
					{show}
				</button>
			</div>
		</header>
	);
};

export { Header };
