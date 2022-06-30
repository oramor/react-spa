import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './spa/App';

const container = document.querySelector('#app');
if (container) {
    const root = createRoot(container);
    root.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
    );
}
