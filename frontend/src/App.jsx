import { useEffect, useState } from "react";
import {
  AppConfig,
  UserSession,
  showConnect,
  openContractCall,
} from "@stacks/connect";
import { StacksTestnet, StacksMocknet } from "@stacks/network";
import { principalCV, makeContractCall, callReadOnlyFunction, cvToJSON } from "@stacks/transactions";

function App() {
  const [message, setMessage] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [userData, setUserData] = useState(undefined);
  // const [netWork, setNetWork] = useState(new StacksMocknet({url: "https://api.platform.hiro.so/v1/ext/f183af312b00bacf5564a91d0c5f00a1/stacks-blockchain-api"}))

  // const netWork = new StacksMocknet({url: "https://api.platform.hiro.so/v1/ext/f183af312b00bacf5564a91d0c5f00a1/stacks-blockchain-api"});

  const appConfig = new AppConfig(["store_write"]);
  const userSession = new UserSession({ appConfig });
  const appDetails = {
    name: "Hello Stacks",
    icon: "https://freesvg.org/img/1541103084.png",
  };

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  console.log(userData);

  const connectWallet = () => {
    showConnect({
      appDetails,
      onFinish: () => window.location.reload(),
      userSession,
    });
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const submitMessage = async (e) => {
    e.preventDefault();

    const network = new StacksMocknet({url: "https://api.platform.hiro.so/v1/ext/f183af312b00bacf5564a91d0c5f00a1/stacks-blockchain-api"});

    const options = {
      contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      contractName: "bounter",
      functionName: "count-up",
      functionArgs: null,
      network,
      // appDetails,
      onFinish: ({ txId }) => console.log(txId),
    };

    await openContractCall(options);
  };

  const handleTransactionChange = (e) => {
    setTransactionId(e.target.value);
  };

  const retrieveMessage = async (e) => {
    // submit transaction
    e.preventDefault();

    const network = new StacksMocknet({url: "https://api.platform.hiro.so/v1/ext/f183af312b00bacf5564a91d0c5f00a1/stacks-blockchain-api"});

    const options = {
      contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      contractName: "bounter",
      functionName: "get-count",
      functionArgs: [principalCV(transactionId)],
      network,
      senderAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    };

    console.log(cvToJSON(await callReadOnlyFunction(options)));
  };

  const boost = async (e) => {
    // submit transaction
    e.preventDefault();

    const network = new StacksMocknet({url: "https://api.platform.hiro.so/v1/ext/f183af312b00bacf5564a91d0c5f00a1/stacks-blockchain-api"});

    const options = {
      contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      contractName: "bounter",
      functionName: "add-2",
      functionArgs: [principalCV(transactionId)],
      network,
      senderAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    };

    await makeContractCall(options);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8">
      {!userData && (
        <button
          className="p-4 bg-indigo-500 rounded text-white"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
      <h1 className="text-6xl font-black">Hello Stacks</h1>
      {userData && (
        <div className="flex gap-4">
          <input
            className="p-4 border border-indigo-500 rounded"
            placeholder="Write message here..."
            onChange={handleMessageChange}
            value={message}
          />
          <button
            className="p-4 bg-indigo-500 rounded text-white"
            onClick={boost}
          >
            Submit New Message
          </button>
        </div>
      )}
      <div className="flex gap-4">
        <input
          className="p-4 border border-indigo-500 rounded"
          placeholder="Paste transaction ID to look up message"
          onChange={handleTransactionChange}
          value={transactionId}
        />
        <button
          className="p-4 bg-indigo-500 rounded text-white"
          onClick={retrieveMessage}
        >
          Retrieve Message
        </button>
      </div>
      {currentMessage.length > 0 ? (
        <p className="text-2xl">{currentMessage}</p>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;