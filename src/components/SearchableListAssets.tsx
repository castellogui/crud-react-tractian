import { List, Button } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { useQuery } from "react-query";
import assets from "../assets/assets.json";

export default function SearchableListAssets() {
  const data = assets;
  const [searchTerm, setSearchTerm] = useState("");
  const dataFiltered = data.filter((asset) => {
    return (
      `${asset.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${asset.unit.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${asset.status}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${asset.owner.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${asset.model}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  function callbackSearchTerm(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <Search
        placeholder="Search asset by name, unit name, status, owner name or model."
        onSearch={() => {}}
        onChange={callbackSearchTerm}
        style={{ width: "100%" }}
      />
      <List
        style={{ overflowY: "scroll", overflowX: "hidden", height: "70%", marginTop: "0.8rem" }}
        dataSource={dataFiltered}
        renderItem={(item) => (
          <List.Item key={item.name}>
            <List.Item.Meta
              title={`${item.name}`}
              description={`${item.unit.name} | ${item.status} | ${item.owner.name} | ${item.model}`}
            />
            <div>
              <Button type="primary" block style={{ backgroundColor: "#245ce4" }}>
                Edit
              </Button>
            </div>
          </List.Item>
        )}
      />
    </>
  );
}
