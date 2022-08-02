import _merge from 'lodash.merge';
import { symbols } from '../constants';
import { transformTextOption } from '../utils';

const XAxis = () => null;

XAxis[symbols.typeKey] = symbols.xAxis;

XAxis.tapEChartsOption = (option, props, context) => {
  function getOption() {
    const { axisLabel, axisLine, splitLine, ...rest } = props;
    const { series } = context;

    return _merge(
      rest.type === 'category'
        ? {
            boundaryGap: !!series.find((comp) => comp.type[symbols.typeKey] === symbols.bars),
          }
        : {},
      {
        nameTextStyle: {
          fontSize: 12,
          color: '#575757',
        },
      },
      axisLabel
        ? {
            axisLabel: transformTextOption(axisLabel),
          }
        : {},
      typeof axisLine === 'boolean'
        ? {
            axisLine: {
              show: axisLine,
            },
          }
        : axisLine,
      typeof splitLine === 'boolean'
        ? {
            splitLine: {
              show: splitLine,
            },
          }
        : splitLine,
      rest
    );
  }

  const xAxisOption = getOption();

  if (!option.xAxis) {
    option.xAxis = xAxisOption;
  } else if (!Array.isArray(option.xAxis)) {
    option.xAxis = [option.xAxis, xAxisOption];
  } else {
    (option.xAxis).push(xAxisOption);
  }
};

if (process.env.NODE_ENV !== 'production') {
  XAxis.displayName = 'XAxis';
}

export default XAxis;