import { useEffect, useRef, useState } from "react";
import "./styles.css";

const OPT_LENGTH = 6;

export default function App() {
  const [inpArr, setInpArr] = useState(Array(OPT_LENGTH).fill(""));

  const inpRefArr = useRef([]);

  function handleOtpInput(value, index) {
    const newVal = value.trim();
    if (isNaN(newVal)) return;

    const newInpArr = [...inpArr];
    newInpArr[index] = newVal;
    setInpArr(newInpArr);

    if (newVal && index < OPT_LENGTH) {
      inpRefArr?.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && !inpArr[index]) {
      console.log(e.target.value, "e");
      inpRefArr?.current[index - 1]?.focus();
    }
  }

  async function handleOtpPaste() {
    const textPasted = await navigator.clipboard.readText();
    if (textPasted.length === OPT_LENGTH && !isNaN(textPasted)) {
      setInpArr(textPasted.split(""));
      inpRefArr?.current[OPT_LENGTH - 1]?.focus();
    }
  }

  useEffect(() => {
    inpRefArr?.current[0]?.focus();
  }, []);

  return (
    <div className="App">
      <h1>Opt Input</h1>

      <div className="otp-wrap">
        {inpArr.map((input, index) => (
          <input
            type="text"
            key={index}
            className="otp-inp"
            ref={(input) => (inpRefArr.current[index] = input)}
            value={inpArr[index]}
            onChange={(e) => handleOtpInput(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handleOtpPaste(e)}
            maxLength="1"
          />
        ))}
      </div>
    </div>
  );
}
