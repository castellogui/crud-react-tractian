import { List, Button, Spin, Dropdown, Space, MenuProps } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { useQuery } from "react-query";
import { SearchableList } from "../interfaces/components/searchableList.interface";
import { Unit } from "../interfaces/models/unit.interface";
import { getCompaniesData, getUnitsData } from "../services/entities";
import { connect } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { Company } from "../interfaces/models/company.interface";

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

  const { isLoading: isLoadingCompany, data: companies } = useQuery<Company[]>(
    "getCompaniesData",
    async () => {
      return await getCompaniesData(props.userLogged.token!);
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

  const items: MenuProps["items"] = [];
  companies?.map((companies) => {
    let unitOption = {
      label: companies.name,
      key: companies.name,
    };
    items.push(unitOption);
  });

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    let companyName = e.key;
    //Request to change asset from unit
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

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
              <div className="flex flex-row gap-3">
                {props.changeOption ? (
                  <>
                    <Dropdown menu={menuProps}>
                      <Button>
                        <Space>
                          Companies
                          <DownOutlined />
                        </Space>
                      </Button>
                    </Dropdown>
                  </>
                ) : null}
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
        console.log("unit name" + unit.company.name);
        console.log("unit state name" + unitState.name);
        console.log("unit company name" + unit.company.name);
        console.log("props company name" + props.companyFilter);
        if (props.companyFilter != undefined) {
          return (
            (`${unit.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
              `${unit.company.name}`.toLowerCase().includes(searchTerm.toLowerCase())) &&
            unit.company.name == props.companyFilter
          );
        }
        if (unitState._id != "all") {
          return (
            (`${unit.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
              `${unit.company.name}`.toLowerCase().includes(searchTerm.toLowerCase())) &&
            unit.name == unitState.name
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
