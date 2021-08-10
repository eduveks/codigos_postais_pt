import React, { Component } from "react";

import Button from 'antd/lib/button';

import DataTable from "./DataTable/index.jsx";

import "./index.less";

export default class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onImport = this.onImport.bind(this);
    }

    onImport() {
        window.open('/services/admin/importacao');
    }

    render() {
        return (
            <div className="my-dashboard">
                <DataTable />
                <Button onClick={this.onImport}>Importar Códigos Postais</Button>
            </div>
        );
    }
}
