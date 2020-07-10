import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Axios from 'axios';

class EditComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campRole: ''
        }
    }

    componentDidMount() {
        let roleId = this.props.match.params.id;
        const url = "http://localhost:3000/role/get/" + roleId;
        Axios.get(url)
        .then(res=> {
            if(res.data.success) {
                const data = res.data.data[0]
                this.setState({
                    dataRole: data,
                    campRole: data.role,
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
                <div class="form-group">
                    <label for="inputRole">Role</label>
                    <input type="text" class="form-control" id="inputRole" placeholder="Role" value={this.state.campRole} onChange={(value)=> this.setState({campRole:value.target.value})}/>
                </div>

                <button type="submit" class="btn btn-primary" onClick={()=>this.sendUpdate()}>Update</button>
            </form>
        );
    }
    
    sendUpdate() {
        let roleId = this.props.match.params.id;
        const baseUrl = "http://localhost:3000/role/update/" + roleId;
        const datapost = {
            role: this.state.campRole
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