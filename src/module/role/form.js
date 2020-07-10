import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Axios from 'axios';

class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campRole: "",
        }
    }

    render() {
        return(
            <form>
                <div class="form-group">
                    <label for="inputRole">Role</label>
                    <input type="text" class="form-control" id="inputRole" placeholder="Role" value={this.state.campRole} onChange={(value)=> this.setState({campRole:value.target.value})}/>
                </div>

                <button type="submit" class="btn btn-primary" onClick={()=>this.sendSave()}>Save</button>
            </form>
        );
    }

    sendSave() {
        if (this.state.campRole === "") {
            alert('Insert role description')
        } else {
            const baseUrl = "http://localhost:3000/role/create"

            const datapost = {
                role: this.state.campRole
            }

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