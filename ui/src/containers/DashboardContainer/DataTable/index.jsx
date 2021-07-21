import React, { Component } from 'react';

import Table from 'antd/lib/table';
import Input from 'antd/lib/input';

import Button from 'antd/lib/button';
import notification from 'antd/lib/notification';

import { SearchOutlined } from '@ant-design/icons';

import Highlighter from 'react-highlight-words';

import _service from '@netuno/service-client';

_service.config({
    prefix: netuno.config.urlServices
});

const { Column } = Table;

const pageSize = 10;

const columnsNames = [ 'distrito', 'concelho', 'localidade', 'numero', 'extensao' ];

const columnsTitles = {
    distrito: 'Distrito',
    concelho: 'Concelho',
    localidade: 'Localidade',
    numero: 'Número',
    extensao: 'Extensão',
};

export default class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: null,
            dataSource: [],
            loading: true,
            filter: {
                distrito: '',
                concelho: '',
                localidade: '',
                numero: '',
                extensao: ''
            },
            pagination: {
		        current: 1,
                pageSize,
                total: 0
            },
            sorter: {
                field: '',
                order: ''
            }
        };
        this.searchInput = React.createRef();
        this.handleTableChange = this.handleTableChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    componentDidMount() {
        this.loadTable();
    }

    loadTable(settings) {
        if (settings == null || typeof settings == "undefined") {
            settings = { state: null };
        }
        let { filter, sorter, pagination, state } = settings;
        if (typeof filter == 'undefined') {
            filter = this.state.filter;
        }
        if (typeof settings == 'undefined' || typeof settings.pagination == 'undefined') {
            pagination = this.state.pagination;
        } else {
            pagination = settings.pagination;
        }
        if (typeof settings == 'undefined' || typeof settings.sorter == 'undefined') {
            sorter = this.state.sorter;
        } else {
            sorter = settings.sorter;
        }
        this.setState({ filter, sorter, pagination, loading: true, ...state });
        _service({
            method: 'POST',
            url: "/admin/tabela",
            data: { filter, pagination, sorter },
            success: (response) => {
                this.setState({
                    dataSource: response.json.resultados,
                    pagination: {
                        ...this.state.pagination,
                        total: response.json.total
                    },
                    loading: false
                });
            },
            fail: (e) => {
                console.error("Service admin/tabela error.", e);
                notification.error({
                    message: 'Tabela',
                    description: 'Não foi possível carregar os dados.'
                });
                this.setState({
                    dataSource: [],
                    loading: false
                });
            }
        });
    }
    
    handleTableChange(pagination, filters, sorter) {
        this.loadTable({ pagination, filters, sorter: { field: sorter.field, order: sorter.order } });
    }
    
    handleSearch(selectedKeys, confirm, value, dataIndex) {
        const { filter, filterValues } = this.state;
        if (value != null && value != '') {
            filter[dataIndex] = value;
        }
        confirm();
        this.loadTable({ filter });
    }

    handleReset(clearFilters, dataIndex) {
        const { filter } = this.state;
        filter[dataIndex] = '';
        clearFilters();
        this.loadTable({ filter });
    }

    getColumnSearchProps(dataIndex) {
        return {
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                let field = null;
                let width = 200;
                let filterValue = '';
                let buttons = [];
                buttons.push(
                    <Button
                      type="primary"
                      onClick={() => this.handleSearch(selectedKeys, confirm, selectedKeys.length > 0 ? selectedKeys[0] : '', dataIndex)}
                      icon={<SearchOutlined />}
                      size="small"
                      style={{ width: 90, marginRight: 8 }}
                    >
                      Filtrar
                    </Button>
                );
                buttons.push(
                    <Button onClick={() => this.handleReset(clearFilters, dataIndex)} size="small" style={{ width: 90 }}>
                      Limpar
                    </Button>
                );
                field = (
                    <Input
                      ref={this.searchInput}
                      placeholder={ `${columnsTitles[dataIndex]}...`}
                      value={selectedKeys[0]}
                      onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                      onPressEnter={() => this.handleSearch(selectedKeys, confirm, selectedKeys.length > 0 ? selectedKeys[0] : '', dataIndex)}
                    />
                );
                return (
                    <div style={{ padding: 8 }}>
                      <div style={{ width, marginBottom: 8, display: 'block' }}>
                        { field }
                      </div>
                      { buttons }
                    </div>
                );
            },
            filterIcon: filtered => {
                return (
                    <SearchOutlined 
                      style={{ color: filtered ? '#dc1c2e' : undefined }}
                    />
                );
            },
            onFilter: (value, record) => {
                return record;
            },
            onFilterDropdownVisibleChange: visible => {
                if (visible && this.searchInput.current) {
                    window.setTimeout(() => this.searchInput.current.select());
                }
            },
            render: text => {
                const { filter } = this.state;
                if (text && filter != null && filter[dataIndex] != null && filter[dataIndex] != '') {
                    return (
                        <Highlighter
                          highlightStyle={{ backgroundColor: '#dc1c2e', color: '#ffffff', padding: 0 }}
                          searchWords={ [ filter[dataIndex] ] }
                          autoEscape
                          textToHighlight={text.toString()}
                        />
                    );
                }
                return text;
            },
        };
    }

    render() {
        const { loading, dataSource, filters, pagination } = this.state;
        return (
            <Table
              pagination={pagination}
              size="small"
              loading={loading}
              pagination={pagination}
              dataSource={dataSource}
              onChange={this.handleTableChange}
            >
              {columnsNames.map(
                  (columnName) => 
                      <Column
                        title={columnsTitles[columnName]}
                        dataIndex={columnName}
                        key={columnName}
                        sorter={true}
                        { ...this.getColumnSearchProps(columnName) }
                      />
              )}
            </Table>
        );
    }

}
