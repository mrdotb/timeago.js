import en_short from './lang/en_short';

import { register } from './register';

register('en_short', en_short);

export { format } from './format';
export { render, cancel } from './realtime';
export { register };
export * from './interface';
