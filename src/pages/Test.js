import React from "react";
import {DiseaseTest} from "../common/DiseaseTest";
import {Row, Col, Card, Form, Input, Select, Button, Radio, Tag, Typography, Alert} from "antd";
import {ExceptionOutlined} from '@ant-design/icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faStethoscope, faNotesMedical } from '@fortawesome/free-solid-svg-icons'
import {CaseUtil} from "../util/CaseUtil";


const formItemStyleObt = {width: '80%', float: "left"};

const { Title } = Typography;
const YES = 'yes';
const NO = 'no'

export class Test extends React.Component {
    state = {
        diseaseTest: {},
        checkClicked: false
    }

    componentDidMount() {
        window.scrollTo(0,0);
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

    onFinish = (values) => {
        if (values != null) {
            // this.fetchDisease(values);
        }
    }


    displayTests = () => {
        return Object.keys(this.state.diseaseTest).map(disease => {
            return (
                <Form.Item label={(  <Title level={3} type={'danger'}>  <FontAwesomeIcon icon={faStethoscope} /> {disease}</Title>)} name={disease}>
                    {
                        this.state.diseaseTest[disease].map(test => {
                            return (
                                <Card style={{textAlign: 'left'}} title={(<span><FontAwesomeIcon icon={faNotesMedical} />  {test.test}</span>)}>
                                    <Row>
                                        <Col flex={'50%'}>
                                            <span>
                                                {CaseUtil.testResToNormat(test['positiveResult'])}
                                            </span>
                                        </Col>
                                        <Col flex={'50%'}>
                                            <span>
                                                <Radio.Group onChange={(event) => this.onTestResValueChange(disease, event)}>
                                                    <Radio style={{color: "green"}} value={YES}>Yes</Radio>
                                                    <Radio style={{color: "red"}} value={NO}>No</Radio>
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
                                            type="primary">check</Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                    <Col flex={'30%'}>
                        {this.state.diseaseFetched && this.diseases.length > 0 &&
                        <Alert style={{marginTop: '5%'}}
                               message="Please conduct these tests to confirm"
                               description={
                                   <div style={{textAlign: 'left', marginLeft: '40%'}}>
                                       {this.displayTests()}
                                   </div>
                               }
                               type="warning"
                        />

                        }
                    </Col>
                </Row>
                <br/>
                <br/>
            </div>
        );
    }
}
