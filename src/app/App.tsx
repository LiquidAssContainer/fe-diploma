import './index.sass';

import { FC } from 'react';

import { Routing } from 'pages';
import { Modal } from 'entities/modal';
import { Footer } from 'widgets/footer';

import { withProviders } from './providers';

export const App: FC = withProviders(() => {
  return (
    <>
      <Routing />
      <Footer />
      {/* <Modal onClose={modalModel.closeModal()} {...modal} /> */}
      <Modal />
    </>
  );
});
