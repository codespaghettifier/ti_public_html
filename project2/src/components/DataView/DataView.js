import React from 'react'
import $ from 'jquery'
import DataTable from '../DataTable/DataTable.js'
import "./DataView.css"

class DataView extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            localData: [],
            showSendButton: false,
            serverData: []
        }

        this.handleSendData = this.handleSendData.bind(this)
        this.removeLocalData = this.removeLocalData.bind(this)
        this.updateData = this.updateData.bind(this)
    }

    updateData()
    {
        this.state.localData = []
        const request = window.indexedDB.open('pollDB', 1)
        request.onsuccess = (event) => {
            const db = event.target.result
            Array.from(db.objectStoreNames).forEach((storeName, index) => {
                const transaction = db.transaction(storeName, 'readwrite')
                const dataStore = transaction.objectStore(storeName)
                let data = []
                dataStore.openCursor().onsuccess = (event) => {
                    let cursor = event.target.result
                    if(cursor)
                    {
                        data.push({key: cursor.key, record: cursor.value})
                        cursor.continue();
                    }
                    else
                    {
                        this.state.localData.push({name: storeName, records: data})
                        if(data.length)
                            this.state.showSendButton = true
                        this.setState(this.state)
                    }
                }
            })
        }
        request.onerror = (event) => {
            console.log('Failed to open database: ' + request.error)
        }

        fetch(`/~9libucha/cgi-bin/data`, {method: 'get', credentials: 'include'})
            .then(response => {
                if(!response.ok)
                {
                    throw new Error("Fetch error")
                }
                return response.json()
            })
            .then(response => {
                this.state.serverData = response
                this.setState(this.state)
            })
            .catch((error) => {console.log(error)})
    }

    componentDidMount()
    {
        this.updateData()
    }

    removeLocalData()
    {
        const request = window.indexedDB.open('pollDB', 1)
        request.onsuccess = (event) => {
            const db = event.target.result
            Array.from(db.objectStoreNames).forEach((storeName, index) => {
                const transaction = db.transaction(storeName, 'readwrite')
                const dataStore = transaction.objectStore(storeName)
                dataStore.clear();
                this.state.showSendButton = false;
                this.setState(this.state)
                this.updateData()
            })
        }
        request.onerror = (event) => {
            console.log('Failed to open database: ' + request.error)
        }
    }

    handleSendData()
    {
        const dataJson = JSON.stringify(this.state.localData)
        fetch(`/~9libucha/cgi-bin/postPollData`, {method: 'post', credentials: 'include', headers: {'Content-Type': 'application/json'}, body: dataJson})
            .then(response => {
                if(!response.ok)
                {
                    throw new Error("Fetch error")
                }
                return response.json()
            })
            .then(response => {
                if(response['success'])
                {
                    this.removeLocalData()
                }
            })
            .catch(error => {console.log(error)})
    }

    render()
    {
        return (
            <div className='data_view'>
                <h2>Dane zapisane lokalnie</h2>
                <div className="center_content">
                    <div className="send_data_button" style={{display: this.state.showSendButton ? 'block': 'none'}} onClick={this.handleSendData}>
                        <p>Wyślij dane lokalne na sewer</p>
                    </div>
                </div>
                {this.state.localData.map(poll => {return poll.records.length > 0 && <DataTable poll={poll} key={poll['name']}/>})}
                <h2>Dane zapisane na serwerze</h2>
                {this.state.serverData.map(poll => {return poll.records.length > 0 && <DataTable poll={poll} key={poll['name']}/>})}
            </div>
        )
    }
}

export default DataView



// [{"name":"q1o0","value":"42"},{"name":"q1o1","value":"69"},{"name":"q1o2","value":"420"},{"name":"q2","value":"2137"},{"name":"q3","value":"asdf"}]
