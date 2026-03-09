import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../store/FirebaseContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useHistory } from 'react-router-dom';

function Header() {
  const { user } = useContext(AuthContext);
  const history = useHistory();

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

        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
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

        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>

        <div className="loginPage">
          <span onClick={()=>{
            if(!user){
              history.push('/login')
            }
          }} >{user ? user.displayName || user.email : 'Login'}</span>
          <hr />
        </div>

        {user && <span onClick={handleLogout}>Logout</span>}

        <div onClick={()=>{
              if(user){
                history.push('/create')
              }else{
                alert("you need to login first")
                history.push('/login')
              }
            }}  className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;