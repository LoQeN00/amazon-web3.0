import React, { useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { AmazonContext } from '../context/AmazonContext';
import Header from '../components/Header';
import Transaction from '../components/Transaction';

const styles = {
  container: `h-full w-full flex bg-[#fff]`,
  main: `w-full h-full flex flex-col mt-[50px]`,
  tableContainer: `w-full h-full flex flex-col p-[100px] justify-center`,
  pageTitle: `text-2xl font-bold text-left mt-[50px] mb-[30px]`,
  transactions: `flex gap-[50px] flex-row flex-wrap`,
};

const HistoryPage = () => {
  const { ownedItems } = useContext(AmazonContext);

  console.log(ownedItems);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <Header />
        <div className={styles.tableContainer}>
          {ownedItems ? (
            <div className={styles.pageTitle}>Purchase History</div>
          ) : (
            <div className={styles.pageTitle}>No purchase history</div>
          )}
          <div className={styles.transactions}>
            {ownedItems.map((item, index) => {
              return <Transaction item={item} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
