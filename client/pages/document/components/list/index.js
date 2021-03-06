import React from 'react'
import PropTypes from 'prop-types'
import history from 'common/history'
import { Table } from 'antd'
import moment from 'moment'
import './index.less'

class ListViews extends React.Component {
  static propTypes = {
    doclist: PropTypes.object,
    action: PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  columns = [
    {
      title: '名称',
      dataIndex: 'title'
    },
    {
      title: '路径',
      render: record => {
        return JSON.parse(record.content).pathName
      }
    },
    {
      title: '最后更新',
      render: record => {
        return (
          <span>
            {moment(record.updatedTime).format('YYYY-MM-DD hh:mm:ss')}&nbsp;&nbsp;by&nbsp;&nbsp;
            {record.author}
          </span>
        )
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          <span className="actions">
            <a
              href="javascript:;"
              onClick={e => {
                e.stopPropagation()
                history.push(`/document/edit/${record.id}`)
              }}
            >
              编辑
            </a>
            <a
              href="javascript:;"
              onClick={e => {
                e.stopPropagation()
                history.push(`/document/copy/${record.id}`)
              }}
            >
              复制
            </a>
            <a
              href="javascript:;"
              onClick={e => {
                e.stopPropagation()
                history.push(`/product/add/${record.id}`)
              }}
            >
              删除
            </a>
          </span>
        )
      }
    }
  ]

  render() {
    const { doclist, action } = this.props

    const { loading, dataSource, params } = doclist.toJS()
    return (
      <Table
        rowKey="id"
        className="table-list"
        loading={loading}
        columns={this.columns}
        dataSource={dataSource.rows}
        pagination={{
          total: dataSource.count,
          pageSize: params.pageSize,
          current: params.pageIndex,
          showQuickJumper: true,
          showTotal: total => `共 ${total} 条`,
          onChange: pageIndex => action.querydoc({ ...params, pageIndex })
        }}
      />
    )
  }
}

export default ListViews
