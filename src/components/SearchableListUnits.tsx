import { List, Button } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { useQuery } from "react-query";
import units from "../assets/units.json";

export default function SearchableListUnits() {
  const data = units;
  const [searchTerm, setSearchTerm] = useState("");
  const dataFiltered = data.filter((unit) => {
    return (
      `${unit.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${unit.company.name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  function callbackSearchTerm(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <Search
        placeholder="Search unit by name or company name."
        onSearch={() => {}}
        onChange={callbackSearchTerm}
        style={{ width: "100%" }}
      />
      <List
        style={{ overflowY: "scroll", overflowX: "hidden", height: "70%", marginTop: "0.8rem" }}
        dataSource={dataFiltered}
        renderItem={(item) => (
          <List.Item key={item.name}>
            <List.Item.Meta title={`${item.name}`} description={`${item.company.name}`} />
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
