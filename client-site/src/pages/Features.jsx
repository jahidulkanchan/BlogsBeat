import { useReactTable, flexRender, createColumnHelper, getCoreRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { LuArrowDownUp } from 'react-icons/lu';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { MdEmail, MdTitle } from 'react-icons/md';
import { BiCategoryAlt } from 'react-icons/bi';
import { FaHashtag } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Features = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatureBlogs = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const { data } = await axiosSecure.get(`/all-blogs?features=true`);
        setFeatures(data);
      } catch (error) {
        console.error("Error fetching feature blogs:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchFeatureBlogs();
  }, [axiosSecure]);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("serial", {
      id: "serial",
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex gap-1 items-center">
          <span className="text-lg"><FaHashtag /></span> No.
        </span>
      ),
    }),
    columnHelper.accessor("title", {
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex gap-1 items-center">
          <span className="text-lg"><MdTitle /></span> Title
        </span>
      ),
    }),
    columnHelper.accessor("category", {
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex gap-1 items-center">
          <span className="text-lg"><BiCategoryAlt /></span> Category
        </span>
      ),
    }),
    columnHelper.accessor("ownerEmail", {
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex gap-1 items-center">
          <span className="text-lg"><MdEmail /></span> Author Email
        </span>
      ),
    }),
  ];

  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

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
    <section className="px-2 container mx-auto mb-[50px] min-h-[510px] mt-[60px] md:mt-[80px] md:px-5">
      <h2 className="text-3xl mt-[130px] text-center font-medium md:font-semibold mb-5">
        <span>Top 10 </span>
        <span
          style={{
            textShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)",
          }}
          className="text-secondary"
        >
          Featured Blogs
        </span>
      </h2>
      <div className="overflow-x-auto md:w-11/12 mx-auto mb-[50px] bg-white rounded-lg">
        <table className="shadow-md w-full border border-collapse">
          <thead className="bg-primary">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 border text-center text-sm font-medium text-white uppercase tracking-wider"
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span className="ml-2" size={14}><LuArrowDownUp /></span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {columns.map((_, j) => (
                    <td
                      key={j}
                      className="px-6 py-2 border border-slate-300 whitespace-nowrap"
                    >
                      <Skeleton width="100%" />
                    </td>
                  ))}
                </tr>
              ))
              : table.getRowModel().rows.map((row, rowIndex) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <td
                      key={cell.id}
                      className="px-6 py-2 border border-slate-300 whitespace-nowrap bg-slate-50"
                    >
                      {cellIndex === 0
                        ? rowIndex + 1
                        : flexRender(cell.column.columnDef.cell, cell.getContext())}
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

