
import { render, waitFor } from '@testing-library/react';
import MapBox from './MapBox';

describe('MapBox', () => {
  it('renders without crashing', async () => {
    const { container } = render(<MapBox />);

    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });
});