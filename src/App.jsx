import { useState, useEffect } from "react";

const BOX_DATA = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

import "./App.css";

function App() {
  const [boxData, setBoxData] = useState(BOX_DATA);
  const [clickOrder, setClickOrder] = useState([]);

  const handleClick = (row, col) => {
    setBoxData((prevState) => {
      return prevState.map((r, rowIndex) =>
        r.map((cell, colIndex) =>
          rowIndex === row && colIndex === col ? -1 : cell
        )
      );
    });

    setClickOrder((state) => [...state, [row, col]]);
  };

  useEffect(() => {
    const cellLeft = boxData.flatMap((row) => row).find((cell) => cell === 1);
    let timeoutIds = [];

    if (!cellLeft) {
      timeoutIds = clickOrder.map((key, index) => {
        return setTimeout(() => {
          const [row, col] = key;

          setBoxData((prevState) => {
            return prevState.map((r, rowIndex) =>
              r.map((cell, colIndex) =>
                rowIndex === row && colIndex === col ? 1 : cell
              )
            );
          });
        }, index * 500);
      });
    }

    return () => {
      console.log("HERE", timeoutIds);
      // timeoutIds.forEach(clearTimeout);
    };
  }, [boxData, setBoxData, clickOrder]);

  return (
    <div className="container">
      {boxData.map((row, rowIndex) =>
        row.map((cell, columnIndex) => {
          let cellClass = cell ? "cell" : "hidden";

          if (boxData[rowIndex][columnIndex] === -1) {
            cellClass += " active";
          }

          return (
            <div
              key={"key-" + rowIndex + columnIndex}
              className={cellClass}
              onClick={() => handleClick(rowIndex, columnIndex)}
            ></div>
          );
        })
      )}
    </div>
  );
}

export default App;
