import React, { useState } from "react";

interface SlippageModalProps {
  onClose: () => void;
  setSlippage: (value: string) => void;
}

const SlippageModal: React.FC<SlippageModalProps> = ({
  onClose,
  setSlippage,
}) => {
  const [customSlippage, setCustomSlippage] = useState("");

  const handleCustomSlippageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value, 10) * 100;
    setCustomSlippage(e.target.value);
    setSlippage(value.toString());
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 w-full backdrop-blur-sm">
      <div className="flex flex-col justify-between w-full max-w-md bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-white">
            Swap Slippage Tolerance
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2">
              {[0.1, 0.5, 1].map((item: number) => (
                <button
                  key={item}
                  className="px-4 py-2 bg-blue-500 rounded-full text-white hover:bg-blue-600"
                  onClick={() => setSlippage(item)}
                >
                  {item}%
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <h2 className="text-white">Custom</h2>
            <input
              type="number"
              value={customSlippage}
              className="border p-2 bg-gray-700 rounded-full w-24 text-center text-white"
              onChange={handleCustomSlippageChange}
              placeholder="0.0"
            />
            <h2 className="text-white">%</h2>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full rounded-lg bg-blue-500 p-2 mt-6 text-white hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SlippageModal;
