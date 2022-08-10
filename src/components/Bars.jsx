import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import _merge from 'lodash.merge';
import { symbols } from '../constants';
import { randstr, transformTextOption } from '../utils';

echarts.use([BarChart]);


const Bars = () => null;

const defaultBarsStackKey = randstr();

Bars[symbols.typeKey] = symbols.bars;
Bars.tapEChartsOption = (option, props, context) => {
  function getSeriesOption() {
    const { stack, color, label, ...rest } = props;
    const { chartType, horizontal, series } = context;

    const barsSeriesCount = series.filter(
      (comp) => comp.type[symbols.typeKey] === symbols.bars
    ).length;
    const stackedBars = stack
      ? series.filter(
          (comp) => comp.type[symbols.typeKey] === symbols.bars && comp.props.stack === stack
        )
      : [];
    const stacked = stackedBars.length > 1;
    const stackTop =
      stackedBars.findIndex(
        (comp) => comp.type[symbols.typeKey] === symbols.bars && comp.props.name === rest.name
      ) ===
      stackedBars.length - 1;

    let borderRadius;
    if (stacked && !stackTop) {
      borderRadius = 0;
    } else {
      borderRadius = chartType === 'bar' && horizontal ? [0, 5, 5, 0] : [5, 5, 0, 0];
    }

    return _merge(
      {
        type: 'bar',
        // barWidth: (!stack && barsSeriesCount) > 1 ? 6 : 20,
        stack: typeof stack === 'boolean' ? defaultBarsStackKey : stack,
        itemStyle: {
          color: Array.isArray(color) ? ({ dataIndex }) => color[dataIndex] : color,
          borderRadius,
        },
        // 默认 label
        // 位置：top，水平则 right
        label: transformTextOption(label, {
          position: horizontal ? 'right' : 'top',
        }),
      },
      rest
    );
  }

  if (!option.series) {
    option.series = [];
  }

  (option.series).push(getSeriesOption());
};

if (process.env.NODE_ENV !== 'production') {
  Bars.displayName = 'Bars';
}

export default Bars;