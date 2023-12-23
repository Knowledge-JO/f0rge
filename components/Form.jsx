import FormCounter from "./forms/FormCounter";
import Form1 from "./forms/Form1";
import Form2 from "./forms/Form2";
import Form3 from "./forms/Form3";
import Form4 from "./forms/Form4";
import Button from "./Button";
import { useReducer, useState } from "react";

// import Success from "./forms/Success";

// create useReducer hook here to manage state for the entire form so as to prevent clearing of state when a form component is unmounted.

const initialState = {
  sliderState1: false,
  sliderState2: false,
  sliderState3: false,
  sliderState4: false,
  buyTaxSlide: false,
  sellTaxSlide: false,
  tokenName: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "slider1":
      return { ...state, sliderState1: !state.sliderState1 };
    case "slider2":
      return { ...state, sliderState2: !state.sliderState2 };
    case "slider3":
      return { ...state, sliderState3: !state.sliderState3 };
    case "slider4":
      return { ...state, sliderState4: !state.sliderState4 };
    case "buyTaxSlide":
      return { ...state, buyTaxSlide: !state.buyTaxSlide };
    case "sellTaxSlide":
      return { ...state, sellTaxSlide: !state.sellTaxSlide };
    default:
      return initialState;
  }
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formValue, setFormValue] = useState({
    name: "",
    symbol: "",
    supply: "",
    holdingCap: "",
    modeadd: "",
    sliderState1: state.sliderState1,
    sliderState2: state.sliderState2,
    sliderState3: state.sliderState3,
    sliderState4: state.sliderState4,
    buyTaxSlide: state.buyTaxSlide,
    sellTaxSlide: state.sellTaxSlide,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValue((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    forge();
  };

  const contractAddress = "0x44d03AD4c06ab3fCE68FF2552F18f9fd604Ec68e";

  const forge = async (event) => {
    event.preventDefault();

    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://sepolia.mode.network/"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      let receipt;
      const contract = new ethers.Contract(
        contractABI,
        contractAddress,
        signer
      );
      const forged = await contract.createToken(formValue);

      if (forged) {
        console.log("Token Forged");
      } else {
        console.log("Forging....");
      }

      const transaction = await contract.forge();

      receipt = await wait(transaction);

      console.log("Forging complete");
    } catch (error) {
      console.error(error.message, { variant: "error" });
      console.log("Failed, reason: ", error.message);
    }
  };

  const totalSteps = 4;
  const [currStep, setCurrStep] = useState(1);

  const handleNextStep = () => {
    if (currStep < totalSteps) setCurrStep((currStep) => currStep + 1);
  };

  const handlePreviousStep = () => {
    if (currStep > 1) setCurrStep((currStep) => currStep - 1);
  };

  return (
    <div className="mb-10">
      <FormCounter currStep={currStep} />
      {currStep === 1 && <Form1 />}
      {currStep === 2 && <Form2 state={state} dispatch={dispatch} />}
      {currStep === 3 && <Form3 state={state} dispatch={dispatch} />}
      {currStep === 4 && <Form4 state={state} dispatch={dispatch} />}
      {/* {currStep === 5 && <Success />} */}
      <Button
        onNextStep={handleNextStep}
        onPreviousStep={handlePreviousStep}
        currStep={currStep}
      />
    </div>
  );
};

export default Form;
