

import AppBar from 'components/UI/AppBar';
import HamburgerButton from 'components/UI/HamburgerButton';
import SearchBar from 'containers/SearchBar';
import AuthButton from 'containers/AuthButton';
import ProfilePhoto from 'containers/ProfilePhoto';

const BurgerHeader = ({ openMenu }) => (
  <>
    <AppBar>
      <HamburgerButton onClick={openMenu} />
      <div className='sticky-bar-widgets-container'>
        <SearchBar id='mobile' />
        <ProfilePhoto size='32' />
        <AuthButton />
      </div>
    </AppBar>
    <style jsx>{`
      .sticky-bar-widgets-container {
        display: flex;
        align-items: center;
      }

      .sticky-bar-widgets-container > :global(*:not(:first-child)) {
        margin-left: 8px;
      }
    `}</style>
  </>
);

export default BurgerHeader;
