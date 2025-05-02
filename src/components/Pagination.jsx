import React from 'react';

function Pagination({ totalPages, currentPage, onPageChange }) {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
        buttons.push(
            <button
                key={i}
                onClick={() => onPageChange(i)}
                className={`px-4 py-2 rounded-full border ${currentPage === i ? 'bg-red-400 text-white' : 'bg-white'
                    }`}
            >
                {i}
            </button>
        );
    }

    return (
        <div className="flex justify-center mt-6 gap-2">
            {buttons}
        </div>
    );
}

export default Pagination