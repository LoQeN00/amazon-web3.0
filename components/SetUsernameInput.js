import React, { useContext } from 'react';
import { AmazonContext } from '../context/AmazonContext';

const styles = {
  usernameInput: `bg-transparent border-white border-2 rounded-lg w-[80%] py-2 px-4 text-lg mt-[20px] placeholder:text-white focus:outline-none flex justify-center items-center text-white`,
  username: `flex items-center w-full justify-center`,
  setNickname: `text-lg font-bold flex flex-1 items-center mt-[20px] mb-[20px] text-white`,
};

const SetUsernameInput = () => {
  const { nickname, setNickname, handleSetUsername } = useContext(AmazonContext);

  return (
    <>
      <div className={styles.username}>
        <input
          type="text"
          placeholder="Username"
          className={styles.usernameInput}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <button className={styles.setNickname} onClick={handleSetUsername}>
        Set Username
      </button>
    </>
  );
};

export default SetUsernameInput;
