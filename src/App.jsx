import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [cashiers, setCashiers] = useState([
    [100, 200, 300, 400],
    [20_000_000, 40],
    [40, 100, 50],
  ]);

  const [_input, setInput] = useState("");

  useEffect(() => {
    (async () => {
      for (let i = 0; i < cashiers.length; i++) {
        for (let j = 0; j < cashiers[i].length; j++) {
          cashiers[i][j] > 0 && cashiers[i][j]--;
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(cashiers);
      setCashiers([...cashiers]);
    })();
  });

  const displayAllCashiers = (theCashiers) => {
    const allCashiersDiv = [];
    for (let i = 0; i < theCashiers.length; i++) {
      allCashiersDiv.push(
        <div>
          <h1 className="border-2 rounded-xl p-2 mb-5">Chasier</h1>
          <div>
            {theCashiers[i].map((cashier, index) => {
              return (
                <div className="border-2 rounded-full w-10 h-10 mx-auto mb-2">
                  {cashier}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return allCashiersDiv;
  };

  const handleClick = (inp) => {
    // function sort_Array(arr) {
    //   let temp = 0;
    //   for (let i = 0; i < arr.length; i++) {
    //     for (let j = i + 1; j < arr.length; j++) {
    //       if (arr[i].length > arr[j].length) {
    //         [arr[i], arr[j]] = [arr[j], arr[i]];
    //       }
    //     }
    //   }
    //   return arr;
    // }
    // const newCopy = JSON.parse(JSON.stringify(sort_Array(cashiers)));
    // newCopy[0].push(parseInt(inp));
    // setCashiers(newCopy);

    for (let i = 0; i < cashiers.length; i++) {
      for (let j = i + 1; j < cashiers.length; j++) {
        if (
          cashiers[i].reduce((acc, current) => acc + current) >
          cashiers[j].reduce((acc, current) => acc + current)
        )
          [cashiers[i], cashiers[j]] = [cashiers[j], cashiers[i]];
      }
    }
    cashiers[0].push(parseInt(inp));
    setCashiers([...cashiers]);
  };

  return (
    <>
      <h1>React Cashier</h1>
      <input
        text="text"
        className="mb-10"
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <button onClick={() => handleClick(_input)}>send</button>
      <div>
        <div className="flex gap-6">{displayAllCashiers(cashiers)}</div>
      </div>
    </>
  );
}

export default App;
