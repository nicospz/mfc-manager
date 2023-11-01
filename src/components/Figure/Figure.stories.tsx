import React from 'react';
import Figure from './';
export default {
    title: 'Components/Figure',
};

export const Default = () => (
    <div className="grid gap-2 md:grid-cols-2">
        <Figure
            id="123"
            title="Figure Title"
            releaseDate="2022-01-01"
            price={1000}
            imageUrl="https://via.placeholder.com/150"
        />
        <Figure
            id="123"
            title="Figure Title"
            releaseDate="2022-01-01"
            price={1000}
            imageUrl="https://via.placeholder.com/150"
            wishability={3}
        />
        <Figure
            id="123"
            title="Figure Title"
            releaseDate="2022-01-01"
            price={1000}
            imageUrl="https://via.placeholder.com/150"
            score={4}
        />
    </div>
);
