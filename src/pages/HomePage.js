import React from "react";
import {Button, message, Select, Steps} from 'antd';
import {MedHistory} from "./MedHistory";
import {Test} from "./Test";
import {DiseaseTest} from "../common/DiseaseTest";

const {Step} = Steps;
const {Option} = Select;

export class HomePage extends React.Component {

    state = {
        current: 0,
    };


    steps = [
        {
            title: 'History',
            content: (<MedHistory></MedHistory>),
        },
        {
            title: 'Tests',
            content: (<Test></Test>),
        },
        {
            title: 'Treatments',
            content: 'Last-content',
        },
    ];

    next = () => {
        const current = this.state.current + 1;
        this.setState({current});
    };

    prev = () => {
        const current = this.state.current - 1;
        this.setState({current});
    };


    render() {
        const {current} = this.state;
        const steps = this.steps;
        return (
            <div>
                <div style={{padding: '2%'}}>
                    {this.state.name}
                    <Steps current={current}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title}/>
                        ))}
                    </Steps>
                    <div className="steps-content">
                        {steps[current].content}

                        <div className="steps-action">
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => this.next()}>
                                    Next
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                    Done
                                </Button>
                            )}
                            {current > 0 && (
                                <Button style={{margin: '0 8px'}} onClick={() => this.prev()}>
                                    Previous
                                </Button>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}
