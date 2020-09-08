import React from "react";
import {DiseaseTest, FinalDisease} from "../common/DiseaseTest";
import {Row, Col, Card, Form, message, Button, Radio, Tag, Typography, Alert} from "antd";
import {ExceptionOutlined} from '@ant-design/icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStethoscope, faNotesMedical} from '@fortawesome/free-solid-svg-icons'
import {CaseUtil} from "../util/CaseUtil";


const formItemStyleObt = {width: '80%', float: "left"};

const {Title} = Typography;
const YES = 'yes';
const NO = 'no'

export class TestPage extends React.Component {
    state = {
        diseaseTest: {},
        checkClicked: false,
        diseases: [],
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.setState({diseaseTest: DiseaseTest.value});
    }

    displayDiseases = () => {
        let count = 0;
        return Object.keys(this.state.diseaseTest).map(disease => {
            count++;
            return (<div style={{textAlign: 'left'}}>{count}. {disease} </div>)
        })

    }

    onTestResValueChange = (test, event) => {
        const result = event.target.value;
        test['result'] = result;

    }

    removeResultNoDiseases = () => {
        this.setState({diseases: Object.keys(DiseaseTest.value)});
        Object.keys(this.state.diseaseTest).map(disease => {
            this.state.diseaseTest[disease].map(test => {
                if (test['result'] === NO) {
                    const index = this.state.diseases.indexOf(disease);
                    if (index > -1) {
                        this.state.diseases.splice(index, 1);
                    }
                }
            })
        });
    }

    checkAllTestConducted = () => {
        for(const disease of Object.keys(this.state.diseaseTest)) {
            const testArray = [];
            for(const test of this.state.diseaseTest[disease]) {
                if (!testArray.includes(test.test)) {
                    testArray.push(test.test);
                    if (!test.hasOwnProperty('result')) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    onFinish = (values) => {
        if (!this.checkAllTestConducted()) {
            message.error({
                content: 'Please conduct all tests',
                className: 'custom-class',
                style: {
                    marginTop: '20vh',
                },
            });
        } else {
            this.removeResultNoDiseases();
            FinalDisease.value = this.state.diseases;
            this.setState({checkClicked: true});
            window.scrollTo(0,0);
            this.props.update();
        }

    }


    displayTests = () => {
        return Object.keys(this.state.diseaseTest).map(disease => {
            const testArray = [];
            return (
                <Form.Item label={(
                    <Title level={3} type={'danger'}> <FontAwesomeIcon icon={faStethoscope}/> {disease}</Title>)}
                           name={disease}>
                    {
                        this.state.diseaseTest[disease].map(test => {
                            if (!testArray.includes(test['positiveResult'])) {
                                testArray.push(test['positiveResult'])
                            return (
                                <Card style={{textAlign: 'left'}}
                                      title={(<span><FontAwesomeIcon icon={faNotesMedical}/> {test.test}</span>)}>
                                    <Row>
                                        <Col flex={'50%'}>
                                            <span>
                                                {CaseUtil.testResToNormat(test['positiveResult'])}
                                            </span>
                                        </Col>
                                        <Col flex={'50%'}>
                                            <span>
                                                <Radio.Group
                                                    onChange={(event) => this.onTestResValueChange(test, event)}>
                                                    <Radio style={{color: "green"}} value={YES}>Yes</Radio>
                                                    <Radio style={{color: "red"}} value={NO}>No</Radio>
                                                </Radio.Group>
                                            </span>
                                        </Col>
                                    </Row>
                                </Card>
                            )
                        }
                        })
                    }
                </Form.Item>
            )
        })
    }

    displayFinalDiseases = () => {
        let countDis = 0;
        return this.state.diseases.map(disease => {
            countDis++;
            return (
                <div>
                    <div style={{fontWeight: 'bold'}}>{countDis}. {CaseUtil.camelToNorm(disease)}</div>
                    <br/>
                </div>

            )
        });
    }


    render() {
        return (
            <div>
                {Object.keys(this.state.diseaseTest).length > 0 ?
                <div>
                    <Row>
                        <Col flex={'650px'}>
                            <Card style={{marginTop: '5%'}}>
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
                        <Col flex={'5%'}>
                        </Col>
                        <Col flex={'auto'}>
                            {this.state.checkClicked &&
                            <Alert style={{marginTop: '5%'}}
                                   message="Final Diseases"
                                   description={
                                       <div style={{textAlign: 'left', marginLeft: '40%'}}>
                                           <br/>
                                           {this.displayFinalDiseases()}
                                       </div>
                                   }
                                   type="error"
                            />

                            }
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                </div> :
                    <div style={{textAlign: 'center', marginTop: '10%'}}>
                        No Diseases!
                    </div>
                }
            </div>
        );
    }
}
