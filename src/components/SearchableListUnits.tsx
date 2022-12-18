import { List, Button, Spin, Dropdown, Space, MenuProps } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { useQuery } from "react-query";
import { SearchableList } from "../interfaces/components/searchableList.interface";
import { Unit } from "../interfaces/models/unit.interface";
import { getCompaniesData, getUnitsData } from "../services/getEntities";
import { connect } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { Company } from "../interfaces/models/company.interface";

function SearchableListUnits(props: SearchableList) {
  const {
    isLoading,
    data: units,
    refetch,
  } = useQuery<Unit[]>(
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
  const [selectedUnitId, setSelectedUnitId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dataFiltered = filterDataByUnit(props.unitState, units);

  function callbackSearchTerm(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function setUnitObject(unit: Unit) {
    props.buttonFunction(unit);
  }

  const items: MenuProps["items"] = [];
  companies?.map((company) => {
    let companyOption = {
      label: company.name,
      key: company._id,
    };
    items.push(companyOption);
  });

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    let newCompanyId = e.key;
    props.triggerMove(newCompanyId, selectedUnitId, refetch);
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
                    <Dropdown menu={menuProps} trigger={["click"]}>
                      <Button
                        onClick={() => {
                          setSelectedUnitId(unit._id);
                        }}
                      >
                        <Space>
                          Change company
                          <DownOutlined />
                        </Space>
                      </Button>
                    </Dropdown>
                  </>
                ) : null}
                {props.editableItems ? (
                  <Button
                    onClick={() => {
                      setUnitObject(unit);
                    }}
                    type="primary"
                    block
                    style={{ backgroundColor: "#245ce4" }}
                  >
                    Edit
                  </Button>
                ) : null}
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
        if (props.companyFilterName != undefined) {
          return (
            (`${unit.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
              `${unit.company.name}`.toLowerCase().includes(searchTerm.toLowerCase())) &&
            unit.company.name == props.companyFilterName
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
