import { useState } from "react";

export const useDoneMessageHandling = () => {
  const [doneMessage, setDoneMessage] = useState(null);

  const showDoneMessage = (done) => {
    setDoneMessage(done);
    setTimeout(() => {
      setDoneMessage(null);
    }, 3000);
  };

  return [doneMessage, showDoneMessage];
};
