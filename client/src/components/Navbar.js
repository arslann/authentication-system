'use client';
import { logout } from '@/store/authSlice';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className="navbar justify-around">
      <Link href="/" className="btn normal-case text-xl">
        Home
      </Link>
      <div className="dropdown dropdown-end text-black">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src="https://e7.pngegg.com/pngimages/419/473/png-clipart-computer-icons-user-profile-login-user-heroes-sphere-thumbnail.png" />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <Link href="/profile" className="justify-between">
              Profile
            </Link>
          </li>
          {user && user.role === 'admin' && (
            <li>
              <Link href="/admin">Admin Dashboard</Link>
            </li>
          )}
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
