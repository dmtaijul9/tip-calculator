import React, { useState } from "react";
import "antd/dist/antd.css";
import { InputNumber, Select, Button, Spin, notification, Divider } from "antd";
import "./App.css";
import { RadiusUpleftOutlined } from "@ant-design/icons";

const { Option } = Select;

function App() {
  const [display, setDisplay] = useState(true);
  const [loading, setLoading] = useState(false);
  const [eachOutput, setEachOutput] = useState(0);
  const [output, setOutput] = useState(0);
  const [totalBil, setTotalBil] = useState(0);
  const [rating, setRating] = useState(0);
  const [people, setPeople] = useState(0);

  const openNotification = placement => {
    notification.info({
      message: `Tip Calculator`,
      description:
        "Please input all the fields",
      placement
    });
    setOutput(0);
    setEachOutput(0);
    setDisplay(true);
  };

  function handleChange(value) {
    setRating(value);
  }


  const calculatingHandler = () => {
    const total = Number(totalBil);
    const rat = Number(rating);
    const peop = Number(people);

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setDisplay(false);

      if (total === 0 || rat === 0 || peop === 0) {
        openNotification('topLeft')
      } else {
        const result = (total * (rat / 100)) / peop;
        const eachResult = result / peop;

        setOutput(result.toFixed(2));
        setEachOutput(eachResult.toFixed(2));

        setTotalBil(0);
        setRating(0);
        setPeople(0);
      }
    }, 1000);
  };

  const totalBilHandling = value => {
    setTotalBil(value);
  };

  const peopleHandling = value => {
    setPeople(value);
  };

  const displayCondition = (
    <div>
      {display ? (
        <div className="display">
          <h1>Welcome to my application</h1>
        </div>
      ) : (
        <div className="display">
          <div className="total-tip">
            <h1>TOTAL TIP AMOUNT:</h1>
            <h1 className="dolar">$ {output}</h1>
          </div>
          <div className="total-tip">
            <h1>TIP AMOUNT FOR EACH:</h1>
            <h1 className="dolar">$ {eachOutput}</h1>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="App">
      <section className="calculating-area">
        <header className="header">
          <h1>Tip calculator</h1>
        </header>
        {loading ? (
          <div className="display">
            <Spin />
          </div>
        ) : (
          displayCondition
        )}
        <hr />
        <div className="calculating">
          <div className="total">
            <p>How much was your bill? :</p>
            <h1>
              $ <InputNumber value={totalBil} onChange={totalBilHandling} />
            </h1>
          </div>
          <div className="rating">
            <p>How was your service? :</p>
            <Select
              defaultValue="Select one"
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Option value="30">Outstanding</Option>
              <Option value="20">Good</Option>
              <Option value="15">It was OK</Option>
              <Option value="10">Bad</Option>
              <Option value="5">Terrible</Option>
            </Select>
          </div>
          <div className="people">
            <p>How many people are sharing the bill? :</p>
            <InputNumber value={people} onChange={peopleHandling} />
          </div>
          <div>
            <Button type="primary" onClick={calculatingHandler} block>
              CALCULATE !
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
