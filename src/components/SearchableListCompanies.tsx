import { List, Avatar, Button, Spin } from "antd";
import Search from "antd/es/input/Search";
import { useQuery } from "react-query";
import { SearchableList } from "../interfaces/components/searchableList.interface";
import { Unit } from "../interfaces/models/unit.interface";
import { getCompaniesData } from "../services/getEntities";
import { connect } from "react-redux";
import { Company } from "../interfaces/models/company.interface";
import { useState } from "react";

function SearchableListCompanies(props: SearchableList) {
  const [searchTerm, setSearchTerm] = useState("");

  const { isLoading, data: companies } = useQuery<Company[]>(
    "getCompaniesData",
    async () => {
      return await getCompaniesData(props.userLogged.token!);
    },
    {
      enabled: props.userLogged.token! != undefined,
    }
  );

  function filterDataByUnit(unitState: Unit, data: Array<Company> | undefined) {
    if (data != undefined) {
      return data.filter((company: Company) => {
        return company.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
  }

  const dataFiltered = filterDataByUnit(props.unitState, companies);

  function callbackSearchTerm(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function setCompanyObject(company: Company) {
    props.buttonFunction(company);
  }

  function renderList() {
    return (
      <>
        <Search
          placeholder="Search company by name, email or company name."
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
          renderItem={(company) => (
            <List.Item key={company.name}>
              <List.Item.Meta title={`${company.name}`} />
              <div>
                {props.editableItems ? (
                  <Button
                    onClick={() => {
                      setCompanyObject(company);
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

export default connect(MapStateToProps)(SearchableListCompanies);
