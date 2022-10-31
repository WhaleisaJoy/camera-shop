import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { BreadcrumbsSettings } from '../../database';
import { makeFakeCamera } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import Breadcrumbs from './breadcrumbs';

const history = createMemoryHistory();

describe('Component: Breadcrumbs', () => {
  it('should render correctly if CatalogPage is open', () => {
    const fakeBreadcrumbsSettings = [BreadcrumbsSettings.Root, BreadcrumbsSettings.Catalog];

    render(
      <HistoryRouter history={history}>
        <Breadcrumbs settings={fakeBreadcrumbsSettings} />
      </HistoryRouter>
    );

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });

  it('should render correctly if ProductPage is open', () => {
    const fakeCamera = makeFakeCamera();
    const fakeBreadcrumbsSettings = [BreadcrumbsSettings.Root, BreadcrumbsSettings.Catalog, { Name: fakeCamera.name }];

    render(
      <HistoryRouter history={history}>
        <Breadcrumbs settings={fakeBreadcrumbsSettings} />
      </HistoryRouter>
    );

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.name)).toBeInTheDocument();
  });
});
