import { List, Button, Spin, Avatar, Dropdown, Space, MenuProps } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { useQuery } from "react-query";
import { SearchableList } from "../interfaces/components/searchableList.interface";
import { Asset } from "../interfaces/models/asset.interface";
import { Unit } from "../interfaces/models/unit.interface";
import { getAssetsData, getUnitsData } from "../services/entities";
import { connect } from "react-redux";
import { DownOutlined } from "@ant-design/icons";

function SearchableListAssets(props: SearchableList) {
  const { isLoading, data: assets } = useQuery<Asset[]>(
    "getAssetsData",
    async () => {
      return await getAssetsData(props.userLogged.token!);
    },
    {
      enabled: props.userLogged.token! != undefined,
    }
  );

  const { isLoading: isLoadingUnit, data: units } = useQuery<Unit[]>(
    "getUnitsData",
    async () => {
      return await getUnitsData(props.userLogged.token!);
    },
    {
      enabled: props.userLogged.token! != undefined,
    }
  );
  const [searchTerm, setSearchTerm] = useState("");
  const dataFiltered = filterDataByUnit(props.unitState, assets);

  function callbackSearchTerm(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  const items: MenuProps["items"] = [];
  units?.map((unit) => {
    let unitOption = {
      label: unit.name,
      key: unit._id,
    };
    items.push(unitOption);
  });

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    let unitId = e.key;
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
          placeholder="Search asset by name, unit name, status, owner name or model."
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
          renderItem={(item) => (
            <List.Item key={item.name}>
              <List.Item.Meta
                title={`${item.name}`}
                description={`${item.unit.name} | ${item.status} | ${item.owner.name} | ${item.model}`}
                avatar={<Avatar src={item.avatar}></Avatar>}
              />
              <div className="flex flex-row gap-3">
                {props.changeOption ? (
                  <>
                    <Dropdown menu={menuProps}>
                      <Button>
                        <Space>
                          Units
                          <DownOutlined />
                        </Space>
                      </Button>
                    </Dropdown>
                  </>
                ) : null}
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

  function filterDataByUnit(unitState: Unit, data: Array<Asset> | undefined) {
    if (data != undefined) {
      return data.filter((asset: Asset) => {
        if (unitState._id != "all") {
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
  }

  return <>{isLoading ? <Spin /> : renderList()}</>;
}

const MapStateToProps = (state: any) => ({
  userLogged: state.userLogged,
});

export default connect(MapStateToProps)(SearchableListAssets);
