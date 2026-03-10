import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../store/FirebaseContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useHistory } from 'react-router-dom';

function Header() {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    console.log('Header user:', user);
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={() => history.push('./')} className="brandName">
          <OlxLogo />
        </div>

        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>

        <div className="desktopOnly placeSearch">
          <Search />
          <input type="text" placeholder='Search city, area or locality' />
          <Arrow />
        </div>

        <div className="desktopOnly language">
          <span> ENGLISH </span>
          <Arrow />
        </div>

        <div className="desktopOnly loginPage">
          <span
            onClick={() => {
              if (!user) {
                history.push('/login');
              }
            }}
          >
{user ? `Welcome ${user.displayName || user.email}` : 'Login'}          </span>
          <hr />
        </div>

        {user && (
          <span className="desktopOnly logoutBtn" onClick={handleLogout}>
            Logout
          </span>
        )}

        <div
          onClick={() => {
            if (user) {
              history.push('/create');
            } else {
              alert('you need to login first');
              history.push('/login');
            }
          }}
          className="desktopOnly sellMenu"
        >
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>

        <button
          className="mobileMenuBtn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      <div className="mobilePlaceWrapper">
        <div className="placeSearch mobilePlaceSearch">
          <Search />
          <input type="text" placeholder="Search city, area or locality" />
          <Arrow />
        </div>
      </div>

      {menuOpen && (
        <div className="mobileMenu">
          <div className="mobileMenuItem language">
            <span> ENGLISH </span>
            <Arrow />
          </div>

          <div className="mobileMenuItem loginPage">
            <span
              onClick={() => {
                if (!user) {
                  history.push('/login');
                  setMenuOpen(false);
                }
              }}
            >
              {user ? user.displayName || user.email : 'Login'}
            </span>
            <hr />
          </div>

          {user && (
            <div
              className="mobileMenuItem logoutBtn"
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
            >
              Logout
            </div>
          )}

          <div
            onClick={() => {
              if (user) {
                history.push('/create');
              } else {
                alert('you need to login first');
                history.push('/login');
              }
              setMenuOpen(false);
            }}
            className="mobileMenuItem mobileSellMenu"
          >
            <SellButton />
            <div className="sellMenuContent">
              <SellButtonPlus />
              <span>SELL</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;