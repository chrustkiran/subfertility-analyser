import React from "react";
import {FinalDisease, FinalDiseaseAfterTreatment} from "../common/DiseaseTest";
import {TreatmentService} from "../service/TreatmentService";
import {Button, Card, Col, Form, Radio, Row, Spin, Typography} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBrain, faDiagnoses, faNotesMedical, faSpa, faStethoscope} from "@fortawesome/free-solid-svg-icons";
import {CaseUtil} from "../util/CaseUtil";

const {Title} = Typography;
const iconMap = {
    Theraphy: faSpa,
    Neuro: faBrain,
    Treatment: faDiagnoses,
    Stimulate: faDiagnoses,
    Basic: faDiagnoses,
    Over: faDiagnoses
}

const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

export class TreatmentPage extends React.Component {
    state = {
        disease: [],
        treatments: {}
    }

    componentDidMount() {
        this.setState({disease: FinalDisease.value});
        this.fetchTreatments();
    }

    fetchTreatments = () => {
        if (FinalDisease.value != null) {
            FinalDisease.value.map(dis => {
                TreatmentService.getTreatment(dis).then(res => {
                    const dummyObj = {}
                    Object.keys(res).forEach(treatMeth => {
                        const treatmentArray = [];
                        res[treatMeth].forEach(treatment => {
                            var treatObj = {"treatment" : treatment, "result" : ""}
                            treatmentArray.push(treatObj);
                        })
                        dummyObj[treatMeth] = treatmentArray;
                    });
                    const obj = this.state.treatments;
                    obj[dis] = dummyObj;
                    this.setState({treatments: obj});
                });
            })
        }

    }

    onTreatMentValueChange = (treatmentObj, event) => {
        const result = event.target.value;
        treatmentObj["result"] = result;
    }

    displayTreatments = () => {
        if (this.state.treatments != null && Object.keys(this.state.treatments)) {
            return Object.keys(this.state.treatments).map(disease => {
                return (
                    <Form.Item label={(
                        <Title level={3} type={'danger'}> <FontAwesomeIcon icon={faStethoscope}/> {disease}</Title>)}
                               name={disease}>
                        {
                            Object.keys(this.state.treatments[disease]).map(treatMethod => {
                                return (
                                    <Card style={{textAlign: 'left'}}
                                          title={(<span><FontAwesomeIcon color={"green"}
                                                                         icon={iconMap[CaseUtil.camelToNorm(treatMethod).split(' ')[1]]}/> {CaseUtil.camelToNorm(treatMethod).split(' ')[1]}</span>)}>
                                        {
                                            this.state.treatments[disease][treatMethod].map(treatmentObj => {
                                                return (<Row>
                                                    <Col flex={'50%'}>
                                            <span>
                                                {CaseUtil.testResToNormat(treatmentObj.treatment)}
                                            </span>
                                                    </Col>
                                                    <Col flex={'50%'}>
                                            <span>
                                                <Radio.Group
                                                    onChange={(event) => this.onTreatMentValueChange(treatmentObj, event)}>
                                                    <Radio style={{color: "green"}} value={SUCCESS}>Success</Radio>
                                                    <Radio style={{color: "red"}} value={FAILURE}>Failure</Radio>
                                                </Radio.Group>
                                            </span>
                                                    </Col>
                                                </Row>)

                                            })
                                        }
                                        {/*<Row>
                                            <Col flex={'50%'}>
                                            <span>
                                                {CaseUtil.testResToNormat(treatMethod['positiveResult'])}
                                            </span>
                                            </Col>
                                            <Col flex={'50%'}>
                                            <span>
                                                <Radio.Group
                                                    onChange={(event) => this.onTestResValueChange(treatMethod, event)}>
                                                    <Radio style={{color: "green"}} value={"YES"}>Yes</Radio>
                                                    <Radio style={{color: "red"}} value={"NO"}>No</Radio>
                                                </Radio.Group>
                                            </span>
                                            </Col>
                                        </Row>*/}
                                    </Card>
                                )
                            })
                        }
                    </Form.Item>
                )
            })
        }
    }

    getFinalDiseases = () => {
        const finalDiseaseArray = [];
        for(const disease of Object.keys(this.state.treatments)) {
            for(const treatMethod of Object.keys(this.state.treatments[disease])) {
                for(const treatmentObj of this.state.treatments[disease][treatMethod]) {
                    if (treatmentObj.result === FAILURE) {
                        if (!finalDiseaseArray.includes(disease)) {
                            finalDiseaseArray.push(disease);
                        }
                    }
                }
            }
        }
        return finalDiseaseArray;
    }

    onSubmit = () => {
        FinalDiseaseAfterTreatment.value = [];
        const finalDiseases = this.getFinalDiseases();
        FinalDiseaseAfterTreatment.value = finalDiseases;
        FinalDiseaseAfterTreatment.updated = true;
        this.props.update();
        window.scrollTo(0,0);
    }

    render() {
        return (
            <div>
                {Object.keys(this.state.treatments).length == 0 && <Spin style={{marginTop: '10%'}} size="large"/>}
                {Object.keys(this.state.treatments).length > 0 &&
                <Card style={{marginTop: '5%'}}>
                    <Form layout={"vertical"}>
                        {this.displayTreatments()}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" onClick={this.onSubmit}
                                    type="primary">check</Button>
                        </Form.Item>
                    </Form>
                </Card>
                }
            </div>
        )
    }
}
