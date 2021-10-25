import React from 'react';

export const TableSkeleton = () => {
    return(
        <>
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="50" />
            <rect x="0" y="60" rx="4" ry="4" width="100%" height="50" />
            <rect x="0" y="120" rx="4" ry="4" width="100%" height="50" />
            <rect x="0" y="180" rx="4" ry="4" width="100%" height="50" />
            <rect x="0" y="240" rx="4" ry="4" width="100%" height="50" />
            <rect x="0" y="300" rx="4" ry="4" width="100%" height="50" />
        </>
    )
}
