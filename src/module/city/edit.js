import React from 'react';
import Axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from '../../components/header';
import Select from '../../components/SelectStateComponent';


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
		this.setState({ selectState: e.target.value });
	}

	componentDidMount() {
		Axios.get("http://localhost:3000/state/list")
			.then(res => {
				const data = res.data.data;
				this.setState({ listState: data });
			})
			.catch(error => {
				alert(error);
			})

		let cityId = this.props.match.params.id;
		const url = "http://localhost:3000/city/get/" + cityId;

		Axios.get(url)
			.then(res => {
				if (res.data.success) {
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
		return (
			<div class="col-md-12">
				<Header title="Cities" />
				<form>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="inputCity">City</label>
							<input type="text" class="form-control" id="inputCity" placeholder="City" value={this.state.campCity} onChange={(value) => this.setState({ campCity: value.target.value })} />
						</div>
						<Select
							list={this.state.listState}
							selected={this.state.selectState}
							onChange={this.handleSelectionState}
							title="State"
						/>
					</div>
					<button type="submit" class="btn btn-primary" onClick={() => this.sendUpdate()}>Update</button>
				</form>
			</div>
		);
	}

	sendUpdate() {
		let cityId = this.props.match.params.id;
		const baseUrl = "http://localhost:3000/city/update/" + cityId;
		const datapost = {
			city: this.state.campCity,
			state: this.state.selectState
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