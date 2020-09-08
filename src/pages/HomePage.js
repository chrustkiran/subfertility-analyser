import React from "react";
import {Button, message, Select, Steps, Layout} from 'antd';
import {MedHistory} from "./MedHistory";
import {TestPage} from "./TestPage";
import {TreatmentPage} from "./TreatmentPage";
import {Introduction} from "./Introduction";
import {DiseaseTest, FinalDisease, FinalDiseaseAfterTreatment, IntroductionVal} from "../common/DiseaseTest";
import {ResultPage} from "./ResultPage";

const {Step} = Steps;
const {Option} = Select;
const {Footer} = Layout;

export class HomePage extends React.Component {

    state = {
        current: 0,
        updated: 0,
    };

    steps = [
        {
            title: 'Introduction',
            content: (<Introduction update={() => {this.updateState()}}></Introduction>)
        },
        {
            title: 'History',
            content: (<MedHistory update={() => {this.updateState()}}></MedHistory>),
        },
        {
            title: 'Tests',
            content: (<TestPage update={() => {this.updateState()}}></TestPage>),
        },
        {
            title: 'Treatments',
            content: (<TreatmentPage update={() => {this.updateState()}}></TreatmentPage>),
        },
        {
            title: 'Results',
            content: (<ResultPage></ResultPage>),
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

    validation = (current) => {
        if (current == 0) {
            if (Object.keys(IntroductionVal.value).length == 0) {
                return true;
            } else {
                return false;
            }
        } else if (current == 1) {
            if (Object.keys(DiseaseTest.value).length == 0) {
                return true;
            } else {
                return false;
            }
        }
        else if (current == 2) {
            if ((FinalDisease.value).length == 0) {
                return true;
            } else {
                return false;
            }
        }
        else if (current == 3) {
            if (!FinalDiseaseAfterTreatment.updated) {
                return true;
            } else {
                return false;
            }
        }
    }

    updateState = () => {
        this.setState({updated: this.state.updated++});
    }


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
                        <Footer style={{
                            height: '20',
                            position: 'fixed',
                            bottom: 0,
                            width: '100%',
                            left: 0,
                            background: "transparent"
                        }}>
                            <div className="steps-action">
                                {current < steps.length - 1 && (
                                    <Button disabled={this.validation(current)} type="primary" onClick={() => this.next()}>
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
                        </Footer>
                    </div>
                </div>
            </div>
        )
    }

}
