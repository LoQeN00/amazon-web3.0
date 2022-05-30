import React from 'react';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';

const styles = {
  container: `w-full h-full flex bg-[#fff]`,
};

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <Main />
    </div>
  );
};

export default HomePage;
