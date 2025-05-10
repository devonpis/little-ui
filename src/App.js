import React, { useEffect, useState, useCallback } from "react";
import "./App.css";

const chartData = [
  { id: "dep-1", name: "Legal", ticketCount: 32, color: "#3F888F" },
  { id: "dep-2", name: "Sales", ticketCount: 20, color: "#FFA420" },
  { id: "dep-3", name: "Engineering", ticketCount: 60, color: "#287233" },
  { id: "dep-4", name: "Manufacturing", ticketCount: 5, color: "#4E5452" },
  { id: "dep-5", name: "Maintenance", ticketCount: 14, color: "#642424" },
  {
    id: "dep-6",
    name: "Human Resourcing",
    ticketCount: 35,
    color: "#1D1E33",
  },
  { id: "dep-7", name: "Events", ticketCount: 43, color: "#E1CC4F" },
];

const getData = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500, chartData);
  });

function BarChartContainer({ children }) {
  return <div className="bar-chart-container">{children}</div>;
}

function BarChartItem({ children, color, value, name, ticketCount }) {
  return (
    <div
      className="bar-chart-item"
      style={{ backgroundColor: color, height: `${value * 100}%` }}
      aria-label={`${name} ticketCount ${ticketCount}`}
      title={`${name} ticketCount ${ticketCount}`}
    ></div>
  );
}

function ChartControlContainer({ children }) {
  return children;
}

function App() {
  const time = new Date().toLocaleTimeString();
  const [order, setOrder] = useState("default");

  const sortedChartData = chartData.sort((a, b) => {
    switch (order) {
      case "acending":
        return a.ticketCount > b.ticketCount ? 1 : -1;
      case "decending":
        return a.ticketCount < b.ticketCount ? 1 : -1;
      default:
        return a.id > b.id ? 1 : -1;
    }
  });

  const highestTicketCount = chartData.reduce((acc, { ticketCount }) => {
    if (acc < ticketCount) return (acc = ticketCount);
    return acc;
  }, 0);

  console.log("sortedChartData", sortedChartData);

  const changeOrderHandler = (e) => {
    console.log("changeOrderHandler", e.target.value);
    setOrder(e.target.value);
  };

  return (
    <div className="master-layout">
      <a href="#content" id="skip-to-content">
        skip to content
      </a>
      <h1 id="header">Atlassian Coding Interview Environment</h1>
      <p>Loaded time: {time}</p>
      <main id="content">
        <ChartControlContainer>
          <select onChange={changeOrderHandler}>
            <option value="default">Default</option>
            <option value="acending">Acending</option>
            <option value="decending">Decending</option>
          </select>
        </ChartControlContainer>

        <ChartControlContainer />
        <BarChartContainer>
          {sortedChartData.map(({ id, color, ticketCount, name }) => (
            <BarChartItem
              key={id}
              color={color}
              value={ticketCount / highestTicketCount}
              name={name}
              ticketCount={ticketCount}
            />
          ))}
        </BarChartContainer>
      </main>
    </div>
  );
}

export default App;
