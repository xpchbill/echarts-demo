import _merge from 'lodash.merge';
import { symbols } from '../constants';
import { transformTextOption } from '../utils';


const YAxis = (_) => null;

YAxis.defaultProps = {
  show: true,
  type: 'value',
};
YAxis[symbols.typeKey] = symbols.yAxis;

YAxis.tapEChartsOption = (option, props) => {
  function getOption() {
    const { name, axisLabel, axisLine, splitLine, transposeNameText = false, ...rest } = props;

    return _merge(
      {
        name,
        nameTextStyle: {
          fontSize: 12,
          color: '#575757',
        },
      },
      name && rest.nameLocation === 'middle' && transposeNameText
        ? {
            nameRotate: 0,
            name: name.split('').join('\n'),
          }
        : {},
      typeof axisLine === 'boolean'
        ? {
            axisLine: {
              show: axisLine,
            },
          }
        : axisLine,
      typeof splitLine !== 'undefined'
        ? {
            splitLine: _merge(
              {
                show: !!splitLine,
              },
              typeof splitLine !== 'boolean' && splitLine
            ),
          }
        : {},
      axisLabel
        ? {
            axisLabel: transformTextOption(axisLabel),
          }
        : {},
      rest
    );
  }

  const yAxisOption = getOption();

  if (!option.yAxis) {
    option.yAxis = yAxisOption;
  } else if (!Array.isArray(option.yAxis)) {
    option.yAxis = [option.yAxis, yAxisOption];
  } else {
    (option.yAxis).push(yAxisOption);
  }
};

if (process.env.NODE_ENV !== 'production') {
  YAxis.displayName = 'YAxis';
}

export default YAxis;