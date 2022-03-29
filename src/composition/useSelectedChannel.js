import { useEffect, useState } from "react";
import { CHANNEL } from "../constants";
import { createReactive } from "./lib";

const channelGlobal = createReactive(
  JSON.parse(localStorage.getItem(CHANNEL)),
  (newValue) =>
    localStorage.setItem(CHANNEL, JSON.stringify(newValue))
);

function useSelectedChannel() {
  const [channel, setC] = useState(
    () => channelGlobal.ref.value
  );
  useEffect(
    () =>
      channelGlobal.addListener((newValue) => {
        setC(newValue);
      }),
    []
  );
  const setChannel = (channel) =>
    channelGlobal.setValue(channel);

  return {
    channel,
    setChannel,
  };
}
export default useSelectedChannel;
