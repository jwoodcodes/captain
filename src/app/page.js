import ErrorBoundary from './components/ErrorBoundary';
import YourServerComponent from './components/YourServerComponent';

export default function Page() {
  return (
    <ErrorBoundary>
      {(setError) => (
        <YourServerComponent setError={setError} />
      )}
    </ErrorBoundary>
  );
}
