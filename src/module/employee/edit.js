import React from 'react';
import Axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from '../../components/header';

class EditComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listRole: [],
			listCity: [],
			campName: "",
			campEmail: "",
			campPhone: "",
			campAddress: "",
			stringRole: "",
			selectRole: 0,
			selectCity: 0,
			selectState: ""

		}
		this.handleSelectItem = this.handleSelectItem.bind(this);
		this.handleSelectCity = this.handleSelectCity.bind(this);
	}

	handleSelectItem(e) {
		this.setState({ selectRole: e.target.value });
	}

	handleSelectCity(e) {
		this.setState({ selectCity: e.target.value });
		this.setState({ selectState: this.state.listCity[e.target.value].state.state });
	}

	componentDidMount() {
		let userId = this.props.match.params.id;
		const url = "http://localhost:3000/employee/get/" + userId;

		Axios.get("http://localhost:3000/role/list/")
			.then(res => {
				const data = res.data.data;
				this.setState({ listRole: data });
			})
			.catch(error => {
				alert(error)
			});

		Axios.get("http://localhost:3000/city/list/")
			.then(res => {
				const data = res.data.data;
				this.setState({ listCity: data });
				console.log(this.state.listCity);
			})
			.catch(error => {
				alert(error)
			})

		Axios.get(url)
			.then(res => {
				if (res.data.success) {
					const data = res.data.data[0];
					const cityPosition = this.state.listCity.findIndex(x => x.id === data.cityId)
					this.setState({
						dataEmployee: data,
						campName: data.name,
						campEmail: data.email,
						campPhone: data.phone,
						campAddress: data.address,
						stringRole: data.role.role,
						selectRole: data.roleId,
						selectCity: cityPosition,
						selectState: data.city.state.state
					})
					console.log(JSON.stringify(data.role.role))
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
				<Header title="Employees" />
				<form>
					<div class="form-row justify-content-center">
						<div class="form-group col-md-6">
							<label for="inputPassword4">Name</label>
							<input type="text" class="form-control" placeholder="Name" value={this.state.campName} onChange={(value) => this.setState({ campName: value.target.value })} />
						</div>
						<div class="form-group col-md-6">
							<label for="inputEmail4">Email</label>
							<input type="email" class="form-control" placeholder="Email" value={this.state.campEmail} onChange={(value) => this.setState({ campEmail: value.target.value })} />
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="role">Role</label>
							<select id="role" value={this.state.selectRole} class="form-control" onChange={this.handleSelectItem}>
								<option>Choose...</option>
								{this.state.listRole.map((item, index) => (
									<option key={index} value={item.id}>{item.role}</option>
								))}
							</select>
						</div>
						<div class="form-group col-md-6">
							<label for="inputPhone4">Phone</label>
							<input type="number" class="form-control" placeholder="Phone" value={this.state.campPhone} onChange={(value) => this.setState({ campPhone: value.target.value })} />
						</div>
					</div>
					<div class="form-group">
						<label for="inputAddress">Address</label>
						<input type="text" class="form-control" id="inputAdress" placeholder="1234 Main St" value={this.state.campAddress} onChange={(value) => this.setState({ campAddress: value.target.value })} />
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="city">City {this.state.selectCity}</label>
							<select id="city" value={this.state.selectCity} class="form-control" onChange={this.handleSelectCity}>
								{this.state.listCity.map((item, index) => (
									<option key={index} value={index}>{item.name}</option>
								))}
							</select>
						</div>
						<div class="form-group col-md-6">
							<label for="state">State</label>
							<input type="text" class="form-control" id="state" readOnly={true} placeholder="State" value={this.state.selectState} onChange={(value) => this.setState({ selectState: value.target.value })} />
						</div>
					</div>

					<button type="submit" class="btn btn-primary" onClick={() => this.sendUpdate()}>Update</button>
				</form>
			</div>
		);
	}

	sendUpdate() {
		let userId = this.props.match.params.id;
		const baseUrl = "http://localhost:3000/employee/update/" + userId;
		const datapost = {
			name: this.state.campName,
			email: this.state.campEmail,
			phone: this.state.campPhone,
			address: this.state.campAddress,
			role: this.state.selectRole,
			city: this.state.listCity[this.state.selectCity].id
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