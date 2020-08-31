import React from "react";
import {DiseaseTest} from "../common/DiseaseTest";
import {Row, Col, Card, Form, Input, Select, Button, Radio} from "antd";
import {bloodgroup} from "../conf/Bloodgroup";


const formItemStyleObt = {width: '80%', float: "left"};

export class Test extends React.Component {
    state = {
        diseaseTest: {}
    }

    componentDidMount() {
        this.setState({diseaseTest: DiseaseTest.value});
    }

    displayDiseases = () => {
        let count = 0;
        return Object.keys(this.state.diseaseTest).map(disease => {
            count++;
            return (<div style={{textAlign: 'left'}}>{count}. {disease} </div>)
        })

    }

    onTestResValueChange = (disease, event) => {
        console.log(disease, event);
    }


    displayTests = () => {
        let count = 0;
        return Object.keys(this.state.diseaseTest).map(disease => {
            count++;
            return (
                <Form.Item label={disease} name={disease}>
                    {
                        this.state.diseaseTest[disease].map(test => {
                            return (
                                <Card title={(<b style={{textAlign: 'left'}}>{test.test}</b>)}>
                                    <Row>
                                        <Col flex={'50%'}>
                    <span>
                        {test['positiveResult']}
                    </span>
                                        </Col>
                                        <Col flex={'50%'}>
                <span>
                    <Radio.Group onChange={(event) => this.onTestResValueChange(disease, event)}>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={2}>No</Radio>
                    </Radio.Group>
                </span>
                                        </Col>
                                    </Row>
                                </Card>
                            )

                        })
                    }
                </Form.Item>
            )
        })
    }


    render() {
        console.log(this.state.diseaseTest)
        return (
            <div>
                <Row>
                    <Col flex={'650px'}>
                        <Card>
                            <Form layout={"vertical"}
                                  style={{marginTop: '5%'}}
                                  onValuesChange={this.onFormLayoutChange}
                                  onFinish={this.onFinish}>

                                {this.displayTests()}

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" onClick={this.onSubmit}
                                            type="primary">submit</Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                    <Col flex={'30%'}>

                    </Col>
                </Row>
                <br/>
                <br/>
            </div>
        );
    }
}
