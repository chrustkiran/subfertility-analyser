import React from "react";
import {FinalDisease} from "../common/DiseaseTest";
import {TreatmentService} from "../service/TreatmentService";

export class TreatmentPage extends React.Component {
    state = {
        disease: {}
    }
    componentDidMount() {
        this.setState({disease: FinalDisease.value});
        FinalDisease.value.map(dis => {
            TreatmentService.getTreatment(dis).then(res => {
                console.log(res);
            });
        })

    }

    render() {
        return(
<div>
    Hi
</div>
        )
    }
}
