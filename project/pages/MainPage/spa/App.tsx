import { Routes, Route, Link } from 'react-router-dom';
import { BuyoutsScreen } from './screens/BuyoutsScreen';
import { SuppliersScreen } from './screens/SuppliersScreen';

const URI = {
    suppliers: '/suppliers',
    buyouts: '/buyouts',
};

export function App() {
    return (
        <>
            <nav>
                <Link to={URI.suppliers}>Закупщики</Link>
                <Link to={URI.buyouts}>Выкупы</Link>
            </nav>
            <Routes>
                <Route path={URI.suppliers} element={<SuppliersScreen />} />
                <Route path={URI.buyouts} element={<BuyoutsScreen />} />
            </Routes>
        </>
    );
}
