import { createContext, useState, useEffect, useCallback } from 'react';
import { useMoralis, useMoralisQuery } from 'react-moralis';
import { amazonAbi, amazonCoinAddress } from '../lib/constants';
import { ethers } from 'ethers';

export const AmazonContext = createContext();

export const AmazonProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [assets, setAssets] = useState([]);
  const [currentAccount, setCurrentAccount] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [amountDue, setAmountDue] = useState('');
  const [etherscanLink, setEtherscanLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState('');
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [ownedItems, setOwnedItems] = useState([]);

  const { authenticate, isAuthenticated, enableWeb3, Moralis, user, isWeb3Enabled, logout } = useMoralis();

  const { data: assetsData, error: assetsDataError, isLoading: assetsDataLoading } = useMoralisQuery('assets');

  const { data: userData, error: userDataError, isLoading: userDataIsLoading } = useMoralisQuery('_User');

  const getBalance = useCallback(async () => {
    try {
      if (!isAuthenticated || !currentAccount) return;

      const options = {
        contractAddress: amazonCoinAddress,
        functionName: 'balanceOf',
        abi: amazonAbi,
        params: {
          account: currentAccount,
        },
      };

      if (isWeb3Enabled) {
        const response = await Moralis.executeFunction(options);
        setBalance(response.toString());
      }
    } catch (e) {
      console.log(e);
    }
  }, [currentAccount, isAuthenticated, isWeb3Enabled, Moralis]);

  const getOwnedAssets = useCallback(async () => {
    try {
      if (userData[0]) {
        setOwnedItems((prevItems) => [...prevItems, userData[0].attributes.ownedAssets]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [userData]);

  const buyAsset = async (price, asset) => {
    try {
      if (!isAuthenticated) return;

      const options = {
        type: 'erc20',
        amount: price,
        receiver: amazonCoinAddress,
        contractAddress: amazonCoinAddress,
      };

      let transaction = await Moralis.transfer(options);
      const receipt = await transaction.wait();

      if (receipt) {
        const res = userData[0].add('ownedAssets', {
          ...asset,
          purchaseDate: Date.now(),
          etherscanLink: `https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`,
        });

        await res.save();
        alert('You have successfully purchased this asset!');
        await getBalance();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buyTokens = async () => {
    if (!isAuthenticated) {
      await connectWallet();
    }

    const amount = ethers.BigNumber.from(tokenAmount);
    const price = ethers.BigNumber.from('100000000000000');
    const calcPrice = amount.mul(price);

    console.log(amazonCoinAddress);

    let options = {
      contractAddress: amazonCoinAddress,
      functionName: 'mint',
      abi: amazonAbi,
      msgValue: calcPrice,
      params: {
        amount,
      },
    };
    const transaction = await Moralis.executeFunction(options);
    const receipt = await transaction.wait();
    setIsLoading(false);
    console.log(receipt);
    setEtherscanLink(`https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`);
    await getBalance();
  };

  const handleSetUsername = () => {
    if (!user) return;

    if (!nickname) return;

    user.set('nickname', nickname);
    user.save();
    setUsername(nickname);
    setNickname('');
  };

  const listenToUpdates = useCallback(async () => {
    let query = new Moralis.Query('EthTransactions');
    let subscription = await query.subscribe();

    subscription.on('update', async (object) => {
      console.log('New transaction');
      console.log(object);
      setRecentTransactions([object]);
    });
  }, [Moralis.Query]);

  const getAssets = useCallback(async () => {
    try {
      await enableWeb3();
      setAssets(assetsData);
    } catch (e) {
      console.log(e);
    }
  }, [assetsData, enableWeb3]);

  useEffect(() => {
    const handleGetUserData = async () => {
      if (isAuthenticated) {
        await getBalance();
        await listenToUpdates();
        const currentUsername = await user?.get('nickname');

        setUsername(currentUsername);
        const account = await user?.get('ethAddress');
        setCurrentAccount(account);
      }
    };

    handleGetUserData();
  }, [isAuthenticated, user, username, currentAccount, getBalance, balance, listenToUpdates]);

  useEffect(() => {
    if (!isWeb3Enabled) return;
    if (assetsDataLoading) return;
    (async () => {
      await getAssets();
      await getOwnedAssets();
    })();
  }, [isWeb3Enabled, assetsDataLoading, getAssets, getOwnedAssets]);

  const value = {
    handleSetUsername,
    isAuthenticated,
    setNickname,
    nickname,
    username,
    setUsername,
    assets,
    balance,
    setTokenAmount,
    tokenAmount,
    amountDue,
    setAmountDue,
    isLoading,
    setIsLoading,
    setEtherscanLink,
    etherscanLink,
    currentAccount,
    buyTokens,
    buyAsset,
    recentTransactions,
    ownedItems,
  };

  return <AmazonContext.Provider value={value}>{children}</AmazonContext.Provider>;
};
