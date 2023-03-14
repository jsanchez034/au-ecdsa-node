import { useState } from "react";
import clsx from 'clsx';

import server from "./server";
import { toHex } from "ethereum-cryptography/utils.js";
import hashMessage from './utils/hasMessage';

function Transfer({
  senderAddress,
  setSenderBalance,
  recipientAddress,
  setRecipientBalance
}) {
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [sendAmount, setSendAmount] = useState("");
  const [signature, setSignature] = useState("");
  const [recoveryBit, setRecoveryBit] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  const messsageToSign = `Send ${sendAmount} from ${senderAddress} to ${recipientAddress}`
  const hashedMessage = hashMessage(messsageToSign);
  const hashedMessageHex = toHex(hashedMessage);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      setIsSendingRequest(true);
      const {
        data: {
          senderBalance,
          recipientBalance
        },
      } = await server.post(`send`, {
        sender: senderAddress,
        amount: parseInt(sendAmount),
        recipient: recipientAddress,
        hashedMessage: hashedMessageHex,
        signature,
        recoveryBit
      });
      setSenderBalance(senderBalance);
      setRecipientBalance(recipientBalance)

      alert('Transaction Complete!');
    } catch (ex) {
      alert(ex.response.data.message);
    } finally {
      setIsSendingRequest(false);
    }
  }

  const inputClasses = clsx('button', {
    'loading' : isSendingRequest
  });

  const onCopyTranHash = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const body = document.querySelector('body');
    const paragraph = document.querySelector('#txhash');
    const area = document.createElement('textarea');
    body.appendChild(area);

    area.value = paragraph.innerText;
    area.select();
    document.execCommand("copy");

    body.removeChild(area);
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Transaction Message
        <p>{messsageToSign}</p>
      </label>

      <label>
        Transaction Message Hash To Sign
        <div className="copyTranHashWrap">
          <p id="txhash">{hashedMessageHex}</p>
          <button onClick={onCopyTranHash}>📋</button>
        </div>
      </label>

      <label>
        Transaction Message Signature
        <input value={signature} onChange={setValue(setSignature)}></input>
      </label>

      <label>
        Signature Recovery Bit
        <input value={recoveryBit} onChange={setValue(setRecoveryBit)}></input>
      </label>

      <input disabled={isSendingRequest} className={inputClasses} type="submit" value={isSendingRequest ? '...' : 'Transfer'} />
    </form>
  );
}

export default Transfer;
