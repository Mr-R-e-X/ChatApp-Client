import { StunServer1, StunServer2, StunServer3 } from "../constants/config";

let peerConfiguration = {
  iceServers: [
    {
      urls: [StunServer1, StunServer3],
    },
  ],
};

export default peerConfiguration;
