import React from 'react'

type Props = {}

const Buggy = () => {
    const [count, setCount] = React.useState(0);
  
    const increaseCounter = () => {
      setCount(preVal => preVal + 1);
    }
      if(count === 5) {
        throw new Error("Crashing the app!!");
      }
  
    return (
      <>
        <div className="counter--block">
          <span>Counter</span>
          <span>{count}</span>
        </div>
        <button onClick={increaseCounter}>Increase count</button>
        </>
    );
  }
export default Buggy