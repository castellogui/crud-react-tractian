import { List, Avatar, Button, Spin } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { SearchableList } from "../interfaces/components/searchableList.interface";
import { Unit } from "../interfaces/models/unit.interface";
import { User } from "../interfaces/models/user.interface";
import { getUsersData } from "../services/home";
import { connect } from "react-redux";

function SearchableListUsers(props: SearchableList) {
  const { isLoading, data: users } = useQuery<User[]>(
    "getUsersData",
    async () => {
      return await getUsersData(props.userLogged.token!);
    },
    {
      enabled: props.userLogged.token! != undefined,
    }
  );

  const [searchTerm, setSearchTerm] = useState("");
  const dataFiltered = filterDataByUnit(props.unitState, users);

  function callbackSearchTerm(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function filterDataByUnit(unitState: Unit, data: Array<User> | undefined) {
    if (data != undefined) {
      return data.filter((user: User) => {
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
              <div>
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
