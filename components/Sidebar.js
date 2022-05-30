import React, { useContext } from 'react';
import { ConnectButton } from 'web3uikit';
import Image from 'next/image';
import SetUsernameInput from './SetUsernameInput';
import Menu from './Menu';
import { AmazonContext } from '../context/AmazonContext';

const styles = {
  container: `h-full w-[300px] flex flex-col bg-[#fff] static`,
  profile: ` w-full py-16 flex flex-col justify-center items-center rounded-r-3xl bg-gradient-to-t from-[#0d141c] to-[#42667e] mt-[40px] mb-[50px] border-2 border-[#fb9701]`,
  profilePicContainer: `flex  rounded-xl items-center justify-center w-full h-full mb-5`,
  profilePic: `rounded-3xl object-cover`,
  welcome: ` text-md mb-2 font-bold text-2xl text-white`,
  walletAddress: `text-xl flex w-full justify-center font-extrabold mb-4`,

  amazonLogo: `mr-4 flex object-cover`,
  companyName: `text-lg font-bold flex flex-1 pl-10 items-center mt-[20px]`,
};

const Sidebar = () => {
  const { isAuthenticated, username } = useContext(AmazonContext);

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        {isAuthenticated && (
          <>
            <div className={styles.profilePicContainer}>
              <Image
                alt="profile"
                src={`https://avatars.dicebear.com/api/pixel-art/${username}.svg`}
                className={styles.profilePic}
                height={100}
                width={100}
              />
            </div>
            {!username ? (
              <SetUsernameInput />
            ) : (
              <div>
                <div className={styles.welcome}>Welcome {username} </div>
              </div>
            )}
          </>
        )}
        <div className={styles.connectButton}>
          <ConnectButton />
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default Sidebar;
