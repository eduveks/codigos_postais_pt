import React, { Component } from "react";

import DataTable from "./DataTable/index.jsx";

import "./index.less";

export default class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="my-dashboard">
                <DataTable />
            </div>
        );
    }
}
