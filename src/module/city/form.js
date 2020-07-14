import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Axios from 'axios';

class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listState: [],
            campCity: "",
            selectState: 0,
        }
        this.handleSelectItem = this.handleSelectItem.bind(this);
    }

    componentDidMount() {
        Axios.get("http://localhost:3000/state/list/")        
        .then(res => {
            console.log(res.data);
            const data = res.data.data;
            this.setState({ listState:data });
        })
        .catch(error => {
            alert(error);
        })
    }

    handleSelectItem(e) {
        this.setState({selectState: e.target.value})
    }

    render() {
        return(
            <form>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputCity">City</label>
                        <input type="text" class="form-control" id="inputCity" placeholder="City" value={this.state.campCity} onChange={(value)=> this.setState({campCity:value.target.value})}/>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="state">State</label>
                        <select id="state" value={this.state.selectState} class="form-control" onChange={this.handleSelectItem}>
                            <option>Choose...</option>
                            {this.state.listState.map((item, index) => (
                                <option key={index} value={item.id}>{item.state}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary" onClick={()=>this.sendSave()}>Save</button>
            </form>
        );
    }

    sendSave() {
        if (this.state.campCity === "") {
            alert('Insert city name')
        }else if (this.state.selectState === 0) {
            alert('Select State')
        } else {
            const baseUrl = "http://localhost:3000/city/create"

            const datapost = {
                city: this.state.campCity,
                state: this.state.selectState,
            }

            alert(this.state.campCity + ' ' + this.state.selectState);

            Axios.post(baseUrl, datapost)
            .then(response => {
                if (response.data.sucess === true) {
                    alert(response.data.message)
                } else {
                    alert(response.data.message)
                }
            })
            .catch(error => {
                alert("Error 34 " + error)
            })
        }
    }
}

export default FormComponent;