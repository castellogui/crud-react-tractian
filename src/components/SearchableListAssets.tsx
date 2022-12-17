import { List, Button, Spin, Avatar, Dropdown, Space, MenuProps } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { useQuery } from "react-query";
import { SearchableList } from "../interfaces/components/searchableList.interface";
import { Asset } from "../interfaces/models/asset.interface";
import { Unit } from "../interfaces/models/unit.interface";
import { getAssetsData, getUnitsData } from "../services/getEntities";
import { connect } from "react-redux";
import { DownOutlined } from "@ant-design/icons";

function SearchableListAssets(props: SearchableList) {
  const {
    isLoading,
    data: assets,
    refetch,
  } = useQuery<Asset[]>(
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
  const [assetId, setAssetId] = useState();

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
    let asset = assetId;
    props.triggerMove(unitId, asset, refetch);
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  function setAssetObject(asset: Asset) {
    props.buttonFunction(asset);
  }

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
          renderItem={(asset) => (
            <List.Item key={asset.name}>
              <List.Item.Meta
                title={`${asset.name}`}
                description={`${asset.unit.name} | ${asset.status} | ${asset.owner.name} | ${asset.model}`}
                avatar={<Avatar src={asset.avatar}></Avatar>}
              />
              <div className="flex flex-row gap-3">
                {/* {props.changeOption ? (
                  <>
                    <Dropdown menu={menuProps} trigger={["click"]}>
                      <Button
                        onClick={() => {
                          setAssetId(asset._id);
                        }}
                      >
                        <Space>
                          Change Unit
                          <DownOutlined />
                        </Space>
                      </Button>
                    </Dropdown>
                  </>
                ) : null} */}
                {props.editableItems ? (
                  <Button
                    onClick={() => {
                      setAssetObject(asset);
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

  function filterDataByUnit(unitState: Unit, data: Array<Asset> | undefined) {
    if (data != undefined) {
      return data.filter((asset: Asset) => {
        if (props.unitFilter != undefined) {
          return (
            (`${asset.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
              `${asset.unit.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
              `${asset.status}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
              `${asset.owner.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
              `${asset.model}`.toLowerCase().includes(searchTerm.toLowerCase())) &&
            asset.unit.name == props.unitFilter
          );
        }

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
