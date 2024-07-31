"use client";

import { useState, useEffect } from "react";
import {
  Input,
  Typography,
  List,
  Image,
  Pagination,
  Button,
  message,
  Skeleton,
} from "antd";

const { Text } = Typography;
const { Search } = Input;

export default function Dashboard() {
  const [imageData, setImageData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const res = await fetch(
        "https://internal.komtim.id/api/storage/folder/list"
      );
      const data = await res.json();
      const array = Object.values(data).flat();
      setImageData(array);
      setFilteredData(array);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
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

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      message.success("URL copied to clipboard!");
    });
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <Search
        placeholder="Search images"
        onSearch={onSearch}
        style={{ marginBottom: 16 }}
        enterButton="Search"
        allowClear
      />
      {filteredData.length !== imageData.length && (
        <Text>
          Displaying {currentData.length} of {filteredData.length} search
          results for <Text strong>&quot;{searchValue}&quot;</Text>
        </Text>
      )}

      <div style={{
            marginTop: 16,
            padding: 24,
            background: "#fff",
            borderRadius: "8px",
          }}>
        {loading ? (
          <List
            grid={{ gutter: 16, column: 5, xs: 1, sm: 2, md: 3, lg: 4 }}
            dataSource={[...Array(pageSize).keys()]}
            style={{ textAlign: "center" }}
            renderItem={() => (
              <List.Item>
                <Skeleton.Image
                  style={{ width: "100px", height: "100px", marginBottom: 16 }}
                />
                <Skeleton active title={false} paragraph={{ rows: 2 }} />
              </List.Item>
            )}
          />
        ) : (
          <List
            grid={{ gutter: 16, column: 5, xs: 1, sm: 2, md: 3, lg: 4 }}
            dataSource={currentData}
            renderItem={(item) => (
              <List.Item>
                <div style={{ textAlign: "center" }}>
                  <Image
                    src={item.url}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100px",
                      objectFit: "contain",
                    }}
                  />
                  <div>{item.name}</div>
                  <Button
                    onClick={() => handleCopyUrl(item.url)}
                    style={{ marginTop: 8 }}
                  >
                    Copy URL
                  </Button>
                </div>
              </List.Item>
            )}
          />
        )}
      </div>

      <Pagination
        current={currentPage}
        showSizeChanger
        pageSize={pageSize}
        total={filteredData.length}
        onChange={handlePageChange}
        onShowSizeChange={handlePageChange}
        style={{ marginTop: 16, textAlign: "right" }}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
      />
    </div>
  );
}
