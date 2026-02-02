import BlogList from "./Components/BlogList";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { SearchBar } from "./Components/SearchBar";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { getBlogs } from "@/lib/services/blog-service";

import Pagination from "./Components/Pagination";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const { blogs, pagination } = await getBlogs({
    category: params?.category,
    search: params?.search,
    page: params?.page || 1,
    limit: 6
  });

  return (
    <>
      <ToastContainer theme="dark" />
      <Header />
      <div className="container mx-auto px-4 mt-12 mb-[-2rem] relative z-10">
        <SearchBar />
      </div>
      <BlogList blogs={blogs} initialCategory={params?.category || 'All'} />
      <Pagination pagination={pagination} />
      <Footer />
    </>
  );
}
