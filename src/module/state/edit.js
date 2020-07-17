import React from 'react';
import Axios from 'axios';
import Header from '../../components/header';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


class EditComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			campState: '',
			campFu: ''
		}
	}

	componentDidMount() {
		let stateId = this.props.match.params.id;
		const url = "http://localhost:3000/state/get/" + stateId;
		Axios.get(url)
			.then(res => {
				if (res.data.success) {
					const data = res.data.data[0]
					this.setState({
						dataState: data,
						campState: data.state,
						campFu: data.fu,
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
		return (
			<div class="col-md-12">
				<Header title="States" />
				<form>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="inputState">State</label>
							<input type="text" class="form-control" id="inputState" placeholder="State" value={this.state.campState} onChange={(value) => this.setState({ campState: value.target.value })} />
						</div>
						<div class="form-group col-md-6">
							<label for="inputFu">Role</label>
							<input type="text" class="form-control" id="inputFu" placeholder="UF" value={this.state.campFu} onChange={(value) => this.setState({ campFu: value.target.value })} />
						</div>
					</div>
					<button type="submit" class="btn btn-primary" onClick={() => this.sendUpdate()}>Update</button>
				</form>
			</div>
		);
	}

	sendUpdate() {
		let stateId = this.props.match.params.id;
		const baseUrl = "http://localhost:3000/state/update/" + stateId;
		const datapost = {
			state: this.state.campState,
			fu: this.state.campFu
		}

		Axios.post(baseUrl, datapost)
			.then(response => {
				if (response.data.success === true) {
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