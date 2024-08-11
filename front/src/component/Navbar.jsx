import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/';
  const isHome = location.pathname === '/dashboard';

  return (
    <div className='absolute flex items-center justify-between px-2 top-0 left-0 z-10 h-12 md:h-16 w-full bg-black font-bold tracking-wider text-center text-xl md:text-3xl text-white'>
      <div>
        Q-Card
      </div>
      <div className='flex gap-4'>
        {!isHome && (
          <div className='cursor-pointer hover:text-blue-200'>
            <Link to='/dashboard'>Dashboard</Link>
          </div>
        )}
        {!isDashboard && (
          <div className='cursor-pointer hover:text-blue-200'>
            <Link to='/'>Home</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
