import * as echarts from 'echarts/core';
import { TooltipComponent } from 'echarts/components';
import _merge from 'lodash.merge';
import { symbols } from '../constants';

echarts.use([TooltipComponent]);

const Tooltip = (_) => null;

Tooltip[symbols.typeKey] = symbols.tooltip;

Tooltip.tapEChartsOption = (option, props, context) => {
  function getOption() {
    const { chartType, series } = context;

    const hasAxis =
      chartType === 'bar' ||
      chartType === 'line' ||
      !!series.find(
        (comp) =>
          comp.type[symbols.typeKey] === symbols.xAxis ||
          comp.type[symbols.typeKey] === symbols.yAxis
      );

    return _merge(
      {
        show: true,
        // trigger: 'axis',
        trigger: hasAxis ? 'axis' : 'item',
        axisPointer: {
          type: 'shadow',
        },
      },
      props
    );
  }

  option.tooltip = getOption();
};

if (process.env.NODE_ENV !== 'production') {
  Tooltip.displayName = 'Tooltip';
}

export default Tooltip;