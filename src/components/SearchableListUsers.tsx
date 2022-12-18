import { List, Avatar, Button, Spin, Dropdown, Space, MenuProps } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { useQuery } from "react-query";
import { SearchableList } from "../interfaces/components/searchableList.interface";
import { Unit } from "../interfaces/models/unit.interface";
import { User } from "../interfaces/models/user.interface";
import { getCompaniesData, getUsersData } from "../services/getEntities";
import { connect } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { Company } from "../interfaces/models/company.interface";

function SearchableListUsers(props: SearchableList) {
  const {
    isLoading,
    data: users,
    refetch,
  } = useQuery<User[]>(
    "getUsersData",
    async () => {
      return await getUsersData(props.userLogged.token!);
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
  const [selectedUserId, setSelectedUserId] = useState("");
  const dataFiltered = filterDataByUnit(props.unitState, users);

  function callbackSearchTerm(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function filterDataByUnit(unitState: Unit, data: Array<User> | undefined) {
    if (data != undefined) {
      return data.filter((user: User) => {
        if (props.companyFilterName != undefined) {
          return (
            (`${user.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
              `${user.company.name}`.toLowerCase().includes(searchTerm.toLowerCase())) &&
            user.company.name == props.companyFilterName
          );
        }
        if (unitState._id != "all") {
          return (
            (`${user.name} ${user.familyName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
            user.company.name == unitState.company.name
          );
        }
        return (
          user.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          `${user.name} ${user.familyName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
  }

  function setUserObject(user: User) {
    props.buttonFunction(user);
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
    props.triggerMove(newCompanyId, selectedUserId, refetch);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  function renderList() {
    return (
      <>
        <Search
          placeholder="Search user by name, email or company name."
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
          renderItem={(user) => (
            <List.Item key={user.email}>
              <List.Item.Meta
                avatar={<Avatar src={user.avatar} />}
                title={`${user.name} ${user.familyName}`}
                description={`${user.email} | ${user.company.name}`}
              />
              <div className="flex flex-row gap-3">
                {props.changeOption ? (
                  <>
                    <Dropdown menu={menuProps} trigger={["click"]}>
                      <Button
                        onClick={() => {
                          setSelectedUserId(user._id);
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
                      setUserObject(user);
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

  return <>{isLoading ? <Spin /> : renderList()}</>;
}

const MapStateToProps = (state: any) => ({
  userLogged: state.userLogged,
});

export default connect(MapStateToProps)(SearchableListUsers);
