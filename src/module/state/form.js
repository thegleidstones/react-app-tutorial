import React from 'react';
import Axios from 'axios';

import Header from '../../components/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class FormComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			campState: "",
			campFu: "",
		}
	}

	render() {
		return (
			<div class="col-md-12">
				<Header title="States" />
				<form>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="inputState">State</label>
							<input type="text" class="form-control" id="inputRole" placeholder="State" value={this.state.campState} onChange={(value) => this.setState({ campState: value.target.value })} />
						</div>
						<div class="form-group col-md-6">
							<label for="inputFu">FU</label>
							<input type="text" class="form-control" id="inputRole" placeholder="UF" value={this.state.campFu} onChange={(value) => this.setState({ campFu: value.target.value })} />
						</div>
					</div>
					<button type="submit" class="btn btn-primary" onClick={() => this.sendSave()}>Save</button>
				</form>
			</div>
		);
	}

	sendSave() {
		if (this.state.campState === "") {
			alert('Insert state description')
		} else if (this.state.campFu === "") {
			alert('Insert FU')
		} else {
			const baseUrl = "http://localhost:3000/state/create"

			const datapost = {
				state: this.state.campState,
				fu: this.state.campFu,
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