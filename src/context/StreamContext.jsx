import React, {
  useContext,
  createContext,
  useMemo,
  useState,
  useRef,
} from "react";

const StreamContext = createContext(null);

const getUserStream = () => useContext(StreamContext);

const StreamProvider = ({ children }) => {
  // const [userLocalStream, setUserLocalStream] = useState(null);
  const userLocalStream = useRef(null);
  const [typeOfCall, setTypeOfCall] = useState("");
  const localStream = useMemo(() => ({ userLocalStream }), [userLocalStream]);
  const callType = useMemo(() => (typeOfCall, setTypeOfCall), [typeOfCall]);

  return (
    <StreamContext.Provider value={{ ...localStream, ...callType }}>
      {children}
    </StreamContext.Provider>
  );
};

export { getUserStream, StreamProvider };
