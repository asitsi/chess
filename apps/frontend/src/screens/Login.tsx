import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '@repo/store/userAtom';

const BACKEND_URL = 'http://localhost:3000';

const Login = () => {
  const navigate = useNavigate();
  // const guestName = useRef<HTMLInputElement>(null);
  const [_, setUser] = useRecoilState(userAtom);
  const [guestUserID, setGameUserID] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('Username');
    if (username !== null) {
      setGameUserID(username);
    }
  }, []);
  useEffect(() => {
    console.log(guestUserID);
    if (guestUserID === null || guestUserID.length === 0) {
      return;
    } else {
      loginAsGuest();
    }
  }, [guestUserID]);

  const loginAsGuest = async () => {
    if (guestUserID === null || guestUserID.length === 0) return;
    const response = await fetch(`${BACKEND_URL}/auth/guest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: guestUserID || '',
      }),
    });
    const user = await response.json();
    setUser(user);
    console.log(user);

    navigate('/game/random');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-textMain">
      <h1 className="text-4xl font-bold mb-8 text-center text-green-500 drop-shadow-lg">Enter the Game World</h1>
      <div className="bg-bgAuxiliary2 rounded-lg shadow-lg p-8 flex flex-col md:flex-row">
        <div className="mb-8 md:mb-0 md:mr-8 justify-center flex flex-col"></div>
        <div className="flex flex-col items-center md:ml-8">
          <div className="flex items-center mb-4"></div>

          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300">
            Loading...
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
