import { useState, useEffect } from "react";
import { message } from "antd";

const useImagesPage = () => {
  const [imageData, setImageData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          "https://internal.komtim.id/api/storage/folder/list"
        );
        const data = await res.json();
        const array = await Object.values(data).flat();
        setImageData(array);
        setFilteredData(array);
        setLoading(false);
      } catch (error) {
        message.error("Failed to fetch images");
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const onSearch = (value) => {
    setSearchValue(value);
    const filtered = imageData.filter((item) =>
      item.url.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const onCopyUrl = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      message.success({
        content: url,
        style: {
          fontWeight: "500",
        },
      });
    });
  };

  return {
    imageData,
    filteredData,
    loading,
    onSearch,
    searchValue,
    onCopyUrl,
    currentPage,
    setCurrentPage,
  };
};

export default useImagesPage;
