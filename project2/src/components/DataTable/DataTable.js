import React from 'react'
import './DataTable.css'

class DataTable extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        let headers = []
        if(this.props.poll.records.length)
        {
            const record = JSON.parse(this.props.poll.records[0].record)
            headers = ['ID'].concat(Object.keys(record))
        }

        let rows = []
        this.props.poll.records.forEach((record) => {
            let values = Object.values(JSON.parse(record['record']))
            values.forEach((value, index) => {
                if(value.constructor.name == "Array")
                {
                    let newValue = ""
                    value.forEach(item => {
                        newValue += item + ", ";
                    })
                    values[index] = newValue.substring(0, newValue.length - 2)
                }
            })
            rows.push(['key' in record ? record['key'] : record['id']].concat(values))
        })

        const show = rows.length > 0

        return (
            <div className='data_table_container'>
                <h3 className='table_header'>{this.props.poll.name}</h3>
                <table className='data_table'>
                    <thead>
                        <tr>
                            {headers.map(header => {return <th key={header}>{header}</th>})}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(row => {return <tr key={row[0]}>
                            {row.map(cell => {return <td key={cell}>{cell}</td>})}
                        </tr>})}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DataTable
