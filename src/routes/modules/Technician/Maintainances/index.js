import React, { useEffect, useState } from 'react';
import PropertyDetail from './MaintainanceDetailView';
import PropertiesList from './MaintainanceList';
import Collapse from '@material-ui/core/Collapse';

const MaintainanceListing = () => {
  const propertiesList = [
    {
      id: 1,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'Luxury family home at beach side',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400 m2',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 26, 2020',
      availability: 'sale',
      isTrending: true,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'new_jersey',
    },
    {
      id: 2,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'Sunset view Apartment in Colarado',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400 m2',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 25, 2020',
      availability: 'rent',
      isTrending: false,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'colorado',
    },
    {
      id: 3,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'Best property in Albama',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400 m2',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 23, 2020',
      availability: 'rent',
      isTrending: false,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'albama',
    },
    {
      id: 4,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'Best house deal in New jersey',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400 m2',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 24, 2020',
      availability: 'sale',
      isTrending: false,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'new_jersey',
    },
    {
      id: 5,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'Luxury apartment in Colarado',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400 m2',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 28, 2020',
      availability: 'rent',
      isTrending: true,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'colorado',
    },
    {
      id: 6,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'Plot in Albama',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400 m2',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 29, 2020',
      availability: 'sale',
      isTrending: true,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'albama',
    },
    {
      id: 7,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'House in New jersey',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400 m2',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 24, 2020',
      availability: 'sale',
      isTrending: false,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'new_jersey',
    },
    {
      id: 8,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'Flat in Colarado',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400 m2',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 20, 2020',
      availability: 'rent',
      isTrending: true,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'colorado',
    },
    {
      id: 9,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: '3 BHK house in Albama',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400 m2',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 28, 2020',
      availability: 'sale',
      isTrending: false,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'albama',
    },
    {
      id: 10,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'Best house for family in New Jersey',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400 m2',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 26, 2020',
      availability: 'rent',
      isTrending: true,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'new_jersey',
    },
    {
      id: 11,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'Villa in Colarado',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400 m2',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 16, 2020',
      availability: 'rent',
      isTrending: true,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'colorado',
    },
    {
      id: 12,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'Sunrise view apartment in Albama',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400 m2',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 28, 2020',
      availability: 'sale',
      isTrending: false,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'albama',
    },
  ];

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [page, setPage] = useState(1);
  const [categoryData, setCategoryData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [tabValue, setTabValue] = useState('');

  useEffect(() => {
    setCategoryData(
      tabValue
        ? propertiesList.filter(item => item.category === tabValue).slice(0, page * 5)
        : propertiesList.slice(0, page * 5),
    );
  }, [tabValue, page]);

  const handlePageChange = () => {
    setPage(page + 1);
  };

  const onChangeTab = value => {
    setSearchText('');
    setPage(1);
    setTabValue(value);
  };

  const handleSearchTextChange = e => {
    setSearchText(e.target.value);
  };

  const getFilteredData = () => {
    if (searchText) {
      return categoryData.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));
    } else return categoryData;
  };

  const handlePropertyClick = property => setSelectedProperty(property);

  const showPropertyList = () => setSelectedProperty(null);

  const data = getFilteredData();

  return (
    <React.Fragment>
      <Collapse in={selectedProperty} timeout="auto" unmountOnExit>
        {selectedProperty && <PropertyDetail selectedProperty={selectedProperty} showPropertyList={showPropertyList} />}
      </Collapse>

      <Collapse in={!selectedProperty} timeout="auto" unmountOnExit>
        <PropertiesList
          onPropertyClick={handlePropertyClick}
          tabValue={tabValue}
          onChangeTab={onChangeTab}
          data={data}
          searchText={searchText}
          handleSearchTextChange={handleSearchTextChange}
          handlePageChange={handlePageChange}
        />
      </Collapse>

      {/*{selectedProperty ? (
        <PropertyDetail selectedProperty={selectedProperty} showPropertyList={showPropertyList} />
      ) : (
        <PropertiesList
          onPropertyClick={handlePropertyClick}
          tabValue={tabValue}
          onChangeTab={onChangeTab}
          data={data}
          searchText={searchText}
          handleSearchTextChange={handleSearchTextChange}
          handlePageChange={handlePageChange}
        />
      )}*/}
    </React.Fragment>
  );
};

export default MaintainanceListing;
