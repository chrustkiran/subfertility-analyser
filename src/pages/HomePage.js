import React from "react";
import { Form, Input, Button, Radio, Tag, Divider, List } from 'antd';
import {OwlService} from "../service/OwlService";

export class HomePage extends React.Component {

    state = {
        tag: '',
        classes: [],
        objects: []
    };
    tags = [];

    onFormLayoutChange = (event) => {
        console.log(event);
    };

    onTaggingChange = (event) => {
     this.setState({tag: event.target.value});
    };

    onTaggingEnterPress = (event) => {
        this.tags.push(this.state.tag);
        this.setState({tag: ''});
        // this.setState({tags:this.state.tags.push(this.state.tag)});
    };

    viewTag = () => {
        return this.tags.map(tag =>
           (
              <Tag onClick={() => {this.onobjTagClick(tag)}} color={'green'}>{tag}</Tag>
          )
      );
    };

    handleRadioChange = (event) => {
        switch (event.target.value) {
            case 'class':
                this.classOnClick();
                break;
            case 'object':
                this.objectOnClick();
                break;
        }
    };

    classOnClick = () => {
        OwlService.getClass().then(data => {
            this.setState({objects : []});
            this.setState({classes : data});
        });
    };

    objectOnClick = () => {
        OwlService.getObject().then(data => {
            this.setState({classes : []});
            this.setState({objects : data});
        });
    };

    viewClass= () => {
        return this.state.classes.map(cls => (
            <Tag>{cls}</Tag>
        ));
    };

    viewObject= () => {
        return this.state.objects.map(obj => (
            <Tag>{obj}</Tag>
        ));
    };

    onobjTagClick = (obj) =>{
        console.log('clicked', obj);
        const index =  this.tags.indexOf(obj);
        if (index > -1) {
            this.tags.splice(index, 1);
            this.setState({tag: ''});
        }
    }

    render() {
        return(
            <div style={{padding: '10%'}}>
            <Form
                onValuesChange={this.onFormLayoutChange}>
                <Form.Item label="">
                    <Input style={{width: '50%'}} placeholder="Name" />
                </Form.Item>
                <Form.Item label="">
                    <Input style={{width: '50%'}} placeholder="Age" />
                </Form.Item>
                <div>
                    {this.viewTag()}
                </div>
                <Form.Item label="">
                    <Input value={this.state.tag} onPressEnter={this.onTaggingEnterPress} onChange={this.onTaggingChange} style={{width: '50%'}} placeholder="Tags" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary">Submit</Button>
                </Form.Item>
            </Form>
                <Divider></Divider>
                <div>
                    <Radio.Group onChange={this.handleRadioChange}>
                        <Radio.Button value="class">Class</Radio.Button>
                        <Radio.Button value="object">Object</Radio.Button>
                    </Radio.Group>
                    <br/> <br/>
                    <div>
                        {this.viewClass()}
                        {this.viewObject()}
                    </div>
                </div>
            </div>
        )
    }

}
