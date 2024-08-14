"use client"; // Only if you're using client-side rendering

import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import styles from '../app/MainContent.module.css'; // Adjust the path if necessary

const MainContent = () => {
    const router = useRouter(); // Initialize the router

    // Function to handle button clicks and navigate to property results page
    const handleButtonClick = (query: string) => {
        router.push(`/property-results?query=${encodeURIComponent(query)}`);
    };

    return (
        <main>
            <section className={styles.introSection}>
                <h1>Welcome to the Next.js Real Estate App!</h1>
                <p>This is a comprehensive real estate platform built with Next.js. It allows you to explore property listings, get market insights, and find your dream home.</p>
                <p>Our platform offers dynamic property search capabilities, including detailed information about listings and trends in various locations.</p>
            </section>
            <section className={styles.actionsSection}>
                <div className={styles.actionButtons}>
                    <button onClick={() => handleButtonClick('Downtown Chicago')}>Find properties in <br /> Downtown Chicago</button>
                    <button onClick={() => handleButtonClick('Luxury Homes')}>Explore luxury homes <br /> in your area</button>
                    <button onClick={() => handleButtonClick('Market Trends')}>Get the latest <br /> market trends</button>
                    <button onClick={() => handleButtonClick('First-time Buyer')}>Information for <br /> first-time buyers</button>
                </div>
            </section>
        </main>
    );
};

export default MainContent;
