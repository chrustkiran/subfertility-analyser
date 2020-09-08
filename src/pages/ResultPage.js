import React from "react";
import {FinalDiseaseAfterTreatment} from "../common/DiseaseTest";
import {Result, Typography} from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';

const { Paragraph, Text } = Typography;

export class ResultPage extends React.Component {
    state = {
        finalDisease : []
    }
    componentDidMount() {
        this.setState({finalDisease: FinalDiseaseAfterTreatment.value});
    }

    render() {
        return(
            <div>
                {
                    this.state.finalDisease.length == 0 &&   <Result
                        status="success"
                        title="Great!"
                        subTitle="You have healed her!"
                    />
                }

                {
                    this.state.finalDisease.length > 0 &&   <Result
                        status="error"
                        title="Not success!"
                        subTitle="Still she is in infertility state"
                    >
                        <div className="desc">
                            <Paragraph>
                                <Text
                                    strong
                                    style={{
                                        fontSize: 16,
                                    }}
                                >
                                    These diseases are still there
                                </Text>
                            </Paragraph>
                            {
                                this.state.finalDisease.map(disease => {
                                    return (<Paragraph>
                                        <CloseCircleOutlined className="site-result-demo-error-icon" /> {disease}
                                    </Paragraph>)
                                })
                            }
                        </div>
                    </Result>
                }

            </div>
        )
    }
}
