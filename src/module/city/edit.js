import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Axios from 'axios';

class EditComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listState: [],
            campCity: '',
            selectState: 0
        }
        this.handleSelectionState = this.handleSelectionState.bind(this);
    }

    handleSelectionState(e) {
        this.setState({selectState: e.target.value});
    }

    componentDidMount() {
        Axios.get("htttp://localhost:3000/state/list")
        .then(res => {
            const data = res.data.data;
            this.setState({listState: data});
        })
        .catch(error => {
            alert(error);
        })

        let stateId = this.props.match.params.id;
        const url = "http://localhost:3000/city/get/" + stateId;

        Axios.get(url)
        .then(res=> {
            if(res.data.success) {
                const data = res.data.data[0]
                this.setState({
                    dataState: data,
                    campCity: data.name,
                    selectState: data.stateId,
                })
            } else {
                alert("Error web service")
            }
        })
        .catch(error => {
            console.log(this.state);
            alert("Error server " + error)
        })
    }

    render() {
        return(
            <form>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputState">State</label>
                        <input type="text" class="form-control" id="inputState" placeholder="State" value={this.state.campState} onChange={(value)=> this.setState({campState:value.target.value})}/>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputFu">State</label>
                        <select id="state" value={this.state.selectState} class="form-control" onChange={this.handleSelectionState}>
                            {this.state.listState.map((item, index) => (
                                <option key={index} value={item.id}>{item.state}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" onClick={()=>this.sendUpdate()}>Update</button>
            </form>
        );
    }
    
    sendUpdate() {
        let stateId = this.props.match.params.id;
        const baseUrl = "http://localhost:3000/city/update/" + stateId;
        const datapost = {
            city: this.state.campCity,
            stateId: this.state.selectState
        }

        Axios.post(baseUrl, datapost)
        .then(response => {
            if(response.data.success === true) {
                alert(response.data.message)
            } else {
                alert("Error")
            }
        })
        .catch(error => {
            alert("Error 34 " + error)
        })
    }
}

export default EditComponent;