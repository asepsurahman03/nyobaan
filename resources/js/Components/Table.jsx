import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Table = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/http://localhost/phpmyadmin/nyobaan/posts");
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex items-center">
                <a href="/posts/create" className="rounded border bg-[#1B9C85] px-3 py-2 text-white mb-3">Tambah Aplikasi</a>
            </div>
            <table className="min-w-full shadow bg-white">
                <thead>
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nama
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Versi
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tahun
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Gambar
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white mx-auto">
                    {data.length > 0 ? (
                        data.map((data) => (
                            <tr key={data.id}>
                                <td>{data.namaApk}</td>
                                <td>{data.versi}</td>
                                <td>{data.tahun}</td>
                                <td className="text-center">
                                    <img src={data.image} className="rounded" style={{ width: '150px' }} alt={data.namaApk} />
                                </td>
                                <td className="text-center">
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        if (window.confirm('Apakah Anda Yakin ?')) {
                                            // Lakukan penghapusan data
                                        }
                                    }}>
                                        <a href={`/posts/edit/${data.id}`} className="btn btn-sm btn-primary">EDIT</a>
                                        <button type="submit" className="btn btn-sm btn-danger">HAPUS</button>
                                    </form>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                Data Aplikasi belum Tersedia.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
