import React, { useContext, createContext, useMemo, useState } from "react";

const StreamContext = createContext(null);

const getUserStream = () => useContext(StreamContext);

const StreamProvider = ({ children }) => {
  const [userLocalStream, setUserLocalStream] = useState(null);
  const [typeOfCall, setTypeOfCall] = useState("");
  const localStream = useMemo(
    () => ({ userLocalStream, setUserLocalStream }),
    [userLocalStream]
  );
  const callType = useMemo(() => (typeOfCall, setTypeOfCall), [typeOfCall]);

  return (
    <StreamContext.Provider value={{ ...localStream, ...callType }}>
      {children}
    </StreamContext.Provider>
  );
};

export { getUserStream, StreamProvider };
