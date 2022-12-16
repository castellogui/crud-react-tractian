import { List, Button } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { useQuery } from "react-query";
import units from "../assets/units.json";
import { SearchableList } from "../interfaces/components/searchableList.interface";
import { Unit } from "../interfaces/models/unit.interface";

export default function SearchableListUnits(props: SearchableList) {
  const data = units;
  const [searchTerm, setSearchTerm] = useState("");
  const dataFiltered = filterDataByUnit(props.unitState, data);

  function callbackSearchTerm(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function filterDataByUnit(unitState: Unit, data: Array<Unit>) {
    return data.filter((unit: Unit) => {
      if (unitState != undefined) {
        return (
          (`${unit.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            `${unit.company.name}`.toLowerCase().includes(searchTerm.toLowerCase())) &&
          unit.company.name == unitState.company.name
        );
      }
      return (
        `${unit.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${unit.company.name}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
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
