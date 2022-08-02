import YAxis from './components/YAxis';
import Bars from './components/Bars';
import BarChart from './components/BarChart';

function App() {
  const data = [
    [
      "2018-03",
      0,
      980000,
      0,
      0,
      0,
      0
    ],
    [
      "2018-04",
      800000,
      780000,
      0,
      180000,
      0,
      0
    ],
    [
      "2018-05",
      750000,
      730000,
      0,
      180000,
      0,
      0
    ],
    [
      "2018-06",
      730000,
      680000,
      80000,
      180000,
      270000,
      180000
    ],
    [
      "2018-07",
      730000,
      680000,
      80000,
      180000,
      270000,
      180000
    ],
    [
      "2018-08",
      730000,
      680000,
      80000,
      180000,
      270000,
      180000
    ]
  ];

  return (
    <div className="App">
        <input />
        <BarChart data={data}>
          <YAxis axisLabel={value => `${value / 1000}K`} minInterval={500000} splitLine={false} />
          <Bars name="休眠客户" />
          <Bars name="新客" />
          <Bars name="非品牌用户" />
          <Bars name="老客" />
          <Bars name="流失至竞品" />
          <Bars name="来自竞品" />
        </BarChart>
    </div>
  );
}

export default App;
