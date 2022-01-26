import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    replace ? setHistory(history) : setHistory((prev) => [...prev, newMode]);
  };

  const back = () => {
    if (history.length === 1) return;

    let copyHistory = history;
    copyHistory.pop();
    setMode(copyHistory[copyHistory.length - 1]);
    setHistory(copyHistory);
  };

  return { mode, transition, back };
}
