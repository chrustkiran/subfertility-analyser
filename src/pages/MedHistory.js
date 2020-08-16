import React from "react";
import {Alert, Button, Col, Form, Input, Row, Select} from "antd";
import {bloodgroup} from "../conf/Bloodgroup";
import {MedHistoryService} from "../service/MedHistoryService";
import {CaseUtil} from "../util/CaseUtil";

const {Option} = Select;

export class MedHistory extends React.Component {

    state = {
        medHistoryFetched: false
    };

    medHistory = [];

    constructor(props) {
        super(props);
        this.getAllMedHistory();
    }

    onInputValueChanges = (label, value) => {
        const obj = {};
        obj[label] = value;
        this.setState(obj);
    };

    getAllMedHistory = () => {
        MedHistoryService.getMedHistory().then(res => {
         this.medHistory = res;
         this.setState({medHistoryFetched: true});
      });
    };

    displayMedHistoryFormItem = () => {
        return this.medHistory.map(medHist => {
            return (
                <Form.Item label="">
                    <Input style={{width: '80%'}} placeholder={CaseUtil.camelToNorm(medHist)} onChange={(event) => {
                        this.onInputValueChanges(medHist, event.target.value)
                    }}/>
                </Form.Item>
            )
        })
    };

    render() {
        return (
        <Row>
            <Col flex="650px">
                <ScrollView>
                <Form style={{textAlign: 'left', marginLeft: '5%', marginTop: '5%'}}
                      onValuesChange={this.onFormLayoutChange}>
                    <Form.Item label="">
                        <Input style={{width: '80%'}} placeholder="Name" onChange={(event) => {
                            this.onInputValueChanges('Name', event.target.value)
                        }}/>
                    </Form.Item>
                    <Form.Item label="">
                        <Input style={{width: '80%'}} placeholder="Age" onChange={(event) => {
                            this.onInputValueChanges('Age', event.target.value)
                        }}/>
                    </Form.Item>

                    <Form.Item label="">
                        <Select onChange={(event) => {
                            this.onInputValueChanges('Blood_group', event)
                        }} style={{width: '80%'}} placeholder="Blood group">
                            {bloodgroup.map(bloodType => {
                                return (<Option value={bloodType}>{bloodType} </Option>)
                            })}
                        </Select>
                    </Form.Item>

                    {this.displayMedHistoryFormItem()}

                    <Form.Item>
                        <Button type="primary">submit</Button>
                    </Form.Item>
                </Form>
                </ScrollView>
            </Col>
            <Col flex="auto">
                <Alert style={{marginTop: '5%'}}
                       message="Disease"
                       description={
                           <div style={{textAlign: 'left', marginLeft: '20%'}}>
                               PreviousMedicalAndSurgicalHistory
                               <br/>
                               PreviousHistoryofPelvicInflammatoryDisease
                           </div>
                       }
                       type="error"
                />
            </Col>
        </Row>
    )

    }
}
