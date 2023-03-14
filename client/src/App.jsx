import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [senderBalance, setSenderBalance] = useState(0);
  const [recipientBalance, setRecipientBalance] = useState(0);
  const [senderAddress, setSebnderAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");

  return (
    <>
      <div className="app">
        <div className="stacker">
          <Wallet
            headerText="Your Wallet"
            balance={senderBalance}
            setBalance={setSenderBalance}
            address={senderAddress}
            setAddress={setSebnderAddress}
          />
          <Wallet
            headerText="Recipient Wallet"
            balance={recipientBalance}
            setBalance={setRecipientBalance}
            address={recipientAddress}
            setAddress={setRecipientAddress}
          />
        </div>
        <Transfer
          setSenderBalance={setSenderBalance}
          senderAddress={senderAddress}
          recipientAddress={recipientAddress}
          setRecipientBalance={setRecipientBalance}
        />
      </div>
      <div className="app">
        <div className="container">
          <h3>Test key combos</h3>
          <div>private key: bd6986930e647a70fe6063cf9d2920dab004feda4271feb8f6f39825030310a2</div>
          <div>public key: f824130180eb6ba1f458417c45c2893d54f61c90</div>
          <br />
          <div>private key: 971b8589eef8c1d0182b489af1363cb918cfd5658017f3523ed91a308da58e80</div>
          <div>public key: 8e736268e1b49559f7fb26452f24e63abf3a217e</div>
          <br />
          <div>private key: fa3fab772625ff751ded2d0baf852da46f6422363d3619d13e8fa11effb83e82</div>
          <div>public key: 86bbcd9324041c3bbf56f6f66bf374a5943e3f2d</div>
        </div>
      </div>
    </>
  );
}

export default App;
