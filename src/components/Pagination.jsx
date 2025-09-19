import React from 'react'
import { useMemo } from "react";

const Pagination = ({page, pageSize, total, onPageChange}) => {

    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const pages = useMemo(() => {
        const arr = [];
        const max = totalPages;
        const window = 2;
        const start = Math.max(1, page - window);
        const end = Math.min(max, page + window);
        for (let i = start; i <= end; i++) arr.push(i);
        return { arr,max };
    }, [page, totalPages])

    if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
        <button
         onClick={() => onPageChange(Math.max(1, page - 1))}
         className="border rounded-lg px-3 py-1 disabled:opacity-50 cursor-pointer"
         disabled={page <= 1}
        >
            ←
        </button>
        {pages.arr[0] > 1 && (
            <>
              <PageBtn n={1} active={page===1} onClick={onPageChange}></PageBtn>
              {pages.arr[0] > 2 && <span className='px-1'>...</span>}
            </>
        )}

        {pages.arr.map(n => (
            <PageBtn key={n} n={n} active={n===page} onClick={onPageChange}></PageBtn>
        ))}

        {pages.arr[pages.arr.length-1] < pages.max && (
            <>
              {pages.arr[pages.arr.length-1] < pages.max - 1 && <span className="px-1">...</span>}
              <PageBtn n={pages.max} active={page===pages.max} onClick={onPageChange} />
            </>
        )}

        <button
         onClick={() => onPageChange(Math.min(totalPages, page + 1))}
         className="border rounded-lg px-3 py-1 disabled:opacity-50 cursor-pointer"
         disabled={page >= totalPages}
        >
            →
        </button>
    </div>
  )
}

function PageBtn({ n, active, onClick }) {
  return (
    <button
      onClick={() => onClick(n)}
      className={`border rounded-lg px-3 py-1 cursor-pointer ${active ? "bg-black text-white" : "hover:bg-gray-50"}`}
    >
      {n}
    </button>
  );
}

export default Pagination