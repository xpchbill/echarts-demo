import * as echarts from 'echarts/core';
import { LegendComponent } from 'echarts/components';
import _merge from 'lodash.merge';
import { symbols } from '../constants';

echarts.use([LegendComponent]);

const Legend = (_) => null;

Legend[symbols.typeKey] = symbols.legend;

Legend.tapEChartsOption = (option, props, context) => {
  function getOption() {
    const { chartType } = context;
    const legendOption = {
      show: true,
      bottom: 10,
    };

    if (chartType === 'pie') {
      legendOption.icon = 'circle';
    }
    return _merge(legendOption, props);
  }

  const legendOption = getOption();

  if (!option.legend) {
    option.legend = legendOption;
  } else if (!Array.isArray(option.legend)) {
    option.legend = [option.legend, legendOption];
  } else {
    (option.legend).push(legendOption);
  }
};

if (process.env.NODE_ENV !== 'production') {
  Legend.displayName = 'Legend';
}

export default Legend;