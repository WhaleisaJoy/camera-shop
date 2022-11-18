import Loader from '../../components/loader/loader';

function LoadingPage(): JSX.Element {
  return (
    <main>
      <div className="page-content">
        <Loader />
      </div>
    </main>
  );
}

export default LoadingPage;
