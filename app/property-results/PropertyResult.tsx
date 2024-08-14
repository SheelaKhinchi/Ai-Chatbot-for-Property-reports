// app/property-results/page.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PropertyResults.module.css';

interface PropertyData {
  id: string;
  name: string;
  location: string;
  price: number;
  description: string;
  imageUrl: string;
}

const PropertyResults: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const [response, setResponse] = useState<PropertyData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      axios.get(`/api/property?query=${query}`)
        .then(res => {
          setResponse(res.data);
          setError(null);
        })
        .catch(err => {
          setResponse(null);
          if (axios.isAxiosError(err) && err.response) {
            setError(`API Error: ${err.response.data.error}`);
          } else {
            setError('Error fetching property data');
          }
        });
    }
  }, [query]);

  if (!query) {
    return <p>No query provided.</p>;
  }

  return (
    <div className={styles.resultsContainer}>
      {error && <p className={styles.error}>{error}</p>}
      {response && response.length > 0 ? (
        <ul className={styles.propertyList}>
          {response.map(property => (
            <li key={property.id} className={styles.propertyItem}>
              <img src={property.imageUrl} alt={property.name} className={styles.propertyImage} />
              <h2>{property.name}</h2>
              <p>Location: {property.location}</p>
              <p>Price: ${property.price}</p>
              <p>{property.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No properties found.</p>
      )}
    </div>
  );
};

export default PropertyResults;
