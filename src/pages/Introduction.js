import React from "react";
import {Button, Card, Col, Form, Input, Select, message, Spin} from "antd";
import {bloodgroup} from "../conf/Bloodgroup";
import {MedHistoryService} from "../service/MedHistoryService";
import {CaseUtil} from "../util/CaseUtil";
import {IntroductionVal} from "../common/DiseaseTest";
import {IntroductionService} from "../service/IntroductionService";

const formItemStyleObt = {width: '80%', float: "left"};
const {Option} = Select;

export class Introduction extends React.Component {

    state = {
        intro: []
    }

    componentDidMount() {
        IntroductionService.getIntroduction().then(res => {
            this.setState({intro: res});
        });
    }

    onInputValueChanges = (formItem, value) => {
        console.log(formItem, value);
    }

    onFinish = (values) => {
        if (values != null) {
            const age = parseInt(values['Age'])
            if (age > 50) {
                message.error({
                    style: {
                        marginTop: '20vh',
                    },
                    content : 'This patient has infertility'
                });
            } else {
                IntroductionVal.value = values;
                this.props.update();
                message.success('Saved successfully')
            }
        }
    };

    displayIntroductions = () => {
        if (this.state.intro.length > 0) {
            return this.state.intro.reverse().map(introItem => {
                return (
                    <Form.Item label={CaseUtil.snakeToNorm(introItem)} name={CaseUtil.snakeToNorm(introItem)}
                               rules={[{required: true, message: 'Please enter the value'}]}>
                        {
                            introItem === 'Blood_Group' ? <Select onChange={(event) => {
                                    this.onInputValueChanges('Blood_group', event)
                                }} style={formItemStyleObt} placeholder="Blood group">
                                    {bloodgroup.map(bloodType => {
                                        return (<Option value={bloodType}>{bloodType} </Option>)
                                    })}
                                </Select> :
                                <Input
                                    style={formItemStyleObt} placeholder={CaseUtil.snakeToNorm(introItem)}
                                    onChange={(event) => {
                                        this.onInputValueChanges(introItem, event.target.value)
                                    }}
                                />

                        }

                    </Form.Item>
                )
            });
        }
    }

    render() {
        return (
            <div>
                {this.state.intro.length === 0 && <Spin  size="large" />}
            <Card style={{marginTop: '5%'}}>
                <Form layout={"vertical"}
                      onValuesChange={this.onFormLayoutChange}
                      onFinish={this.onFinish}>
                    {this.displayIntroductions()}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={this.onSubmit}
                                type="primary">submit</Button>
                    </Form.Item>
                </Form>
            </Card>
            </div>
        )
    }
}
