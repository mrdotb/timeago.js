/**
 * Created by hustcc on 18/5/20.
 * Contract: i@hust.cc
 */

import {
  formatDiff,
  diffSec,
  nextInterval,
  setTidAttr
} from './helper';

import { run } from './timer';

export class TimeAgo {
  constructor(nowDate, defaultLocale = 'en') {
    this.nowDate = nowDate;
    this.defaultLocale = defaultLocale;
  }

  setLocale(locale) {
    this.defaultLocale = locale;
  }

  /**
   * render 定期器渲染
   * @param node
   * @param date
   * @param locale
   */
  doRender(node, date, locale) {
    // delete previously assigned timeout's id to node
    node.innerHTML = this.format(date, locale);

    // waiting %s seconds, do the next render
    const tid = run(() => {
      this.doRender(node, date, locale);
    }, Math.min(nextInterval(diff) * 1000, 0x7FFFFFFF));

    // set attribute date-tid
    setTidAttr(node, tid);
  }

  /**
   * render: render the DOM real-time.
   * - nodes: which nodes will be rendered.
   * - locale: the locale name used to format date.
   *
   * How to use it?
   * var timeago = require('timeago.js')();
   * // 1. javascript selector
   * timeago.render(document.querySelectorAll('.need_to_be_rendered'));
   * // 2. use jQuery selector
   * timeago.render($('.need_to_be_rendered'), 'pl');
   *
   * Notice: please be sure the dom has attribute `datetime`.
   */
  render(nodes, locale) {
    const nodeArr = Array.isArray(nodes) ? nodes : [nodes];

    for (const node of nodeArr) {
      this.doRender(node, getDateAttr(node), locale); // render item
    }
  }

  /**
   * format: format the date to *** time ago, with setting or default locale
   * - date: the date / string / timestamp to be formatted
   * - locale: the formatted string's locale name, e.g. en / zh_CN
   *
   * How to use it?
   * var timeago = require('timeago.js')();
   * timeago.format(new Date(), 'pl'); // Date instance
   * timeago.format('2016-09-10', 'fr'); // formated date string
   * timeago.format(1473473400269); // timestamp with ms
   */
  format(date, locale) {
    return formatDiff(diffSec(date, this.nowDate), locale, this.defaultLocale);
  }
}