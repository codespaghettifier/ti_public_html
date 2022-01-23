import React from 'react'
import {useState} from "react"
import $ from 'jquery'
import './Poll.css'
import {useNavigate, useLocation} from 'react-router-dom'
import PollNavigationButton from "../PollNavigationButton/PollNavigationButton.js"

class Poll extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            numQuestions: 0,
            currentQuestion: 0,
            previousButtonAvailable: false,
            previousButtonActive: true,
            submitButtonAvailable: false,
            submitButtonActive: true,
            nexButtonAvailable: false,
            nextButtonActive: false
        }

        this.handlePreviousClick = this.handlePreviousClick.bind(this)
        this.savePollData = this.savePollData.bind(this)
        this.handleSubmitClick = this.handleSubmitClick.bind(this)
        this.handleNextClick = this.handleNextClick.bind(this)
        this.checkNextButtonAvailable = this.checkNextButtonAvailable.bind(this)
    }

    handleResponse(response)
    {
        $('#poll_container').append(response)
        $('.poll').on('submit', (event) => {
            event.preventDefault()
        })
        $('input').on('input', () => {
            this.checkNextButtonAvailable()
        })

        this.state.numQuestions = $('.poll_page').length
        this.state.currentQuestion = 0
        this.state.nexButtonAvailable = this.state.numQuestions > 1
        this.state.submitButtonAvailable = this.state.numQuestions == 1
        this.setState(this.state)
    }

    componentDidMount()
    {
        const pollNamePos = this.props.path.pathname.search('/poll/') + '/poll/'.length
        const pollName = this.props.path.pathname.substring(pollNamePos)

        fetch(`/~9libucha/cgi-bin/poll?poll=${pollName}`, {method: 'get', credentials: 'include'})
            .then(response => {
                if(!response.ok)
                {
                    throw new Error("Fetch error")
                }
                return response.text()
            })
            .then(text => {
                this.handleResponse(text)
            })
            .catch((error) => {console.log(error)})
    }

    handlePreviousClick()
    {
        this.state.currentQuestion--
        this.state.previousButtonAvailable = this.state.currentQuestion > 0
        this.state.submitButtonAvailable = this.state.currentQuestion == this.state.numQuestions - 1
        this.state.nexButtonAvailable = this.state.currentQuestion < this.state.numQuestions - 1
        this.setState(this.state)
    }

    savePollData()
    {
        const formData = $('.poll').serializeArray()
        let processedData = {}
        formData.forEach((item, index) => {
            if(item['name'] in processedData)
            {
                if(processedData[item['name']].constructor.name == 'Array')
                {
                    processedData[item['name']].push(item['value'])
                }
                else
                {
                    processedData[item['name']] = [processedData[item['name']], item['value']]
                }
            }
            else
            {
                processedData[item['name']] = item['value']
            }
        })
        const dataJson = JSON.stringify(processedData)

        const pollName = $('.poll').attr('name')

        const request = window.indexedDB.open('pollDB', 1)
        request.onsuccess = (event) => {
            const db = event.target.result
            const transaction = db.transaction(pollName, 'readwrite')
            const dataStore = transaction.objectStore(pollName)
            dataStore.put(dataJson).onerror = (event) => {
                console.log('Failed to save poll data: ' + request.error)
            }
        }
        request.onerror = (event) => {
            console.log('Failed to open database: ' + request.error)
        }
        request.onupgradeneeded = (event) => {
            const db = event.target.result
            db.createObjectStore('template_poll', {autoIncrement: true})
            db.createObjectStore('test_poll', {autoIncrement: true})
        }
    }

    handleSubmitClick()
    {
        this.savePollData()
        this.props.navigate(`${this.props.homePath}/data`)
        this.setState(this.state)
    }

    handleNextClick()
    {
        this.state.currentQuestion++
        this.state.previousButtonAvailable = this.state.currentQuestion > 0
        this.state.submitButtonAvailable = this.state.currentQuestion == this.state.numQuestions - 1
        this.state.nexButtonAvailable = this.state.currentQuestion < this.state.numQuestions - 1
        this.setState(this.state)
        this.checkNextButtonAvailable()
    }

    checkNextButtonAvailable()
    {
        let nextActive = false;
        let page = $('.poll_page')[this.state.currentQuestion]

        $(page).find('.poll_checkbox').each((index, checkbox) =>
        {
            if($(checkbox).prop('checked'))
            {
                nextActive = true;
            }
        })

        $(page).find('.poll_radiobox').each((index, radiobox) =>
        {
            if($(radiobox).prop('checked'))
            {
                nextActive = true;
            }
        })

        if($(page).find('.poll_text_input').length > 0)
        {
            nextActive = true;
        }
        $(page).find('.poll_text_input').each((index, textInput) =>
        {
            if(!$(textInput).val())
            {
                nextActive = false;
            }
        })

        this.state.nextButtonActive = nextActive;
        this.setState(this.state);
    }

    render()
    {
        let nextActive = false;
        $('.poll_page').each((index, page) => {
            $(page).css('display', this.state.currentQuestion == index ? 'block' : 'none')
        })

        return (
            <div>
                <div className='poll_container' id='poll_container'></div>

                <div className='poll_navigation_buttons'>
                    {this.state.previousButtonAvailable && <PollNavigationButton
                        text={'Poprzednie'}
                        style={{float: 'left'}}
                        active={this.state.previousButtonActive}
                        clickCallback={this.handlePreviousClick} />}
                    {this.state.submitButtonAvailable && <PollNavigationButton
                        text={'Zakończ'}
                        style={{float: 'right'}}
                        active={this.state.nextButtonActive}
                        clickCallback={this.handleSubmitClick}/>}
                    {this.state.nexButtonAvailable && <PollNavigationButton
                        text={'Następne'}
                        style={{float: 'right'}}
                        active={this.state.nextButtonActive}
                        clickCallback={this.handleNextClick} />}
                </div>
            </div>
        )
    }
}

export default function(props) {
    const navigate = useNavigate()
    const path = useLocation()
    return <Poll {...props} navigate={navigate} path={path} />
}
//
// export default Poll;
