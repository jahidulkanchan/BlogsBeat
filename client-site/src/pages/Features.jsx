import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { BiCategoryAlt } from 'react-icons/bi';
import { FaHashtag } from 'react-icons/fa';
import { LuArrowDownUp } from 'react-icons/lu';
import { MdEmail, MdTitle } from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Features = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatureBlogs = async () => {
      setLoading(true);
      try {
        const { data } = await axiosSecure.get(`/all-blogs?features=true`);
        setFeatures(data);
      } catch (error) {
        console.error('Error fetching feature blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatureBlogs();
  }, [axiosSecure]);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('serial', {
      id: 'serial',
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex gap-1 items-center">
          <FaHashtag /> No.
        </span>
      ),
    }),
    columnHelper.accessor('title', {
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex gap-1 items-center">
          <MdTitle /> Title
        </span>
      ),
    }),
    columnHelper.accessor('category', {
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex gap-1 items-center">
          <BiCategoryAlt /> Category
        </span>
      ),
    }),
    columnHelper.accessor('ownerEmail', {
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex gap-1 items-center">
          <MdEmail /> Author Email
        </span>
      ),
    }),
  ];

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: features,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <section className="px-2 container mx-auto mb-[50px] min-h-[510px] mt-[60px] md:mt-[80px] md:px-5 transition-colors">
      <h2 className="text-3xl mt-[130px] text-center font-medium md:font-semibold mb-5 dark:text-white">
        <span>Top 10 </span>
        <span style={{ textShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)' }} className="text-secondary">
          Featured Blogs
        </span>
      </h2>
      <div className="overflow-x-auto md:w-11/12 mx-auto mb-[50px] bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 transition-colors">
        <table className="w-full border border-collapse dark:border-gray-700 shadow-md">
          <thead className="bg-primary dark:bg-secondary transition-colors">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-3 border text-center text-sm font-medium text-white uppercase tracking-wider dark:border-gray-700">
                    <div
                      {...{
                        className: header.column.getCanSort() ? 'cursor-pointer select-none flex items-center' : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <span className="ml-2 text-white">
                        <LuArrowDownUp />
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {columns.map((_, j) => (
                      <td key={j} className="px-6 py-2 border whitespace-nowrap dark:border-gray-700">
                        <Skeleton baseColor="#2d3748" highlightColor="#4a5568" height={20} />
                      </td>
                    ))}
                  </tr>
                ))
              : table.getRowModel().rows.map((row, rowIndex) => (
                  <tr key={row.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    {row.getVisibleCells().map((cell, cellIndex) => (
                      <td key={cell.id} className="px-6 py-2 border whitespace-nowrap dark:border-gray-700">
                        {cellIndex === 0 ? rowIndex + 1 : flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Features;
