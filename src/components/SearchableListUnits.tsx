import { List, Button, Spin } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { useQuery } from "react-query";
import { SearchableList } from "../interfaces/components/searchableList.interface";
import { Unit } from "../interfaces/models/unit.interface";
import { getUnitsData } from "../services/home";
import { connect } from "react-redux";

function SearchableListUnits(props: SearchableList) {
  const { isLoading, data: units } = useQuery<Unit[]>(
    "getUnitsData",
    async () => {
      return await getUnitsData(props.userLogged.token!);
    },
    {
      enabled: props.userLogged.token! != undefined,
    }
  );
  const [searchTerm, setSearchTerm] = useState("");
  const dataFiltered = filterDataByUnit(props.unitState, units);

  function callbackSearchTerm(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function setUserObject(unit: Unit) {
    props.buttonFunction(unit);
  }

  function renderList() {
    return (
      <>
        <Search
          placeholder="Search unit by name or company name."
          onSearch={() => {}}
          onChange={callbackSearchTerm}
          style={{ width: "100%" }}
        />
        <List
          style={{
            overflowY: "scroll",
            overflowX: "hidden",
            height: `${props.height}%`,
            marginTop: "0.8rem",
          }}
          dataSource={dataFiltered}
          renderItem={(unit) => (
            <List.Item key={unit.name}>
              <List.Item.Meta title={`${unit.name}`} description={`${unit.company.name}`} />
              <div>
                <Button
                  onClick={() => {
                    setUserObject(unit);
                  }}
                  type="primary"
                  block
                  style={{ backgroundColor: "#245ce4" }}
                >
                  Edit
                </Button>
              </div>
            </List.Item>
          )}
        />
      </>
    );
  }

  function filterDataByUnit(unitState: Unit, data: Array<Unit> | undefined) {
    if (data != undefined) {
      return data.filter((unit: Unit) => {
        if (unitState._id != "all") {
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
  }

  return <>{isLoading ? <Spin /> : renderList()}</>;
}

const MapStateToProps = (state: any) => ({
  userLogged: state.userLogged,
});

export default connect(MapStateToProps)(SearchableListUnits);
