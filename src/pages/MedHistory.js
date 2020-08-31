import React from "react";
import {Alert, Button, Col, Card, Form, Input, Row, Select} from "antd";
import {bloodgroup} from "../conf/Bloodgroup";
import {MedHistoryService} from "../service/MedHistoryService";
import {CaseUtil} from "../util/CaseUtil";
import {DiseaseService} from "../service/DiseaseService";
import {DiseaseTest} from "../common/DiseaseTest";

const {Option} = Select;

const formItemStyleObt = {width: '80%', float: "left"};

export class MedHistory extends React.Component {

    state = {
        medHistoryFetched: false,
        submitClicked: false,
        diseaseFetched: false,
    };

    medHistory = [];
    diseases = [];
    diseaseTests = {};

    constructor(props) {
        super(props);
        this.getAllMedHistory();
    }

    onInputValueChanges = (label, value) => {
        /*const obj = {};
        obj[label] = value;
        this.setState(obj);*/
    };

    getAllMedHistory = () => {
        this.medHistory = [];
        MedHistoryService.getMedHistory().then(res => {
            this.medHistory = res;
            this.setState({medHistoryFetched: true});
        });
    };

    displayMedHistoryFormItem = () => {
        return this.medHistory != undefined && this.medHistory.map(medHist => {
            return (
                <Form.Item label={CaseUtil.camelToNorm(medHist)} name={CaseUtil.camelToNorm(medHist)}
                           >
                    <Input style={formItemStyleObt} placeholder={CaseUtil.camelToNorm(medHist)} onChange={(event) => {
                        this.onInputValueChanges(medHist, event.target.value)
                    }}/>
                </Form.Item>
            )
        })
    };

    onSubmit = () => {
       /* this.setState({submitClicked: true});
        this.fetchDisease();*/
    };

    fetchDisease = (reqObj) => {
        this.diseases = [];
       // const reqObj = {name: this.state.Name, age: this.state.Age,smoking: this.state.Smoking, alcohol: this.state.Alcohol};
        DiseaseService.getMedHistory(reqObj).then(res => {
            Object.keys(res).forEach(disease => {
                this.diseases.push(disease.toString());
            });
            this.diseaseTests = res;
            DiseaseTest.value = res;
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
        if (values != null) {
            this.fetchDisease(values);
        }
        window.scrollTo(0, 0)
    };

    

    render() {
        return (
            <Row>
                <Col flex="650px">
                    <Card>
                    <Form layout={"vertical"}
                          style={{marginTop: '5%'}}
                          onValuesChange={this.onFormLayoutChange}
                    onFinish={this.onFinish}>
                        <Form.Item label="Name" name="Name" rules={[{required: true, message: 'Please enter your name'}]}>
                            <Input
                                style={formItemStyleObt} placeholder="Name" onChange={(event) => {
                                this.onInputValueChanges('Name', event.target.value)
                            }}
                            />
                        </Form.Item>
                        <Form.Item label="Age" name="Age" labelAlign={"right"}
                                   rules={[{required: true, message: 'Please enter your age'}]}>
                            <Input
                                style={formItemStyleObt} placeholder="Age" onChange={(event) => {
                                this.onInputValueChanges('Age', event.target.value)
                            }}
                            />
                        </Form.Item>

                        <Form.Item label="Blood Group" labelAlign={"right"} name="Blood group"
                                   rules={[{required: true, message: 'Please select blood group'}]}>
                            <Select onChange={(event) => {
                                this.onInputValueChanges('Blood_group', event)
                            }} style={formItemStyleObt} placeholder="Blood group">
                                {bloodgroup.map(bloodType => {
                                    return (<Option value={bloodType}>{bloodType} </Option>)
                                })}
                            </Select>
                        </Form.Item>

                        {this.displayMedHistoryFormItem()}

                        <Form.Item>
                            <Button type="primary" htmlType="submit" onClick={this.onSubmit}
                                    type="primary">submit</Button>
                        </Form.Item>
                    </Form>
                    </Card>
                </Col>
                <Col flex="auto">
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
            </Row>
        )

    }
}
