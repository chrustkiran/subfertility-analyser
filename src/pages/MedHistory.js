import React from "react";
import {Alert, Button, Col, Card, Form, Input, Row, Select, Spin, Typography} from "antd";
import {bloodgroup} from "../conf/Bloodgroup";
import {MedHistoryService} from "../service/MedHistoryService";
import {CaseUtil} from "../util/CaseUtil";
import {DiseaseService} from "../service/DiseaseService";
import {DiseaseTest} from "../common/DiseaseTest";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStethoscope} from "@fortawesome/free-solid-svg-icons";

const {Option} = Select;
const {Title} = Typography;
const formItemStyleObt = {width: '80%', float: "left"};

export class MedHistory extends React.Component {

    state = {
        medHistoryFetched: false,
        symptomAnalysisFetched: false,
        riskBehavioursFetched: false,
        submitClicked: false,
        diseaseFetched: false,
    };

    medHistory = [];
    allSymptoms = [];
    riskBehaviours = [];
    diseases = [];
    diseaseTests = {};

    constructor(props) {
        super(props);
        this.getAllSymptomAnalysis();
        this.getAllRisBehaviour();
    }

    onInputValueChanges = (label, value) => {

    };

    getAllSymptomAnalysis = () => {
        this.allSymptoms = [];
        MedHistoryService.getSymptomAnalysis().then(res => {
            this.allSymptoms = res;
            this.setState({symptomAnalysisFetched: true});
        });
    }

    getAllRisBehaviour = () => {
        this.riskBehaviours = [];
        MedHistoryService.getRiskBehaviour().then(res => {
            this.riskBehaviours = res;
            this.setState({riskBehavioursFetched: true});
        });
    }


    displaySymptomFormItem = () => {
        return this.allSymptoms != undefined && Object.keys(this.allSymptoms).map(symptom => {
            if (Object.keys(this.allSymptoms[symptom]).length > 0 && this.allSymptoms[symptom].length == undefined) {
                return (<div>
                        <Title style={{fontSize: 18}} underline>{CaseUtil.camelToNorm(symptom)}</Title>
                        {Object.keys(this.allSymptoms[symptom]).reverse().map(subSymptom => {
                            return (
                                <Card>
                                    <Title style={{fontSize: 15}}
                                           type={"secondary"}>{CaseUtil.camelToNorm(subSymptom)}</Title>
                                    {
                                        this.allSymptoms[symptom][subSymptom].length > 0 && this.allSymptoms[symptom][subSymptom].reverse().map(instance => {
                                            return (
                                                <Form.Item label={CaseUtil.snakeToNorm(instance)}
                                                           name={CaseUtil.NormToSnake(CaseUtil.camelToNorm(subSymptom)) + '_' + instance}
                                                >
                                                    <Input style={formItemStyleObt}
                                                           placeholder={CaseUtil.snakeToNorm(instance)}
                                                           onChange={(event) => {
                                                               this.onInputValueChanges(instance, event.target.value)
                                                           }}/>
                                                </Form.Item>
                                            )
                                        })
                                    } {
                                    (
                                        this.allSymptoms[symptom][subSymptom].length == 0 &&
                                        <Form.Item label={CaseUtil.camelToNorm(subSymptom)} name={CaseUtil.NormToSnake(CaseUtil.camelToNorm(subSymptom))}>
                                            <Input style={formItemStyleObt} placeholder={subSymptom}
                                                   onChange={(event) => {
                                                       this.onInputValueChanges(subSymptom, event.target.value)
                                                   }}/>
                                        </Form.Item>
                                    )
                                }
                                </Card>
                            )
                        })}
                    </div>
                )
            } else if (symptom.length > 0) {
                return (
                    <Form.Item label={CaseUtil.camelToNorm(symptom)} name={CaseUtil.NormToSnake(CaseUtil.camelToNorm(symptom))}
                    >
                        <Input style={formItemStyleObt} placeholder={CaseUtil.camelToNorm(symptom)}
                               onChange={(event) => {
                                   this.onInputValueChanges(symptom, event.target.value)
                               }}/>
                    </Form.Item>
                )
            }
        })
    };

    displayRiskBehaviour = () => {
        return this.riskBehaviours != undefined && this.riskBehaviours.map(riskBehaviour => {
            return (
                <Form.Item label={CaseUtil.camelToNorm(riskBehaviour)} name={CaseUtil.NormToSnake(CaseUtil.camelToNorm(riskBehaviour))}
                >
                    <Input style={formItemStyleObt} placeholder={CaseUtil.camelToNorm(riskBehaviour)}
                           onChange={(event) => {
                               this.onInputValueChanges(riskBehaviour, event.target.value)
                           }}/>
                </Form.Item>
            )
        })
    }


    fetchDisease = (reqObj) => {
        this.diseases = [];
        DiseaseService.getMedHistory(reqObj).then(res => {
            this.setState({submitClicked: false})
            Object.keys(res).forEach(disease => {
                this.diseases.push(disease.toString());
            });
            this.diseaseTests = res;
            DiseaseTest.value = res;
            console.log(DiseaseTest.value);
            this.props.update();
            this.setState({diseaseFetched: true});
        });
    };

    displayDisease = () => {
        let count = 0;
        if (this.state.diseaseFetched) {
            if (this.diseases.length > 0) {
                return this.diseases.map(dis => {
                    count++;
                    return (<p>{count}. {CaseUtil.camelToNorm(dis)}</p>)
                });
            } else {
                return (<div> No Diseases</div>)
            }
        }
    };

    displayTests = () => {
        if (this.state.diseaseFetched && this.diseases.length > 0) {
            let countDis = 0;
            return this.diseases.map(disease => {
                const testArr = [];
                countDis++;
                return (
                    <div>
                        <div style={{fontWeight: 'bold'}}>{countDis}. {CaseUtil.camelToNorm(disease)}</div>
                        {
                            this.diseaseTests[disease].map(testObj => {
                                if (!testArr.includes(testObj.test)) {
                                    testArr.push(testObj.test);
                                    return (<div> &nbsp;&nbsp;{testObj.test}</div>)
                                }
                            })}
                        <br/>
                    </div>

                )
            })
        }
    };

    onFinish = (values) => {
        this.setState({submitClicked: true})
        if (values != null) {
            this.fetchDisease(values);
        }
        window.scrollTo(0, 0)
    };


    render() {
        return (
            <div>
                {!this.state.symptomAnalysisFetched && <Spin style={{marginTop: '10%'}} size="large"/>}
                {this.state.symptomAnalysisFetched && <Row>
                    <Col flex="650px">
                        <Card style={{marginTop: '5%'}}>
                            <Form layout={"vertical"}
                                  onValuesChange={this.onFormLayoutChange}
                                  onFinish={this.onFinish}>

                                {this.displaySymptomFormItem()}
                                <Card>
                                    <Title style={{fontSize: 15}}
                                           type={"secondary"}>{"Risk Behaviour"}</Title>
                                    {this.displayRiskBehaviour()}
                                </Card>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" onClick={this.onSubmit}
                                            type="primary">submit</Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                    <Col flex={'15px'}></Col>
                    <Col flex="auto">
                        {this.state.submitClicked && <Spin style={{marginTop: '30%'}} size="large"/>}
                        {this.state.diseaseFetched &&
                        <Alert style={{marginTop: '5%'}}
                               message="Patient may have these diseases"
                               description={
                                   <div style={{textAlign: 'left', marginLeft: '40%'}}>
                                       {this.displayDisease()}
                                   </div>
                               }
                               type="error"
                        />

                        }
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
                </Row>}
            </div>
        )

    }
}
