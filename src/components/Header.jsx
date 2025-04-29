import React from 'react';

export default function Header({ title }) {
    return (
        <header className="w-full mb-4">
            <h1 className="text-4xl font-bold text-center text-red-600">{title}</h1>
        </header>
    );
}