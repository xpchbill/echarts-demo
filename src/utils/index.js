import React from 'react';
import _omit from 'lodash.omit';
import _merge from 'lodash.merge';
import * as echarts from 'echarts/core';
import { TitleComponent } from 'echarts/components';
import flattenChildren from 'react-keyed-flatten-children';
import {
    symbols
} from '../constants';

console.log(symbols.series);

echarts.use([TitleComponent]);

export function is(element, name) {
    return element.type[symbols.typeKey] === Symbol.for(`$$${name}`);
}

export function isSeries(element) {
    return symbols.series.includes(element.type[symbols.typeKey]);
}

function isSeriesEmpty(series) {
    return (
        !series ||
        (series).every((serie) => {
            if (serie.type === 'sankey') {
                return (!serie.nodes || serie.nodes.length < 1) && (!serie.data || serie.data.length < 1);
            }

            return !serie.data || (serie.data).length < 1;
        })
    );
}

function isDatasetEmpty(dataset) {
    if (!dataset.source) {
        return true;
    }

    if (Array.isArray(dataset.source)) {
        return dataset.source.length < 1;
    }

    return Object.getOwnPropertyNames(dataset.source).length < 1;
}

export function isDataEmpty(option) {
    if (option.dataset) {
        return isDatasetEmpty(option.dataset);
    }

    return isSeriesEmpty(option.series);
}

export function excludeEchartsProps(props) {
    return _omit(props, ['option', 'locale', 'height', 'loading']);
}

export function createEChartsOptionFromChildren(
    children,
    _
) {
    const option = {};

    const validChildren = flattenChildren(children).filter((child) =>
        React.isValidElement(child)
    );

    const series = validChildren.filter((child) => {
        return (symbols).series.includes(child.type[symbols.typeKey]);
    });

    const context = {
        ..._,
        series,
    };

    validChildren.forEach((child) => {
        (child.type).tapEChartsOption && (child.type).tapEChartsOption(
            option,
            excludeEchartsProps(child.props),
            context
        );
    });

    return option;
}

export function transformTextOption(option, defaultOption) {
    if (option === undefined || option === true) {
      return defaultOption;
    }
    if (option === false) {
      return { show: false };
    }
    if (typeof option === 'function') {
      return {
        ...defaultOption,
        show: true,
        formatter: option,
      };
    }
    if (typeof option === 'object') {
      return _merge(
        {
          ...defaultOption,
          show: true,
        },
        option
      );
    }
    return {
      ...defaultOption,
      show: true,
      formatter() {
        return option;
      },
    };
  }

  export function randstr(length = 16) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  
    return text;
  }
  