import { useCallback, useMemo, useState } from "react";


export default function Pagination({
    previousLabel = "Prev",
    nextLabel = "Next",
    pageCount,
    onPageChange,
    pageRangeDisplayed = 2,
    breakLabel = "...",
    className,
    forcePage,
}) {

    const [currentPage, setCurrentPage] = useState(forcePage || 0);

    const handlePageClick = useCallback(
        (page) => {
            onPageChange({ selected: page });
            setCurrentPage(page);
        },
        [onPageChange]
    );

    const pages = useMemo(() => {
        const pages = [];
        const leftSide = pageRangeDisplayed / 2;
        const rightSide = pageRangeDisplayed - leftSide;
        for (let i = 0; i < pageCount; i++) {
            const label = i + 1;
            let className;
            if (i === currentPage) className = 'selected';
            if (
                i === 0 ||
                i === pageCount - 1 ||
                (i >= currentPage - leftSide && i <= currentPage + rightSide)
            ) {
                pages.push(
                    <button key={i} onClick={() => handlePageClick(i)} className={className} style={{ border: 'none', backgroundColor: 'transparent' }}>
                        {label}
                    </button>
                );
            } else if (
                (i < currentPage - leftSide && i === 1) ||
                (i > currentPage + rightSide && i === pageCount - 2)
            ) {
                pages.push(
                    <span key={i} style={{ backgroundColor: 'transparent' }}>
                        {breakLabel}
                    </span>
                );
            }
        }
        return pages;
    }, [
        currentPage,
        pageCount,
        pageRangeDisplayed,
        breakLabel,
    ]);

    return (
        <div className={className}>
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                className={currentPage === 0 ? `has-text-grey` : 'is-clickable'}
                disabled={currentPage === 0}
                style={{ border: 'none', backgroundColor: 'transparent' }}>
                {previousLabel}
            </button>
            {pages}
            <button
                onClick={() => handlePageClick(currentPage + 1)}
                className={currentPage === pageCount - 1 ? `has-text-grey` : 'is-clickable'}
                disabled={currentPage === pageCount - 1}
                style={{ border: 'none', backgroundColor: 'transparent' }}>
                {nextLabel}
            </button>
        </div>
    );
}
