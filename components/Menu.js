import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/amazon_logo.png';
import logoFull from '../assets/amazon_logo_full.png';
import { FaBox } from 'react-icons/fa';
import { BsFillBookmarkFill, BsFillPersonFill } from 'react-icons/bs';
import { AiOutlineHistory } from 'react-icons/ai';

const styles = {
  menu: `flex flex-col w-full h-full px-10 gap-10`,
  menuItem: `flex items-center text-lg font-bold cursor-pointer gap-2`,
};

const Menu = () => {
  return (
    <div className={styles.menu}>
      <Link href="/">
        <div className={styles.menuItem}>
          <Image src={logo} height={30} width={30} className={styles.amazonLogo} alt="amazon logo" />
          My Amazon board
        </div>
      </Link>
      <div className={styles.menuItem}>
        <FaBox />
        Collections
      </div>
      <div className={styles.menuItem}>
        <BsFillBookmarkFill />
        Saved
      </div>
      <div className={styles.menuItem}>
        <BsFillPersonFill />
        Collections
      </div>
      <div className={styles.menuItem}>
        <FaBox />
        Collections
      </div>
      <Link href="/history">
        <div className={styles.menuItem}>
          <AiOutlineHistory />
          Transactions
        </div>
      </Link>
    </div>
  );
};

export default Menu;
