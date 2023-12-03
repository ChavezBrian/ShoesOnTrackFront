import { useRouter } from 'next/navigation';

import { useDispatch } from 'react-redux';
import { clearUser } from '@/redux/actions';

import style from "./style.module.css"


const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch()

  const handleLogout = () => {
    
    router.push('/api/auth/logout');
    dispatch(clearUser());
  };

  return (
    <button className={style.buttonout} onClick={handleLogout}>Logout</button>
  );
};

export default Logout;