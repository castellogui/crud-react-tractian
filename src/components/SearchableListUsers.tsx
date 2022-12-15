import { List, Divider, Skeleton, Avatar } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { useQuery } from "react-query";
import users from "../assets/users.json";
import "../components/SearchableList/SearchableList.css";

export default function ListUser() {
  const data = users;
  const [searchTerm, setSearchTerm] = useState("");
  const dataFiltered = data.filter((user) => {
    return `${user.name} ${user.familyName}`.toLowerCase().includes(searchTerm.toLowerCase());
  });

  function callbackSearchTerm(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <Search
        placeholder="Search user..."
        onSearch={() => {}}
        onChange={callbackSearchTerm}
        style={{ width: "100%" }}
      />
      <List
        style={{ overflowY: "scroll", overflowX: "hidden", height: "70%", marginTop: "0.8rem" }}
        dataSource={dataFiltered}
        renderItem={(item) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href="https://ant.design">{`${item.name} ${item.familyName}`}</a>}
              description={item.email}
            />
            <div>Content</div>
          </List.Item>
        )}
      />
    </>
  );
}
