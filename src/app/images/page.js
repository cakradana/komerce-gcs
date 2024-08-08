"use client";

import {
  Input,
  Typography,
  List,
  Image,
  Pagination,
  Button,
  Skeleton,
} from "antd";
import useImagesPage from "../../hooks/useImagesPage";

const { Text } = Typography;
const { Search } = Input;

const PAGE_SIZE = 10;

export default function ImagesPage() {
  const {
    imageData,
    loading,
    currentPage,
    searchValue,
    onSearch,
    onCopyUrl,
    setCurrentPage,
  } = useImagesPage();

  const filteredData =
    imageData?.filter((item) =>
      item.url.toLowerCase().includes(searchValue.toLowerCase())
    ) || [];

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleSearch = (value) => {
    onSearch(value);
    setCurrentPage(1);
  };

  return (
    <div>
      <Search
        placeholder="Search images"
        onSearch={handleSearch}
        style={{ marginBottom: 12 }}
        enterButton="Search"
        allowClear
      />
      {filteredData.length !== imageData?.length && (
        <Text>
          Displaying {currentData.length} of {filteredData.length} search
          results for <Text strong>&quot;{searchValue}&quot;</Text>
        </Text>
      )}

      <div
        style={{
          marginTop: 12,
          padding: 48,
          background: "#fff",
          borderRadius: "8px",
        }}
      >
        {loading ? (
          <List
            grid={{ gutter: [48, 48], column: 5, xs: 1, sm: 2, md: 3, lg: 4 }}
            dataSource={[...Array(PAGE_SIZE).keys()]}
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
            grid={{ gutter: [48, 48], column: 5, xs: 1, sm: 2, md: 3, lg: 4 }}
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
                    onClick={() => onCopyUrl(item.url)}
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
        pageSize={PAGE_SIZE}
        total={filteredData.length}
        onChange={(page) => setCurrentPage(page)}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        hideOnSinglePage
        showSizeChanger={false}
        style={{ marginTop: 16, textAlign: "right" }}
      />
    </div>
  );
}
