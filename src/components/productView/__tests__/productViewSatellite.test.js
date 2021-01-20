import React from 'react';
import { shallow } from 'enzyme';
import { ProductViewSatellite } from '../productViewSatellite';
import { parseRowCellsListData } from '../../inventoryList/inventoryListHelpers';

describe('ProductViewSatellite Component', () => {
  it('should render a non-connected component', () => {
    const props = {
      routeDetail: {
        pathParameter: 'lorem ipsum',
        productParameter: 'dolor sit'
      }
    };

    const component = shallow(<ProductViewSatellite {...props} />);
    expect(component).toMatchSnapshot('non-connected');
  });

  it('should set product configuration', () => {
    const {
      initialGraphFilters,
      initialGuestsFilters,
      initialInventoryFilters,
      query
    } = ProductViewSatellite.defaultProps.productConfig;
    expect({ initialGraphFilters, initialGuestsFilters, initialInventoryFilters, query }).toMatchSnapshot(
      'initial configuration'
    );

    const inventoryData = {
      displayName: 'lorem',
      inventoryId: 'lorem inventory id',
      hardwareType: 'ipsum',
      measurementType: null,
      numberOfGuests: 3,
      sockets: 10,
      cores: 12,
      lastSeen: 'lorem date obj',
      loremIpsum: 'hello world'
    };

    const filteredInventoryData = parseRowCellsListData({
      filters: initialInventoryFilters,
      cellData: inventoryData
    });

    expect(filteredInventoryData).toMatchSnapshot('filteredInventoryData results');

    const filteredInventoryDataAuthorized = parseRowCellsListData({
      filters: initialInventoryFilters,
      cellData: inventoryData,
      session: { authorized: { inventory: true } }
    });

    expect(filteredInventoryDataAuthorized).toMatchSnapshot('filteredInventoryData results, authorized');

    const guestsData = {
      displayName: 'lorem',
      inventoryId: 'lorem inventory id',
      subscriptionManagerId: 'lorem subscription id',
      lastSeen: 'lorem date obj',
      loremIpsum: 'hello world'
    };

    const filteredGuestsData = parseRowCellsListData({
      filters: initialGuestsFilters,
      cellData: guestsData
    });

    expect(filteredGuestsData).toMatchSnapshot('filteredGuestsData results');

    const filteredGuestsDataAuthorized = parseRowCellsListData({
      filters: initialGuestsFilters,
      cellData: guestsData,
      session: { authorized: { inventory: true } }
    });

    expect(filteredGuestsDataAuthorized).toMatchSnapshot('filteredGuestsData results, authorized');
  });
});