import React, { Children, cloneElement } from 'react';
import ECharts from './ECharts';
import XAxis from './XAxis';
import YAxis from './YAxis';
import Legend from './Legend';
import Tooltip from './Tooltip';
import Bars from './Bars';
import { is, isSeries } from '../utils';
import { EChartsContext } from '../constants';

const categoryAxisProps = {
  type: 'category',
  splitLine: false,
};

const valueAxisProps = {
  type: 'value',
};

/**
 * <ECharts>
 *   <XAxis />
 *   <YAxis />
 *   <Bars />
 *   <Tooltip />
 *   <Legend />
 * </ECharts>
 */
function BarChart(
  {
    name,
    data: inputData = [],
    tooltip = true,
    xAxis = true,
    yAxis = true,
    horizontal = false,
    legend = true,
    children,
    ...props
  },
  ref
) {
  function renderDefaultCategoryAxis() {
    const data = horizontal ? [...inputData].reverse() : inputData;
    const categories = data.map(([category]) => category);

    return horizontal ? (
      <YAxis {...categoryAxisProps} data={categories} />
    ) : (
      <XAxis {...categoryAxisProps} data={categories} />
    );
  }

  function renderDefaultValueAxis() {
    return horizontal ? (
      <XAxis {...valueAxisProps} show={xAxis} />
    ) : (
      <YAxis {...valueAxisProps} show={yAxis} />
    );
  }

  function renderDefaultSeries() {
    // 水平图表从上往下阅读则需将 data 翻转过来
    const data = horizontal ? [...inputData].reverse() : inputData;
    const values = data.map((d) => d[1]);

    return <Bars name={name} data={values} />;
  }

  const components = Children.toArray(children);
  const series = components.filter(isSeries);

  const data = horizontal ? [...inputData].reverse() : inputData;

  const categoryAxis = horizontal
    ? components.find((comp) => is(comp, 'yAxis'))
    : components.find((comp) => is(comp, 'xAxis'));

  const valueAxis = horizontal
    ? components.find((comp) => is(comp, 'xAxis'))
    : components.find((comp) => is(comp, 'yAxis'));

  return (
    <EChartsContext.Provider value={{ chartType: 'bar', horizontal }}>
      <ECharts ref={ref} {...props}>
        {!categoryAxis && renderDefaultCategoryAxis()}
        {!valueAxis && renderDefaultValueAxis()}
        {!components.find((comp) => is(comp, 'bars')) && renderDefaultSeries()}
        {legend && !components.find((comp) => is(comp, 'legend')) && <Legend />}
        {tooltip && <Tooltip />}
        {components.map((child) => {
          if (child.type === (horizontal ? YAxis : XAxis)) {
            return cloneElement(child, {
              ...categoryAxisProps,
              data: child.props.data || data.map(([category]) => category),
            });
          }
          if (child.type === (horizontal ? XAxis : YAxis)) {
            return cloneElement(child, valueAxisProps);
          }
          if (data.length && isSeries(child) && !child.props.data) {
            const serieIndex = series.indexOf(child);
            return cloneElement(child, { data: data.map((d) => d[serieIndex + 1]) });
          }
          return child;
        })}
      </ECharts>
    </EChartsContext.Provider>
  );
}

export default React.forwardRef(BarChart);