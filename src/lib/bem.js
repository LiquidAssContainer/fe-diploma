import { withNaming } from '@bem-react/classname';

const reactBemNaming = { e: '__', m: '_', v: '_' };

export const cn = withNaming(reactBemNaming);
