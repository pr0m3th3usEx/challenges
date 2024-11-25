import AppLayout from './components/layouts/AppLayout';
import DatasetProvider from './contexts/DatasetProvider';
import DatasetManager from './DatasetManager';
import DatasetSelectedGuard from './guards/DatasetSelectedGuard';

function App() {
  return (
    <DatasetProvider>
      <AppLayout>
        <DatasetSelectedGuard>
          <DatasetManager />
        </DatasetSelectedGuard>
      </AppLayout>
    </DatasetProvider>
  );
}

export default App;
