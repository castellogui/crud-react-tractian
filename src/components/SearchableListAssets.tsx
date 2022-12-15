import { List, Button } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { useQuery } from "react-query";
import assets from "../assets/assets.json";
import { SearchableList } from "../interfaces/components/searchableList.interface";
import { Asset } from "../interfaces/model/asset.interface";
import { Unit } from "../interfaces/model/unit.interface";

export default function SearchableListAssets(props: SearchableList) {
  const data = assets;
  const [searchTerm, setSearchTerm] = useState("");
  const dataFiltered = filterDataByUnit(props.unitState, data);

  function callbackSearchTerm(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function filterDataByUnit(unitState: Unit, data: Array<Asset>) {
    return data.filter((asset: Asset) => {
      if (unitState != undefined) {
        return (
          (`${asset.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            `${asset.unit.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            `${asset.status}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            `${asset.owner.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            `${asset.model}`.toLowerCase().includes(searchTerm.toLowerCase())) &&
          asset.unit.name == unitState.name
        );
      }
      return (
        `${asset.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${asset.unit.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${asset.status}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${asset.owner.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${asset.model}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
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
